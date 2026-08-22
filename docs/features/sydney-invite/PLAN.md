# Sydney Invite

## Status

Implemented as an isolated private invitation inside the public portfolio. The
current creative direction is a five-round power-market puzzle followed by an
authenticated Google Meet handoff.

Removing `src/app/hello`, `src/features/sydney`, this directory, and the related
deployment secrets removes the entire feature without changing the portfolio.

## Goal

The physical letter sends Sydney to a private URL. The experience:

1. Checks her first name, last name, and birthday on the server.
2. Emails Caelan when access is denied or granted.
3. Presents one post-login console containing a transparent economics puzzle.
4. Unlocks the Meet channel only after the server verifies all five markets.
5. Emails Caelan when the puzzle is solved and when the Meet button is pressed.

## Product direction

### Power Market Clearing

The post-login experience is a compact electricity dispatch puzzle. It does not
assume familiarity with quarters, macroeconomic models, or hidden equations.
Every fact needed to solve it is visible on screen.

Five generators show their available capacity and offer price. Sydney adjusts
each plant in 10 MW steps while the console updates total supply and operating
cost immediately. Rounds introduce one visible market constraint at a time;
there are no hidden variables, random outcomes, or attempt limits.

#### Market 1: normal conditions

- Demand: 100 MW.
- Wind: 30 MW at $0/MWh.
- Solar: 20 MW at $8/MWh.
- Nuclear: 40 MW at $18/MWh.
- Natural gas: 50 MW at $42/MWh.
- Peaker: 20 MW at $105/MWh.

#### Market 2: heat dome

Demand rises to 110 MW and wind availability falls to 10 MW. All other offers
remain visible and unchanged. Sydney redispatches the generators.

#### Market 3: minimum load

Demand falls to 60 MW, but committed nuclear generation cannot run below 30
MW. The lowest-cost dispatch is 30 MW wind and 30 MW nuclear. This introduces a
binding operating constraint: some otherwise-cheap solar must be curtailed.

#### Market 4: cold start

Demand is 90 MW. Starting natural gas adds a visible $900 fee to its $42/MWh
energy offer. For the final 10 MW, the $105/MWh peaker is cheaper for this hour
than starting gas. The optimal dispatch is 20 MW wind, 20 MW solar, 40 MW
nuclear, and 10 MW peaker.

#### Market 5: grid constraint

Demand is 120 MW. The west line can carry at most 60 MW from wind, solar, and
nuclear; nuclear has a 20 MW minimum; and 10 MW of unused gas/peaker capacity
must remain as fast reserve. Live readouts expose all three constraints. The
unique minimum-cost dispatch is 30 MW wind, 10 MW solar, 20 MW nuclear, 50 MW
gas, and 10 MW peaker.

The check returns concrete feedback:

- The exact size of a shortage.
- The exact size of excess generation.
- The exact violated commitment, transmission, or reserve constraint.
- Whether a feasible dispatch is still unnecessarily expensive.
- A successful clearing receipt with supply, total cost, and the highest active
  offer.

There is no experiment budget. Incorrect checks preserve the current dispatch
so it can be corrected. The progression moves from merit-order dispatch to
capacity shocks, minimum commitments, non-marginal startup costs, and
constrained network dispatch.

After all five rounds clear, the complete dispatch arrays are sent to an
authenticated route handler. The server validates every capacity and step,
enumerates every feasible 10 MW combination under the displayed constraints,
accepts only a minimum-cost result, issues a signed solved cookie, and only then
enables the Meet handoff.

## Canonical route flow

```text
/hello/[invite]
  -> /hello/[invite]/console
  -> /hello/[invite]/solve
  -> /hello/[invite]/connect
  -> Google Meet
```

The old `/verify` and `/inside` locations remain only as authenticated redirects
to `/console`. They contain no former experience code.

## URL and access model

The physical letter uses a memorable, unlisted invite segment. Its expected
value lives in deployment configuration so it can change without a code change.

The gate requires first name, last name, and birthday. Birthday parsing accepts
numeric forms with spaces, commas, dots, slashes, or dashes. Only the configured
six- or eight-digit normalized values are valid. Month names and arbitrary
letters are rejected. Every credential failure returns the same `ACCESS DENIED`
response.

### Threat model

This protects against casual discovery and direct navigation. It is not intended
to resist a targeted attacker who knows the invite URL and Sydney's details. The
short slug and birthday are not high-entropy credentials.

No database is needed because the invitation and puzzle can be replayed. A
database or KV store would only be necessary for single-use redemption, durable
attempt history, or distributed rate limiting.

## Server-side security

- Expected credentials and the Meet URL remain server-only environment values.
- Credential comparisons use HMAC digests and constant-time comparison.
- Submitted identity values never appear in logs or notifications.
- Successful entry creates an HMAC-signed, HttpOnly, `SameSite=Lax` cookie bound
  to the invite slug and valid for six hours.
