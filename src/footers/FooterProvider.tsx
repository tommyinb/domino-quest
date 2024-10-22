import { PropsWithChildren, useMemo, useState } from "react";
import { FooterContext } from "./FooterContext";

export function FooterProvider({ children }: PropsWithChildren) {
  const [undoHandlers, setUndoHandlers] = useState<(() => void)[]>([]);
  const [retryHandlers, setRetryHandlers] = useState<(() => void)[]>([]);

  return (
    <FooterContext.Provider
      value={useMemo(
        () => ({
          undoHandlers,
          setUndoHandlers,
          retryHandlers,
          setRetryHandlers,
        }),
        [retryHandlers, undoHandlers]
      )}
    >
      {children}
    </FooterContext.Provider>
  );
}
