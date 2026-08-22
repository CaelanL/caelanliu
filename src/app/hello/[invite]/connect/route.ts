import { NextResponse } from "next/server";
import {
  getGoogleMeetUrl,
  isExpectedInvite,
} from "@/features/sydney/auth";
import { sendNotification } from "@/features/sydney/notifications";
import {
  hasSolvedPuzzleSession,
  hasValidAccessSession,
} from "@/features/sydney/session";

export async function POST(
  request: Request,
  { params }: RouteContext<"/hello/[invite]/connect">,
) {
  const { invite } = await params;

  if (!isExpectedInvite(invite) || !(await hasValidAccessSession(invite))) {
    return NextResponse.redirect(
      new URL(`/hello/${encodeURIComponent(invite)}`, request.url),
      303,
    );
  }

  if (!(await hasSolvedPuzzleSession(invite))) {
    return NextResponse.redirect(
      new URL(`/hello/${encodeURIComponent(invite)}/console`, request.url),
      303,
    );
  }

  const meetUrl = getGoogleMeetUrl();

  if (!meetUrl) {
    return new Response("The live line is not configured yet.", { status: 503 });
  }

  await sendNotification("ready_for_call");
  return NextResponse.redirect(meetUrl, 303);
}
