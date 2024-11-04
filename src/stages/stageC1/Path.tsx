import { PathLine } from "../stageB4/PathLine";
import { useJudge } from "../stageB4/useJudge";
import { useProgress } from "../stageB4/useProgress";
import { usePath } from "./usePath";

export function Path() {
  const points = usePath();

  const progress = useProgress(points);

  useJudge(points.length, progress);

  return <PathLine points={points} progress={progress} />;
}
