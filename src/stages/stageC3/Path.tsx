import { useMemo } from "react";
import { PathLine } from "./PathLine";
import { getPathLines } from "./getPathLines";
import { useJudge } from "./useJudge";

export function Path() {
  const lines = useMemo(getPathLines, []);

  useJudge(lines);

  return (
    <>
      {lines.map((path, index) => (
        <PathLine key={index} from={path.from} to={path.to} />
      ))}
    </>
  );
}
