import {
  createContext,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
} from "react";

export const SceneContext = createContext<{
  debug: boolean;
  setDebug: (debug: boolean) => void;

  clickHandles: MouseEventHandler<HTMLDivElement>[];
  setClickHandles: Dispatch<
    SetStateAction<MouseEventHandler<HTMLDivElement>[]>
  >;

  orbitControlDisables: unknown[];
  setOrbitControlDisables: Dispatch<SetStateAction<unknown[]>>;
}>({
  debug: false,
  setDebug: () => {},

  clickHandles: [],
  setClickHandles: () => {},

  orbitControlDisables: [],
  setOrbitControlDisables: () => {},
});
