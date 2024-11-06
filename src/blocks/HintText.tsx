import {
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { LanguageContext } from "../languages/LanguageContext";
import "./HintText.css";

export function HintText({ children }: PropsWithChildren) {
  const [display, setDisplay] = useState<{ left: number; right: number }>();

  const mainRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    handler();
    function handler() {
      const mainRect = mainRef.current?.getBoundingClientRect();
      const spaceRect = spaceRef.current?.getBoundingClientRect();

      if ((mainRect?.x ?? 0) > (spaceRect?.width ?? 0)) {
        if ((mainRect?.x ?? 0) < document.body.clientWidth) {
          setDisplay({
            left: -(spaceRect?.width ?? 0),
            right: 0,
          });
        } else {
          const right = (mainRect?.x ?? 0) - document.body.clientWidth;
          setDisplay({
            left: -(
              Math.min(spaceRect?.width ?? 0, document.body.clientWidth) + right
            ),
            right,
          });
        }
      } else {
        setDisplay({
          left: -(mainRect?.x ?? 0),
          right: (mainRect?.x ?? 0) - (spaceRect?.width ?? 0),
        });
      }
    }

    const mutationObserver = new MutationObserver(handler);
    const hintElement = mainRef.current?.closest(".blocks-Hint");
    const parentElement = hintElement?.parentNode;
    if (parentElement) {
      mutationObserver.observe(parentElement, {
        attributes: true,
        attributeFilter: ["style"],
      });
    }

    const resizeObserver = new ResizeObserver(handler);
    resizeObserver.observe(document.body);

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  const { language } = useContext(LanguageContext);

  return (
    <div ref={mainRef} className={`blocks-HintContent ${language}`}>
      <div ref={spaceRef} className="space">
        {children}
      </div>

      {display && (
        <div className="content" style={display}>
          {children}
        </div>
      )}
    </div>
  );
}
