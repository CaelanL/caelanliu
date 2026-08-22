"use client";

import { useMemo, useState } from "react";
import {
  DISPATCH_STEP,
  GENERATORS,
  MARKET_SCENARIOS,
  evaluateMarket,
  getOptimalDispatch,
} from "./powerMarket";
import styles from "./sydney.module.css";

const EMPTY_DISPATCH = GENERATORS.map(() => 0);

function formatMoney(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function PowerMarketConsole({
  initialSolved,
  invite,
  meetReady,
  previewRound,
}: {
  initialSolved: boolean;
  invite: string;
  meetReady: boolean;
  previewRound?: number;
}) {
  const previewing = previewRound !== undefined;
  const startsSolved = initialSolved && !previewing;
  const initialRound = previewRound ?? (startsSolved ? MARKET_SCENARIOS.length - 1 : 0);
  const initialDispatch = startsSolved
    ? getOptimalDispatch(initialRound)
    : previewing && initialRound > 0
      ? getOptimalDispatch(initialRound - 1).map((megawatts, index) =>
          Math.min(megawatts, MARKET_SCENARIOS[initialRound].capacities[index]),
        )
      : [...EMPTY_DISPATCH];
  const [round, setRound] = useState(initialRound);
  const [dispatch, setDispatch] = useState<number[]>(initialDispatch);
  const [solutions, setSolutions] = useState<number[][]>(
    startsSolved
      ? MARKET_SCENARIOS.map((_, index) => getOptimalDispatch(index))
      : previewing
        ? MARKET_SCENARIOS.slice(0, initialRound).map((_, index) =>
            getOptimalDispatch(index),
          )
        : [],
  );
  const [checked, setChecked] = useState(startsSolved);
  const [roundCleared, setRoundCleared] = useState(startsSolved);
  const [solved, setSolved] = useState(startsSolved);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [lineOpened, setLineOpened] = useState(false);
  const scenario = MARKET_SCENARIOS[round];
  const evaluation = useMemo(
    () => evaluateMarket(round, dispatch),
    [dispatch, round],
  );
  const constraintReadouts = [
    ...(scenario.minimums ?? []).flatMap((minimum, index) =>
      minimum > 0
        ? [
            {
              complete: dispatch[index] >= minimum,
              detail: `${GENERATORS[index].name.toUpperCase()} · ${minimum} MW MINIMUM`,
              label: `${GENERATORS[index].name.toUpperCase()} FLOOR`,
              value: `${dispatch[index]} / ${minimum} MW`,
            },
          ]
        : [],
    ),
    ...(scenario.startupCosts ?? []).flatMap((startupCost, index) =>
      startupCost > 0
        ? [
            {
              complete: undefined,
              detail: `${GENERATORS[index].name.toUpperCase()} ONLY`,
              label: `${GENERATORS[index].name.toUpperCase()} START FEE`,
              value:
                dispatch[index] > 0
                  ? `${formatMoney(startupCost)} ACTIVE`
                  : `${formatMoney(startupCost)} IF STARTED`,
            },
          ]
        : [],
    ),
    ...(scenario.westLine
      ? [
          {
            complete: (evaluation.westFlow ?? 0) <= scenario.westLine.limit,
            detail: "WIND + SOLAR + NUCLEAR",
            label: "WEST LINE",
            value: `${evaluation.westFlow} / ${scenario.westLine.limit} MW`,
          },
        ]
      : []),
    ...(scenario.reserve
      ? [
          {
            complete: (evaluation.reserve ?? 0) >= scenario.reserve.requirement,
            detail: `UNUSED GAS + PEAKER · ${scenario.reserve.requirement} MW REQUIRED`,
            label: "FAST RESERVE",
            value: `${evaluation.reserve} MW AVAILABLE`,
          },
        ]
      : []),
  ];

  function changeDispatch(index: number, difference: number) {
    setDispatch((current) =>
      current.map((megawatts, generatorIndex) =>
        generatorIndex === index
          ? Math.min(
              scenario.capacities[index],
              Math.max(0, megawatts + difference),
            )
          : megawatts,
      ),
    );
    setChecked(false);
    setRoundCleared(false);
    setServerError(false);
  }

  async function authorizeMarkets(nextSolutions: number[][]) {
    setSubmitting(true);
    const response = await fetch(`/hello/${encodeURIComponent(invite)}/solve`, {
      body: JSON.stringify({ markets: nextSolutions }),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });

    if (!response.ok) {
      setServerError(true);
      setSubmitting(false);
      return;
    }

    setSolved(true);
    setSubmitting(false);
  }

  async function checkMarket() {
    setChecked(true);
    setServerError(false);

    if (!evaluation.cleared) {
      return;
    }

    setRoundCleared(true);
    const nextSolutions = [...solutions, [...dispatch]];
    setSolutions(nextSolutions);

    if (round === MARKET_SCENARIOS.length - 1) {
      await authorizeMarkets(nextSolutions);
    }
  }

  function advanceMarket() {
    const nextRound = round + 1;
    const nextCapacities = MARKET_SCENARIOS[nextRound].capacities;
    setRound(nextRound);
    setDispatch((current) =>
      current.map((megawatts, index) =>
        Math.min(megawatts, nextCapacities[index]),
      ),
    );
    setChecked(false);
    setRoundCleared(false);
  }

  function resetMarket() {
    setRound(0);
    setDispatch([...EMPTY_DISPATCH]);
    setSolutions([]);
    setChecked(false);
    setRoundCleared(false);
    setServerError(false);
  }

  return (
    <main className={styles.marketPage} data-solved={solved}>
      <div className={styles.marketGrid} aria-hidden="true" />
      <div className={styles.gridPulse} aria-hidden="true" />

      <section className={styles.marketConsole} aria-labelledby="market-title">
        <header className={styles.marketHeader}>
          <span>GRID-1223 // DISPATCH</span>
          <span className={styles.marketConnection}>
            <i aria-hidden="true" /> {solved ? "CHANNEL READY" : "SYSTEM ONLINE"}
          </span>
          <span>OPERATOR: SYDNEY</span>
        </header>

        <div className={styles.marketBody}>
          <div className={styles.marketLead}>
            <div>
              <p>
                POWER MARKET // ROUND {String(round + 1).padStart(2, "0")} OF {" "}
                {String(MARKET_SCENARIOS.length).padStart(2, "0")}
              </p>
              <h1 id="market-title">Power the city.</h1>
            </div>
            <div className={styles.marketRule}>
              <span>THE RULE</span>
              <p>{scenario.rule}</p>
            </div>
          </div>

          <div className={styles.eventBrief} data-event={round > 0}>
            <div>
              <span>{scenario.event}</span>
              <p>{scenario.detail}</p>
            </div>
            <strong>{scenario.demand} MW NEEDED</strong>
          </div>

          {constraintReadouts.length > 0 && (
            <div className={styles.constraintReadouts}>
              {constraintReadouts.map((constraint) => (
                <div data-complete={constraint.complete} key={constraint.label}>
                  <span className={styles.constraintCopy}>
                    <b>{constraint.label}</b>
                    <small>{constraint.detail}</small>
                  </span>
                  <strong>{constraint.value}</strong>
                </div>
              ))}
            </div>
          )}

          <div className={styles.marketMeters}>
            <div data-complete={evaluation.supply === scenario.demand}>
              <span>POWER SUPPLIED</span>
              <strong>{evaluation.supply}</strong>
              <small>/ {scenario.demand} MW</small>
            </div>
            <div>
              <span>OPERATING COST</span>
              <strong>{formatMoney(evaluation.cost)}</strong>
              <small>/ HOUR</small>
            </div>
            <div>
              <span>GRID STATUS</span>
              <strong>
                {evaluation.supply < scenario.demand
                  ? "SHORT"
                  : evaluation.supply > scenario.demand
                    ? "EXCESS"
                    : evaluation.minimumDeficit > 0 ||
                        evaluation.westOverload > 0 ||
                        evaluation.reserveShortfall > 0
                      ? "BLOCKED"
                      : evaluation.cleared
                      ? "CLEAR"
                      : "COSTLY"}
              </strong>
              <small>{Math.abs(scenario.demand - evaluation.supply)} MW DELTA</small>
            </div>
          </div>

          <div className={styles.dispatchBoard}>
            <div className={styles.dispatchHead} aria-hidden="true">
              <span>GENERATOR</span>
              <span>AVAILABLE</span>
              <span>PRICE</span>
              <span>DISPATCH</span>
            </div>

            {GENERATORS.map((generator, index) => {
              const capacity = scenario.capacities[index];
              const percent = capacity ? (dispatch[index] / capacity) * 100 : 0;
              const isWestGenerator =
                scenario.westLine?.generatorIndexes.includes(index) ?? false;
              const isReserveGenerator =
                scenario.reserve?.generatorIndexes.includes(index) ?? false;
              return (
                <div className={styles.generatorRow} key={generator.id}>
                  <div className={styles.generatorIdentity}>
                    <i aria-hidden="true">{generator.code}</i>
                    <span>
                      <strong>{generator.name}</strong>
                      <small>{generator.note}</small>
                      {scenario.westLine && (
                        <span className={styles.generatorTags}>
                          <b>{isWestGenerator ? "WEST" : "CITY"}</b>
                          {isReserveGenerator && (
                            <b data-reserve="true">RESERVE</b>
                          )}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className={styles.generatorCapacity}>
                    <strong>
                      {(scenario.minimums?.[index] ?? 0) > 0
                        ? `${scenario.minimums?.[index]} MW MIN`
                        : capacity}
                    </strong>
                    <small>
                      {(scenario.minimums?.[index] ?? 0) > 0
                        ? `${capacity} MW MAX`
                        : "MW available"}
                    </small>
                  </div>
                  <div className={styles.generatorPrice}>
                    <strong>${generator.cost}</strong>
                    <small>
                      / MWh
                      {(scenario.startupCosts?.[index] ?? 0) > 0
                        ? ` + ${formatMoney(scenario.startupCosts?.[index] ?? 0)} start`
                        : ""}
                    </small>
                  </div>
                  <div className={styles.dispatchControl}>
                    <div className={styles.dispatchTrack} aria-hidden="true">
                      <i style={{ width: `${percent}%` }} />
                    </div>
                    <button
                      aria-label={`Decrease ${generator.name} dispatch`}
                      disabled={dispatch[index] === 0 || roundCleared || solved}
                      onClick={() => changeDispatch(index, -DISPATCH_STEP)}
                      type="button"
                    >
                      −
                    </button>
                    <output aria-label={`${generator.name} dispatched power`}>
                      {dispatch[index]} MW
                    </output>
                    <button
                      aria-label={`Increase ${generator.name} dispatch`}
                      disabled={
                        dispatch[index] === capacity || roundCleared || solved
                      }
                      onClick={() => changeDispatch(index, DISPATCH_STEP)}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.marketActionBar}>
            <div className={styles.marketFeedback} aria-live="polite" role="status">
              <span>DISPATCH REPORT</span>
              <p>
                {serverError
                  ? "AUTHORIZATION FAILED // check the market again"
                  : checked
                    ? evaluation.message
                    : "Set generator output, then check the market."}
              </p>
            </div>

            {!roundCleared && !solved && (
              <button
                className={styles.checkMarketButton}
                onClick={checkMarket}
                type="button"
              >
                CHECK MARKET <span aria-hidden="true">↗</span>
              </button>
            )}

            {roundCleared && round < MARKET_SCENARIOS.length - 1 && (
              <button
                className={styles.nextEventButton}
                onClick={advanceMarket}
                type="button"
              >
                NEXT EVENT <span aria-hidden="true">↗</span>
              </button>
            )}

            {roundCleared &&
              round === MARKET_SCENARIOS.length - 1 &&
              !solved && (
              <button className={styles.checkMarketButton} disabled type="button">
                {submitting ? "AUTHORIZING…" : "VERIFYING…"}
              </button>
            )}
          </div>

          {roundCleared && (
            <div className={styles.clearingReceipt}>
              <span>MARKET 0{round + 1} CLEARED</span>
              <div>
                <p>SUPPLY</p>
                <strong>{evaluation.supply} MW</strong>
              </div>
              <div>
                <p>COST</p>
                <strong>{formatMoney(evaluation.cost)} / HR</strong>
              </div>
              <div>
                <p>HIGHEST ACTIVE OFFER</p>
                <strong>${evaluation.marketPrice} / MWh</strong>
              </div>
            </div>
          )}

          {!solved && round > 0 && !roundCleared && (
            <button className={styles.resetLink} onClick={resetMarket} type="button">
              RESET ALL MARKETS
            </button>
          )}

          {solved && (
            <div className={styles.channelUnlock}>
              <div>
                <span>GRID STABLE // ACCESS CONDITION SATISFIED</span>
                <h2>Market cleared.</h2>
                <p>The channel is yours whenever you&apos;re ready.</p>
              </div>
              <form
                action={`/hello/${encodeURIComponent(invite)}/connect`}
                method="post"
                onSubmit={() => setLineOpened(true)}
                target="_blank"
              >
                <button disabled={!meetReady} type="submit">
                  {lineOpened ? "CHANNEL OPEN" : "OPEN CHANNEL"}
                  <span aria-hidden="true">↗</span>
                </button>
                {!meetReady && <small>CHANNEL CONFIGURATION PENDING</small>}
              </form>
            </div>
          )}
        </div>

        <footer className={styles.marketFooter}>
          <span>ENERGY PRICES SHOWN PER MWh</span>
          <span>VISIBLE RULES // NO HIDDEN VARIABLES</span>
        </footer>
      </section>
    </main>
  );
}
