export type GeneratorId = "wind" | "solar" | "nuclear" | "gas" | "peaker";

export type Generator = {
  code: string;
  cost: number;
  id: GeneratorId;
  name: string;
  note: string;
};

export type MarketScenario = {
  capacities: number[];
  costHint?: string;
  demand: number;
  detail: string;
  event: string;
  minimums?: number[];
  reserve?: {
    generatorIndexes: number[];
    requirement: number;
  };
  rule: string;
  startupCosts?: number[];
  westLine?: {
    generatorIndexes: number[];
    limit: number;
  };
};

export type MarketEvaluation = {
  cleared: boolean;
  cost: number;
  marketPrice: number | null;
  message: string;
  minimumDeficit: number;
  optimalCost: number;
  reserve: number | null;
  reserveShortfall: number;
  supply: number;
  westFlow: number | null;
  westOverload: number;
};

export const DISPATCH_STEP = 10;

export const GENERATORS: Generator[] = [
  { code: "WND", cost: 0, id: "wind", name: "Wind", note: "variable" },
  { code: "SOL", cost: 8, id: "solar", name: "Solar", note: "daylight" },
  { code: "NUC", cost: 18, id: "nuclear", name: "Nuclear", note: "baseload" },
  { code: "GAS", cost: 42, id: "gas", name: "Natural gas", note: "flexible" },
  { code: "PKR", cost: 105, id: "peaker", name: "Peaker", note: "emergency" },
];

export const MARKET_SCENARIOS: MarketScenario[] = [
  {
    capacities: [30, 20, 40, 50, 20],
    demand: 100,
    detail: "Deliver 100 MW. Use the lowest-cost power first.",
    event: "NORMAL CONDITIONS",
    rule: "Meet demand. Use the lowest-cost generators first.",
  },
  {
    capacities: [10, 20, 40, 50, 20],
    demand: 110,
    detail: "Demand rose to 110 MW. Wind availability fell to 10 MW.",
    event: "HEAT DOME",
    rule: "Meet the new demand with the cheapest available mix.",
  },
  {
    capacities: [30, 20, 40, 50, 20],
    costHint: "Wind can replace higher-cost output once the commitment is met.",
    demand: 60,
    detail: "Demand fell, but the committed reactor cannot run below 30 MW.",
    event: "MINIMUM LOAD",
    minimums: [0, 0, 30, 0, 0],
    rule: "Meet demand at minimum cost. Nuclear must stay at or above 30 MW.",
  },
  {
    capacities: [20, 20, 40, 50, 20],
    costHint: "The gas start fee can outweigh its cheaper energy offer.",
    demand: 90,
    detail: "Starting gas costs $900, on top of its hourly energy cost.",
    event: "COLD START",
    rule: "Meet demand at minimum total cost, including any startup fee.",
    startupCosts: [0, 0, 0, 900, 0],
  },
  {
    capacities: [30, 20, 40, 50, 20],
    costHint: "Use the cheapest west power that fits, then protect the reserve.",
    demand: 120,
    detail: "Power the city without overloading the west line or spending the reserve.",
    event: "GRID CONSTRAINT",
    minimums: [0, 0, 20, 0, 0],
    reserve: { generatorIndexes: [3, 4], requirement: 10 },
    rule:
      "Wind + solar + nuclear: 60 MW max. Nuclear: 20 MW min. Leave 10 MW of gas + peaker unused.",
    westLine: { generatorIndexes: [0, 1, 2], limit: 60 },
  },
];

export function isValidDispatch(
  scenarioIndex: number,
  value: unknown,
): value is number[] {
  const scenario = MARKET_SCENARIOS[scenarioIndex];

  return (
    Boolean(scenario) &&
    Array.isArray(value) &&
    value.length === GENERATORS.length &&
    value.every(
      (megawatts, index) =>
        typeof megawatts === "number" &&
        Number.isFinite(megawatts) &&
        megawatts >= 0 &&
        megawatts <= scenario.capacities[index] &&
        Number.isInteger(megawatts / DISPATCH_STEP),
    )
  );
}

export function getMarketCost(
  scenarioIndex: number,
  dispatch: readonly number[],
): number {
  const scenario = MARKET_SCENARIOS[scenarioIndex];

  return dispatch.reduce((total, megawatts, index) => {
    const startupCost =
      megawatts > 0 ? (scenario.startupCosts?.[index] ?? 0) : 0;
    return total + megawatts * GENERATORS[index].cost + startupCost;
  }, 0);
}

export function getWestFlow(
  scenarioIndex: number,
  dispatch: readonly number[],
): number | null {
  const westLine = MARKET_SCENARIOS[scenarioIndex].westLine;

  return westLine
    ? westLine.generatorIndexes.reduce(
        (total, generatorIndex) => total + dispatch[generatorIndex],
        0,
      )
    : null;
}

export function getFastReserve(
  scenarioIndex: number,
  dispatch: readonly number[],
): number | null {
  const scenario = MARKET_SCENARIOS[scenarioIndex];

  return scenario.reserve
    ? scenario.reserve.generatorIndexes.reduce(
        (total, generatorIndex) =>
          total + scenario.capacities[generatorIndex] - dispatch[generatorIndex],
        0,
      )
    : null;
}

