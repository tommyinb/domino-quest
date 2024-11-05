import { Html } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { PropsWithChildren, useContext } from "react";
import { LanguageContext } from "../languages/LanguageContext";
import "./Hint.css";

export function Hint({ position, children }: Props) {
  const { language } = useContext(LanguageContext);

  return (
    <Html className="blocks-Hint" position={position}>
      <div className={`content ${language}`}>{children}</div>
      <div className="arrow">v</div>
    </Html>
  );
}

interface Props extends PropsWithChildren {
  position: Vector3;
}
