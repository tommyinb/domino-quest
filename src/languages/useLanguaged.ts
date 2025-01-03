import { useContext } from "react";
import { Language } from "./language";
import { LanguageContext } from "./LanguageContext";

export function useLanguaged<T>(map: Record<Language, T>) {
  const { language } = useContext(LanguageContext);

  return map?.[language];
}