function getConstraintState(
  scenarioIndex: number,
  dispatch: readonly number[],
) {
  const scenario = MARKET_SCENARIOS[scenarioIndex];
  const minimumDeficit = dispatch.reduce(
    (total, megawatts, index) =>
      total + Math.max(0, (scenario.minimums?.[index] ?? 0) - megawatts),
    0,
  );
  const westFlow = getWestFlow(scenarioIndex, dispatch);
  const westOverload = Math.max(
    0,
    (westFlow ?? 0) - (scenario.westLine?.limit ?? Number.POSITIVE_INFINITY),
  );
  const reserve = getFastReserve(scenarioIndex, dispatch);
  const reserveShortfall = Math.max(
    0,
    (scenario.reserve?.requirement ?? 0) - (reserve ?? 0),
  );

  return {
    feasible:
      minimumDeficit === 0 && westOverload === 0 && reserveShortfall === 0,
    minimumDeficit,
    reserve,
    reserveShortfall,
    westFlow,
    westOverload,
  };
}

export function getOptimalDispatch(scenarioIndex: number): number[] {
  const scenario = MARKET_SCENARIOS[scenarioIndex];

  if (!scenario) {
    throw new Error("Unknown market scenario.");
  }

  let bestCost = Number.POSITIVE_INFINITY;
  let bestDispatch: number[] | null = null;
  const candidate = GENERATORS.map(() => 0);

  function search(generatorIndex: number, supplied: number) {
    if (generatorIndex === GENERATORS.length) {
      if (supplied !== scenario.demand) {
        return;
      }

      if (!getConstraintState(scenarioIndex, candidate).feasible) {
        return;
      }

      const cost = getMarketCost(scenarioIndex, candidate);
      if (cost < bestCost) {
        bestCost = cost;
        bestDispatch = [...candidate];
      }
      return;
    }

    const remainingDemand = scenario.demand - supplied;
    const maximum = Math.min(
      scenario.capacities[generatorIndex],
      remainingDemand,
    );

    for (let megawatts = 0; megawatts <= maximum; megawatts += DISPATCH_STEP) {
      candidate[generatorIndex] = megawatts;
      search(generatorIndex + 1, supplied + megawatts);
    }
  }

  search(0, 0);

  if (!bestDispatch) {
    throw new Error("Scenario has no feasible market dispatch.");
  }

  return bestDispatch;
}

export function evaluateMarket(
  scenarioIndex: number,
  dispatch: readonly number[],
): MarketEvaluation {
  if (!isValidDispatch(scenarioIndex, dispatch)) {
    throw new Error("Invalid market dispatch.");
  }

  const scenario = MARKET_SCENARIOS[scenarioIndex];
  const constraintState = getConstraintState(scenarioIndex, dispatch);
  const optimalDispatch = getOptimalDispatch(scenarioIndex);
  const supply = dispatch.reduce((total, megawatts) => total + megawatts, 0);
  const cost = getMarketCost(scenarioIndex, dispatch);
  const optimalCost = getMarketCost(scenarioIndex, optimalDispatch);
  const marketPrice = dispatch.reduce<number | null>(
    (highest, megawatts, index) =>
      megawatts > 0
        ? Math.max(highest ?? GENERATORS[index].cost, GENERATORS[index].cost)
        : highest,
    null,
  );
  const cleared =
    supply === scenario.demand &&
    constraintState.feasible &&
    cost === optimalCost;

  let message = "Set generator output, then check the market.";

  if (supply < scenario.demand) {
    message = `SHORTAGE // add ${scenario.demand - supply} MW`;
  } else if (supply > scenario.demand) {
    message = `EXCESS POWER // remove ${supply - scenario.demand} MW`;
  } else if (constraintState.minimumDeficit > 0) {
    const minimumIndex = scenario.minimums?.findIndex(
      (minimum, index) => dispatch[index] < minimum,
    );
    const generator = GENERATORS[minimumIndex ?? 0];
    const minimum = scenario.minimums?.[minimumIndex ?? 0] ?? 0;
    message = `COMMITMENT VIOLATION // ${generator.name.toLowerCase()} must supply at least ${minimum} MW`;
  } else if (constraintState.westOverload > 0) {
    message = `WEST LINE OVERLOAD // reduce west generation by ${constraintState.westOverload} MW`;
  } else if (constraintState.reserveShortfall > 0) {
    message = `RESERVE SHORT // leave ${constraintState.reserveShortfall} more MW of gas or peaker unused`;
  } else if (cost > optimalCost) {
    message = `DISPATCH COSTLY // ${scenario.costHint ?? "cheaper available power remains"}`;
  } else if (cleared) {
    message = "MARKET CLEARED // all rules met at minimum cost";
  }

  return {
    cleared,
    cost,
    marketPrice,
    message,
    minimumDeficit: constraintState.minimumDeficit,
    optimalCost,
    reserve: constraintState.reserve,
    reserveShortfall: constraintState.reserveShortfall,
    supply,
    westFlow: constraintState.westFlow,
    westOverload: constraintState.westOverload,
  };
}

export function areSolvedMarkets(value: unknown): value is number[][] {
  return (
    Array.isArray(value) &&
    value.length === MARKET_SCENARIOS.length &&
    value.every(
      (dispatch, scenarioIndex) =>
        isValidDispatch(scenarioIndex, dispatch) &&
        evaluateMarket(scenarioIndex, dispatch).cleared,
    )
  );
}
