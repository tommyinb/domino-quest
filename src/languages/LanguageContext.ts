import { createContext } from "react";
import { Language } from "./language";

export const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
}>({
  language: "en",
  setLanguage: () => {},
});
