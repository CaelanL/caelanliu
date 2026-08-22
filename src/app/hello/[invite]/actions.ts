"use server";

import { redirect } from "next/navigation";
import {
  isExpectedInvite,
  validateAccessCredentials,
} from "@/features/sydney/auth";
import { sendNotification } from "@/features/sydney/notifications";
import {
  createAccessSession,
  shouldSendDeniedAttemptNotice,
} from "@/features/sydney/session";

export type AccessState = {
  status: "idle" | "denied";
};

export async function authenticateAccess(
  _previousState: AccessState,
  formData: FormData,
): Promise<AccessState> {
  const invite = String(formData.get("invite") || "");
  const firstName = String(formData.get("firstName") || "");
  const lastName = String(formData.get("lastName") || "");
  const birthday = String(formData.get("birthday") || "");

  const allowed =
    isExpectedInvite(invite) &&
    validateAccessCredentials({ birthday, firstName, lastName });

  if (!allowed) {
    if (await shouldSendDeniedAttemptNotice()) {
      await sendNotification("attempt_denied");
    }

    return { status: "denied" };
  }

  await createAccessSession(invite);
  await sendNotification("access_granted");
  redirect(`/hello/${encodeURIComponent(invite)}/console`);
}
