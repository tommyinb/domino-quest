import { ReactNode } from "react";
import { Language } from "../../languages/language";
import { useLanguaged } from "../../languages/useLanguaged";
import "./Hint.css";
import { HintContent } from "./HintContent";

export function Hint(props: Props) {
  const { className } = props;

  const content = useLanguaged(props);

  return (
    <div className={`footers-plays-Hint ${className}`}>
      <div className="content">
        <HintContent>{content}</HintContent>
      </div>

      <div className="arrow">v</div>
    </div>
  );
}

interface Props extends Record<Language, ReactNode> {
  className: string;
}
