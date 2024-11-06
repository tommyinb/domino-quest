import {
  PropsWithChildren,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { LanguageContext } from "../../languages/LanguageContext";
import "./HintContent.css";

export function HintContent({ children }: PropsWithChildren) {
  const [display, setDisplay] = useState<{ left: number; right: number }>();

  const mainRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    handler();
    function handler() {
      const mainRect = mainRef.current?.getBoundingClientRect();
      const spaceRect = spaceRef.current?.getBoundingClientRect();

      if ((mainRect?.x ?? 0) < (spaceRect?.width ?? 0) / 2) {
        setDisplay({
          left: -(mainRect?.x ?? 0),
          right: -(
            Math.min(spaceRect?.width ?? 0, document.body.clientWidth) -
            (mainRect?.x ?? 0)
          ),
        });
      } else if (
        document.body.clientWidth - (mainRect?.x ?? 0) <
        (spaceRect?.width ?? 0) / 2
      ) {
        setDisplay({
          left: -(
            Math.min(spaceRect?.width ?? 0, document.body.clientWidth) -
            (document.body.clientWidth - (mainRect?.x ?? 0))
          ),
          right: -(document.body.clientWidth - (mainRect?.x ?? 0)),
        });
      } else {
        setDisplay({
          left: -((spaceRect?.width ?? 0) / 2),
          right: -((spaceRect?.width ?? 0) / 2),
        });
      }
    }

    const resizeObserver = new ResizeObserver(handler);
    if (spaceRef.current) {
      resizeObserver.observe(spaceRef.current);
    }
    resizeObserver.observe(document.body);

    return () => resizeObserver.disconnect();
  }, []);

  const { language } = useContext(LanguageContext);

  return (
    <div ref={mainRef} className={`footers-plays-HintContent ${language}`}>
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
