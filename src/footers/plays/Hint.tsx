import { PropsWithChildren } from "react";
import "./Hint.css";

export function Hint({ className, children }: Props) {
  return (
    <div className={`footers-plays-Hint ${className}`}>
      <div className="content">{children}</div>
      <div className="arrow">v</div>
    </div>
  );
}

interface Props extends PropsWithChildren {
  className: string;
}
