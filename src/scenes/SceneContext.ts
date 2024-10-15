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
}>({
  debug: false,

  clickHandles: [],
  setClickHandles: () => {},
});
