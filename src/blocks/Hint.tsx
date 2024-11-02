import { Html } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { PropsWithChildren } from "react";
import "./Hint.css";

export function Hint({ position, children }: Props) {
  return (
    <Html className="blocks-Hint" position={position}>
      <div className="content">{children}</div>
      <div className="arrow">v</div>
    </Html>
  );
}

interface Props extends PropsWithChildren {
  position: Vector3;
}
