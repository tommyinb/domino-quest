import { useMemo } from "react";
import { PathLine } from "../stageB4/PathLine";
import { useJudge } from "../stageB4/useJudge";
import { useProgress } from "../stageB4/useProgress";
import { getPath } from "./getPath";

export function Path() {
  const points = useMemo(getPath, []);

  const progress = useProgress(points);

  useJudge(points.length, progress);

  return <PathLine points={points} progress={progress} />;
}
