import { createContext } from "react";

export const SettingContext = createContext<{
  debug: boolean;
  setDebug: (debug: boolean) => void;

  formActive: boolean;
  setFormActive: (active: boolean) => void;
}>({
  debug: false,
  setDebug: () => {},

  formActive: false,
  setFormActive: () => {},
});
