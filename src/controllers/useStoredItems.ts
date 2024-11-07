import { useEffect, useRef, useState } from "react";
import { Euler, Vector3 } from "three";
import { Block } from "../blocks/block";
import { getStages } from "./getStages";
import { Item } from "./item";
import { ItemState } from "./itemState";

export function useStoredItems() {
  const storageKeyPrefix = "controllers-useStoredItems-1";

  const storedRef = useRef(new Map<string, Block[]>());

  const [items, setItems] = useState(() =>
    getStages().map<Item>((stage) => {
      const blocksText = localStorage.getItem(
        `${storageKeyPrefix}.${stage.start.uuid}`
      );

      const blocksValue = (() => {
        try {
          const json: Stored<Block>[] = JSON.parse(blocksText ?? "[]");

          return json.map<Block>((block) => ({
            ...block,
            position: new Vector3(
              block.position.x,
              block.position.y,
              block.position.z
            ),
            rotation: new Euler(
              block.rotation.x,
              block.rotation.y,
              block.rotation.z
            ),
          }));
        } catch (error) {
          console.error(error);

          return [];
        }
      })();

      storedRef.current.set(stage.start.uuid, blocksValue);

      return {
        ...stage,
        state: ItemState.Idle,
        build: {
          blocks: blocksValue,
          availableNexts: [],
          selectedNext: undefined,
          undoHandlers: [],
          retryHandlers: [],
          view: 0,
        },
        round: 0,
      };
    })
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      for (const item of items) {
        const oldBlocks = storedRef.current.get(item.start.uuid);
        if (oldBlocks !== item.build.blocks) {
          storedRef.current.set(item.start.uuid, item.build.blocks);

          const value = item.build.blocks.map<Stored<Block>>((block) => ({
            ...block,
            position: {
              x: block.position.x,
              y: block.position.y,
              z: block.position.z,
            },
            rotation: {
              x: block.rotation.x,
              y: block.rotation.y,
              z: block.rotation.z,
            },
          }));

          const text = JSON.stringify(value);

          localStorage.setItem(`${storageKeyPrefix}.${item.start.uuid}`, text);
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [items]);

  return {
    items,
    setItems,
  };
}

type Stored<T> = {
  [P in keyof T]: T[P] extends Vector3
    ? { x: number; y: number; z: number }
    : T[P] extends Euler
    ? { x: number; y: number; z: number }
    : T[P] extends string | number | boolean | null | undefined
    ? T[P]
    : never;
};
