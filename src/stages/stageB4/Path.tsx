import { PathLine } from "./PathLine";
import { useJudge } from "./useJudge";
import { usePath } from "./usePath";
import { useProgress } from "./useProgress";

export function Path() {
  const points = usePath();

  const progress = useProgress(points);

  useJudge(points.length, progress);

  return <PathLine points={points} progress={progress} />;
}
