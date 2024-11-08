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

export function getStarts() {
  return [
    startA,

    startB1,
    startB2,
    startB3,
    startB4,
    startB5,

    startC1,
    startC2,
    startC3,

    startD,
  ];
}
