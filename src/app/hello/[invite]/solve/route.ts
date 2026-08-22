import { NextResponse } from "next/server";
import { isExpectedInvite } from "@/features/sydney/auth";
import { areSolvedMarkets } from "@/features/sydney/powerMarket";
import { sendNotification } from "@/features/sydney/notifications";
import {
  createSolvedPuzzleSession,
  hasSolvedPuzzleSession,
  hasValidAccessSession,
} from "@/features/sydney/session";

export async function POST(
  request: Request,
  { params }: RouteContext<"/hello/[invite]/solve">,
) {
  const { invite } = await params;

  if (!isExpectedInvite(invite) || !(await hasValidAccessSession(invite))) {
    return NextResponse.json({ solved: false }, { status: 401 });
  }

  const body: unknown = await request.json().catch(() => null);
  const markets =
    body && typeof body === "object" && "markets" in body
      ? body.markets
      : null;

  if (!areSolvedMarkets(markets)) {
    return NextResponse.json({ solved: false }, { status: 422 });
  }

  const alreadySolved = await hasSolvedPuzzleSession(invite);
  await createSolvedPuzzleSession(invite);

  if (!alreadySolved) {
    await sendNotification("puzzle_solved");
  }

  return NextResponse.json({ solved: true });
}
