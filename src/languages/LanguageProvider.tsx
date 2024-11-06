import { PropsWithChildren, useMemo, useState } from "react";
import { Language } from "./language";
import { LanguageContext } from "./LanguageContext";

export function LanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<Language>("ja");

  return (
    <LanguageContext.Provider
      value={useMemo(() => ({ language, setLanguage }), [language])}
    >
      {children}
    </LanguageContext.Provider>
  );
}
