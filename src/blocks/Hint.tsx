import { Html } from "@react-three/drei";
import { Vector3 } from "@react-three/fiber";
import { ReactNode, useContext } from "react";
import { Language } from "../languages/language";
import { LanguageContext } from "../languages/LanguageContext";
import { useLanguaged } from "../languages/useLanguaged";
import "./Hint.css";
import { HintContent } from "./HintContent";

export function Hint(props: Props) {
  const { position } = props;

  const content = useLanguaged(props);

  const { language } = useContext(LanguageContext);

  return (
    <Html className="blocks-Hint" position={position}>
      <div className={`content ${language}`}>
        <HintContent>{content}</HintContent>
      </div>

      <div className="arrow">v</div>
    </Html>
  );
}

interface Props extends Record<Language, ReactNode> {
  position: Vector3;
}
