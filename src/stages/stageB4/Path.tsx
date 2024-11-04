import { useMemo } from "react";
import { getPath } from "./getPath";
import { PathLine } from "./PathLine";
import { useJudge } from "./useJudge";
import { useProgress } from "./useProgress";

export function Path() {
  const points = useMemo(getPath, []);

  const progress = useProgress(points);

  useJudge(points.length, progress);

  return <PathLine points={points} progress={progress} />;
}
