import "server-only";

export type NotificationEvent =
  | "attempt_denied"
  | "access_granted"
  | "puzzle_solved"
  | "ready_for_call";

const EVENT_COPY: Record<
  NotificationEvent,
  { subject: string; message: string }
> = {
  attempt_denied: {
    subject: "Sydney signal: access denied",
    message: "Someone tried the private link and was denied.",
  },
  access_granted: {
    subject: "Sydney signal: successful login",
    message: "Someone entered the correct credentials and opened the invitation.",
  },
  puzzle_solved: {
    subject: "Sydney signal: market cleared",
    message: "All five power markets were cleared. The private channel is unlocked.",
  },
  ready_for_call: {
    subject: "Sydney signal: ready for the call",
    message: "The live-line button was pressed. Join the Meet now.",
  },
};

function timestamp(): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Chicago",
  }).format(new Date());
}

async function sendEmail(event: NotificationEvent): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.NOTIFY_EMAIL?.trim();
  const from =
    process.env.NOTIFY_FROM_EMAIL?.trim() ||
    "Caelan <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return;
  }

  const copy = EVENT_COPY[event];
  const sentAt = timestamp();
  const response = await fetch("https://api.resend.com/emails", {
    body: JSON.stringify({
      from,
      html: `<p>${copy.message}</p><p>${sentAt}</p>`,
      subject: copy.subject,
      text: `${copy.message}\n${sentAt}`,
      to: [to],
    }),
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`Resend returned ${response.status}.`);
  }
}

export async function sendNotification(
  event: NotificationEvent,
): Promise<void> {
  try {
    await sendEmail(event);
  } catch (error) {
    console.error("Sydney email notification failed.", error);
  }
}
