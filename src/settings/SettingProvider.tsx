import { PropsWithChildren, useEffect, useMemo, useState } from "react";
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

  const [formActive, setFormActive] = useState(false);

  return (
    <SettingContext.Provider
      value={useMemo(
        () => ({
          startTime,
          debug,
          setDebug,
          formActive,
          setFormActive,
        }),
        [debug, formActive, startTime]
      )}
    >
      {children}
    </SettingContext.Provider>
  );
}
