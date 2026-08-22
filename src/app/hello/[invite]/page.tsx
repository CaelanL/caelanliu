import { notFound, redirect } from "next/navigation";
import AccessGate from "@/features/sydney/AccessGate";
import { isExpectedInvite } from "@/features/sydney/auth";
import { hasValidAccessSession } from "@/features/sydney/session";

export default async function InvitePage({
  params,
}: PageProps<"/hello/[invite]">) {
  const { invite } = await params;

  if (!isExpectedInvite(invite)) {
    notFound();
  }

  if (await hasValidAccessSession(invite)) {
    redirect(`/hello/${encodeURIComponent(invite)}/console`);
  }

  return <AccessGate invite={invite} />;
}
