import { createContext } from "react";

export const SceneContext = createContext<{
  debug: boolean;

  orbitControlEnabled: boolean;
  setOrbitControlEnabled: (enabled: boolean) => void;
}>({
  debug: false,

  orbitControlEnabled: true,
  setOrbitControlEnabled: () => {},
});
