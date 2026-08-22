"use client";

import { useActionState } from "react";
import { authenticateAccess } from "@/app/hello/[invite]/actions";
import type { AccessState } from "@/app/hello/[invite]/actions";
import styles from "./sydney.module.css";

const initialAccessState: AccessState = { status: "idle" };

export default function AccessGate({ invite }: { invite: string }) {
  const [state, formAction, pending] = useActionState(
    authenticateAccess,
    initialAccessState,
  );
  const denied = state.status === "denied";

  return (
    <main className={styles.gatePage}>
      <div className={styles.gateGrid} aria-hidden="true" />
      <div className={styles.scanBeam} aria-hidden="true" />

      <section
        className={`${styles.terminal} ${denied ? styles.terminalDenied : ""}`}
        aria-labelledby="gate-title"
      >
        <header className={styles.terminalHeader}>
          <span>PRIVATE CHANNEL // 001</span>
          <span className={styles.signalStatus}>
            <i aria-hidden="true" /> SIGNAL FOUND
          </span>
        </header>

        <div className={styles.terminalBody}>
          <h1 id="gate-title">IDENTITY CHECK</h1>

          <form action={formAction} className={styles.gateForm}>
            <input type="hidden" name="invite" value={invite} />

            <div className={styles.nameFields}>
              <label className={styles.field}>
                <span>first name</span>
                <input
                  autoComplete="given-name"
                  aria-invalid={denied}
                  maxLength={80}
                  name="firstName"
                  required
                  type="text"
                />
              </label>

              <label className={styles.field}>
                <span>last name</span>
                <input
                  autoComplete="family-name"
                  aria-invalid={denied}
                  maxLength={80}
                  name="lastName"
                  required
                  type="text"
                />
              </label>
            </div>

            <label className={styles.field}>
              <span>password</span>
              <input
                autoComplete="off"
                aria-invalid={denied}
                inputMode="numeric"
                maxLength={24}
                name="birthday"
                placeholder="birthday"
                required
                type="text"
              />
            </label>

            <div className={styles.formFooter}>
              <p
                className={denied ? styles.denied : styles.awaiting}
                role="status"
                aria-live="polite"
              >
                {denied ? "ACCESS DENIED" : "AWAITING CREDENTIALS"}
              </p>
              <button disabled={pending} type="submit">
                {pending ? "VERIFYING…" : "REQUEST ACCESS"}
                <span aria-hidden="true">↗</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <p className={styles.coordinates} aria-hidden="true">
        30.2672° N / 97.7431° W
      </p>
    </main>
  );
}
