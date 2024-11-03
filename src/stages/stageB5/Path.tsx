import { useMemo } from "react";
import { Vector3 } from "three";
import { PathLine } from "../stageB4/PathLine";
import { useJudge } from "../stageB4/useJudge";
import { useProgress } from "../stageB4/useProgress";
import bearPath from "./bearPath.json";

export function Path() {
  const points = useMemo(
    () => bearPath.map((point) => new Vector3(point.x * 180, 0, point.y * 180)),
    []
  );

  const progress = useProgress(points);

  useJudge(points.length, progress);

  return <PathLine points={points} progress={progress} />;
}
