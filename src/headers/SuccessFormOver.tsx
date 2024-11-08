import { useContext } from "react";
import { LanguageContext } from "../languages/LanguageContext";
import { Languaged } from "../languages/Languaged";
import "./SuccessFormOver.css";

export function SuccessFormOver() {
  const { language } = useContext(LanguageContext);

  return (
    <div className="headers-SuccessFormOver">
      <div className="text">
        <Languaged
          en="Thank you for playing! It is my honor to have you made it this far. I hope you enjoyed the game, and I'd love to hear your feedback."
          zh="感謝您完全通關了！希望您喜歡這個遊戲，也很想聽聽您的意見。"
          ja="遊んでいただき、ありがとうございます！ゲームを楽しんでいただけたら嬉しいです。ぜひご意見をお聞かせください。"
        />
      </div>

      <a
        className={`button ${language}`}
        href="https://forms.gle/EgEv6vAfqpJvzXBg8"
        target="_blank"
      >
        <Languaged en="Feedback" zh="填寫問卷" ja="コメント" />
      </a>
    </div>
  );
}
