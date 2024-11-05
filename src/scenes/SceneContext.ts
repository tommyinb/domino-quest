import {
  createContext,
  Dispatch,
  PointerEventHandler,
  SetStateAction,
} from "react";

export const SceneContext = createContext<{
  pointerDownHandlers: PointerEventHandler<HTMLDivElement>[];
  setPointerDownHandlers: Dispatch<
    SetStateAction<PointerEventHandler<HTMLDivElement>[]>
  >;

  pointerMoveHandlers: PointerEventHandler<HTMLDivElement>[];
  setPointerMoveHandlers: Dispatch<
    SetStateAction<PointerEventHandler<HTMLDivElement>[]>
  >;

  pointerUpHandlers: PointerEventHandler<HTMLDivElement>[];
  setPointerUpHandlers: Dispatch<
    SetStateAction<PointerEventHandler<HTMLDivElement>[]>
  >;

  pointerCancelHandlers: PointerEventHandler<HTMLDivElement>[];
  setPointerCancelHandlers: Dispatch<
    SetStateAction<PointerEventHandler<HTMLDivElement>[]>
  >;
}>({
  pointerDownHandlers: [],
  setPointerDownHandlers: () => {},
  pointerMoveHandlers: [],
  setPointerMoveHandlers: () => {},
  pointerUpHandlers: [],
  setPointerUpHandlers: () => {},
  pointerCancelHandlers: [],
  setPointerCancelHandlers: () => {},
});
