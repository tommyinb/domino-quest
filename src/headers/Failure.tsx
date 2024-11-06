import { FailureForm } from "./FailureForm";
import { useLevels } from "./useLevels";

export function Failure() {
  const levels = useLevels(2);

  return (
    <>
      {levels.map((level) => (
        <FailureForm key={level} level={level} />
      ))}
    </>
  );
}
