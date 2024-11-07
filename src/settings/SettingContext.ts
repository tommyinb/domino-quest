import { createContext } from "react";

export const SettingContext = createContext<{
  startTime: Date;

  debug: boolean;
  setDebug: (debug: boolean) => void;

  formActive: boolean;
  setFormActive: (active: boolean) => void;
}>({
  startTime: new Date(),

  debug: false,
  setDebug: () => {},

  formActive: false,
  setFormActive: () => {},
});
