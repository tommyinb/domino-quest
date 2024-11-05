import { ReactNode } from "react";
import { Language } from "./language";
import { useLanguaged } from "./useLanguaged";

export function Languaged(props: Props) {
  return <>{useLanguaged(props)}</>;
}

type Props = Record<Language, ReactNode>;
