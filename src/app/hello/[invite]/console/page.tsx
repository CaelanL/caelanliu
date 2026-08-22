import { notFound, redirect } from "next/navigation";
import PowerMarketConsole from "@/features/sydney/PowerMarketConsole";
import { getGoogleMeetUrl, isExpectedInvite } from "@/features/sydney/auth";
import {
  hasSolvedPuzzleSession,
  hasValidAccessSession,
} from "@/features/sydney/session";

export default async function ConsolePage({
  params,
  searchParams,
}: PageProps<"/hello/[invite]/console">) {
  const { invite } = await params;
  const query = await searchParams;

  if (!isExpectedInvite(invite)) {
    notFound();
  }

  if (!(await hasValidAccessSession(invite))) {
    redirect(`/hello/${encodeURIComponent(invite)}`);
  }

  return (
    <PowerMarketConsole
      initialSolved={await hasSolvedPuzzleSession(invite)}
      invite={invite}
      meetReady={Boolean(getGoogleMeetUrl())}
      previewRound={
        process.env.NODE_ENV === "development" && query.preview === "5"
          ? 4
          : undefined
      }
    />
  );
}
