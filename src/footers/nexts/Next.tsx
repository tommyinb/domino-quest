import { useCurrentItem } from "../../controllers/useCurrentItem";
import { useSetCurrentItem } from "../../controllers/useSetCurrentItem";
import "./Next.css";
import { NextBlock } from "./NextBlock";

export function Next() {
  const item = useCurrentItem();
  const setItem = useSetCurrentItem();

  const availableNexts = item?.build.availableNexts ?? [];
  const selectedNext = item?.build.selectedNext;

  return (
    <div
      className={`footers-nexts-Next ${availableNexts.length ? "active" : ""}`}
    >
      {selectedNext && (
        <div
          className="selected"
          onClick={() => {
            const selectedIndex = availableNexts.indexOf(selectedNext);
            const nextIndex = (selectedIndex + 1) % availableNexts.length;

            setItem((item) => ({
              ...item,
              build: {
                ...item.build,
                selectedNext: availableNexts[nextIndex],
              },
            }));
          }}
        >
          <NextBlock
            blockType={selectedNext.blockType}
            limit={selectedNext.limit}
          />
        </div>
      )}
    </div>
  );
}
