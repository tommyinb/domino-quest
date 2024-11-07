import { useContext } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { FailureForm } from "./FailureForm";

export function Failure() {
  const { levels } = useContext(ControllerContext);

  return (
    <>
      {levels.slice(-3).map((level) => (
        <FailureForm key={level} level={level} />
      ))}
    </>
  );
}
