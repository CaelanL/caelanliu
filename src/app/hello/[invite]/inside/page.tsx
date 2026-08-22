import { notFound, redirect } from "next/navigation";
import { isExpectedInvite } from "@/features/sydney/auth";
import { hasValidAccessSession } from "@/features/sydney/session";

export default async function InsidePage({
  params,
}: PageProps<"/hello/[invite]/inside">) {
  const { invite } = await params;

  if (!isExpectedInvite(invite)) {
    notFound();
  }

  if (!(await hasValidAccessSession(invite))) {
    redirect(`/hello/${encodeURIComponent(invite)}`);
  }

  redirect(`/hello/${encodeURIComponent(invite)}/console`);
}
