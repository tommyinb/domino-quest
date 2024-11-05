import { lazy, Suspense, useContext } from "react";
import { LanguageContext } from "./LanguageContext";

const ChineseFont = lazy(() => import("./ChineseFont"));
const JapaneseFont = lazy(() => import("./JapaneseFont"));

export function Fonts() {
  const { language } = useContext(LanguageContext);

  return (
    <Suspense>
      {language === "zh" && <ChineseFont />}
      {language === "ja" && <JapaneseFont />}
    </Suspense>
  );
}
