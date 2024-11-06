import { SuccessForm } from "./SuccessForm";
import { useLevels } from "./useLevels";

export function Success() {
  const levels = useLevels(3);

  return (
    <>
      {levels.map((level) => (
        <SuccessForm key={level} level={level} />
      ))}
    </>
  );
}
