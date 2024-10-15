import {
  createContext,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
} from "react";

export const SceneContext = createContext<{
  debug: boolean;

  clickHandles: MouseEventHandler<HTMLDivElement>[];
  setClickHandles: Dispatch<
    SetStateAction<MouseEventHandler<HTMLDivElement>[]>
  >;

  orbitControlDisables: unknown[];
  setOrbitControlDisables: Dispatch<SetStateAction<unknown[]>>;
}>({
  debug: false,

  clickHandles: [],
  setClickHandles: () => {},

  orbitControlDisables: [],
  setOrbitControlDisables: () => {},
});
