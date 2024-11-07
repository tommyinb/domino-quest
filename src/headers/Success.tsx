import { useContext } from "react";
import { ControllerContext } from "../controllers/ControllerContext";
import { SuccessForm } from "./SuccessForm";

export function Success() {
  const { levels } = useContext(ControllerContext);

  return (
    <>
      {levels.slice(-3).map((level) => (
        <SuccessForm key={level} level={level} />
      ))}
    </>
  );
}
