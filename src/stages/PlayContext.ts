import { createContext, Dispatch, SetStateAction } from "react";

export const PlayContext = createContext<{
  tippeds: boolean[];
  setTippeds: Dispatch<SetStateAction<boolean[]>>;
}>({
  tippeds: [],
  setTippeds: () => {},
});
