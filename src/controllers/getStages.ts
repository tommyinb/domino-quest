import * as startA from "../stages/stageA/start";
import * as startB1 from "../stages/stageB1/start";
import * as startB2 from "../stages/stageB2/start";
import * as startB3 from "../stages/stageB3/start";
import * as startB4 from "../stages/stageB4/start";
import * as startB5 from "../stages/stageB5/start";
import * as startC1 from "../stages/stageC1/start";
import * as startC2 from "../stages/stageC2/start";
import * as startC3 from "../stages/stageC3/start";
import * as startD from "../stages/stageD/start";

export function getStages() {
  return [
    { level: 1, start: startA },
    { level: 2, start: startB1 },
    { level: 3, start: startB2 },
    { level: 4, start: startB3 },
    { level: 5, start: startB4 },
    { level: 6, start: startB5 },
    { level: 7, start: startC1 },
    { level: 8, start: startC2 },
    { level: 9, start: startC3 },
    { level: 10, start: startD },
  ];
}