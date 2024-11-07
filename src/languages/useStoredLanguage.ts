import { useEffect, useState } from "react";
import { Language } from "./language";

export function useStoredLanguage() {
  const storageKey = "languages-useStoredLanguage-1";

  const [language, setLanguage] = useState<Language>(() => {
    const text = localStorage.getItem(storageKey);
    if (text) {
      return text as Language;
    } else {
      const languages = navigator.languages
        .map((language) => language.substring(0, 2))
        .filter(
          (language) =>
            language === "en" || language === "zh" || language === "ja"
        );

      if (languages.length > 0) {
        return languages[0] as Language;
      } else {
        return "en";
      }
    }
  });

  useEffect(() => localStorage.setItem(storageKey, language), [language]);

  return { language, setLanguage };
}
