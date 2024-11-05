import { createContext } from "react";

export const SettingContext = createContext<{
  startTime: Date;
  debug: boolean;

  formActive: boolean;
  setFormActive: (active: boolean) => void;
}>({
  startTime: new Date(),
  debug: false,

  formActive: false,
  setFormActive: () => {},
});