- A separate signed cookie records a server-verified puzzle solution.
- The Meet handoff requires both cookies and rechecks the invite slug.
- The solve handler validates all five dispatch arrays and independently
  recomputes the constrained least-cost outcomes.
- The route is marked `noindex`, `nofollow`, and `noarchive`.
- No protected material belongs in `public/`, because public assets bypass route
  authorization.

## Notifications

| Event | Meaning |
| --- | --- |
| `attempt_denied` | A visitor submitted invalid credentials. |
| `access_granted` | Sydney passed the identity gate. |
| `puzzle_solved` | The server accepted all five cleared markets. |
| `ready_for_call` | The unlocked Meet button was pressed. |

Email through Resend is the only notification channel. Messages contain only an
event description and timestamp. Missing configuration or delivery failure does
not block the experience. A short HttpOnly cooldown cookie suppresses repeated
denied-attempt emails from the same browser.

A successful credential submission always sends `access_granted`, even if the
same visitor has logged in before. The Resend request is awaited before the
redirect for reliable serverless delivery, but it times out after five seconds
and failures are caught so access is never blocked.

## Google Meet decision

Google's lightweight integrations create or manage Meet spaces, or put an app
inside Meet as an add-on. They do not provide a simple ordinary Meet client
embedded inside this portfolio page.

The Meet URL therefore remains server-side. The final form posts to the
authenticated `connect` route, which sends the readiness email and redirects a
new tab to the pre-created Meet. The market console remains open.

## File layout

```text
docs/features/sydney-invite/PLAN.md
src/app/hello/[invite]/
  actions.ts
  page.tsx
  layout.tsx
  console/page.tsx
  solve/route.ts
  connect/route.ts
  inside/page.tsx    # compatibility redirect
  verify/page.tsx    # compatibility redirect
src/features/sydney/
  AccessGate.tsx
  PowerMarketConsole.tsx
  powerMarket.ts
  auth.ts
  notifications.ts
  session.ts
  sydney.module.css
```

## Environment variables

```text
SYDNEY_INVITE_SLUG=
SYDNEY_FIRST_NAME=
SYDNEY_LAST_NAME=
SYDNEY_BIRTHDATE_SHORT=
SYDNEY_BIRTHDATE_LONG=
SYDNEY_SESSION_SECRET=

RESEND_API_KEY=
NOTIFY_EMAIL=
NOTIFY_FROM_EMAIL=Caelan <onboarding@resend.dev>

GOOGLE_MEET_URL=
```

The sender defaults to `Caelan <onboarding@resend.dev>`, so no domain is needed
when `NOTIFY_EMAIL` is the email address associated with the Resend account.
Resend restricts that testing sender to the account owner. Sending to anyone
else requires a verified domain and a `NOTIFY_FROM_EMAIL` override. Add the API
key and recipient to the desired Vercel environments; no Resend key is exposed
to the browser.

## Accessibility and device support

- Every dispatch button has a generator-specific accessible label.
- Supply, cost, and status update as text rather than color alone.
- Check feedback is announced through a polite live region.
- The complete puzzle is keyboard operable.
- Reduced-motion users skip ambient and transition animation.
- The layout targets current mobile Safari and Chrome and fits a 320px viewport
  without horizontal scrolling.

## Verification

1. Lint and production build pass.
2. Repository contains no real credential, Meet URL, email address, or API key.
3. Wrong invite returns 404.
4. Wrong identity values return the same denial state.
5. Supported birthday separators authenticate; birthday letters fail.
6. Console redirects to the gate without a valid access cookie.
7. Solve rejects malformed, capacity-breaking, and non-optimal dispatches.
8. Connect rejects access before all five markets are server verified.
9. Commitment, startup-cost, transmission, and reserve failures return specific
   feedback while preserving the attempted dispatch.
10. All visible least-cost markets unlock the channel and survive a refresh.
11. Desktop and mobile browser passes show no console errors or horizontal
    overflow.

## Deployment sequence

1. Add production and preview secrets in Vercel.
2. Configure Resend and send one test email to Caelan.
3. Add the persistent Meet URL.
4. Deploy a preview and test the complete flow from a phone.
5. Deploy production.
6. Write the final URL in the physical letter only after verifying it.

## Removal

Delete `src/app/hello`, `src/features/sydney`, and this documentation directory.
Remove the listed deployment variables. No portfolio file needs restoration.

## Research references

- [ECB educational monetary-policy games](https://www.ecb.europa.eu/press/pr/date/2010/html/pr101208.en.html)
- [EconPort experimental economics](https://econport.gsu.edu/)
- [Federal Reserve Education market simulation](https://www.federalreserveeducation.org/teaching-resources/economics/markets/the-basics-of-supply-and-demand-a-classroom-cocoa-bean-market)
- [Google Meet SDK and API overview](https://developers.google.com/workspace/meet/overview)
- [Resend with Next.js](https://resend.com/nextjs)
