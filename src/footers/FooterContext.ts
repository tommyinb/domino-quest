import { createContext, Dispatch } from "react";

export const FooterContext = createContext<{
  undoHandlers: (() => void)[];
  setUndoHandlers: Dispatch<React.SetStateAction<(() => void)[]>>;

  retryHandlers: (() => void)[];
  setRetryHandlers: Dispatch<React.SetStateAction<(() => void)[]>>;
}>({
  undoHandlers: [],
  setUndoHandlers: () => {},

  retryHandlers: [],
  setRetryHandlers: () => {},
});
