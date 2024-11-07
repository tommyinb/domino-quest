import { PropsWithChildren, useMemo } from "react";
import { LanguageContext } from "./LanguageContext";
import { useStoredLanguage } from "./useStoredLanguage";

export function LanguageProvider({ children }: PropsWithChildren) {
  const { language, setLanguage } = useStoredLanguage();

  return (
    <LanguageContext.Provider
      value={useMemo(
        () => ({ language, setLanguage }),
        [language, setLanguage]
      )}
    >
      {children}
    </LanguageContext.Provider>
  );
}
