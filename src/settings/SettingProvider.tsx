import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { Language } from "../languages/language";
import { SettingContext } from "./SettingContext";

export function SettingProvider({ children }: PropsWithChildren) {
  const startTime = useMemo(() => new Date(), []);

  const [debug, setDebug] = useState(false);
  useEffect(() => {
    Object.assign(window, { setDebug });

    return () => {
      Object.assign(window, { setDebug: undefined });
    };
  }, []);

  const [formActive, setFormActive] = useState(true);

  const [language, setLanguage] = useState<Language>("en");

  return (
    <SettingContext.Provider
      value={useMemo(
        () => ({
          startTime,
          debug,
          formActive,
          setFormActive,
          language,
          setLanguage,
        }),
        [debug, formActive, language, startTime]
      )}
    >
      {children}
    </SettingContext.Provider>
  );
}
