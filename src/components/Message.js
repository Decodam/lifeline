import React, { useEffect } from "react";
import { IconVolume, IconClipboard } from "@tabler/icons-react";
import speech from "react-tts-voice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../config/languageSlice";

const Message = ({ text, bot, last }) => {
  const lang = useSelector(selectLanguage);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Copied to clipboard"))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  useEffect(() => {
    if (bot && last) {
      speech({
        text,
        lang: lang === "hi" ? "hi-IN" : "en-GB",
        volume: 0.8,
        rate: 1.1,
        pitch: 1,
        voice: lang === "hi" ? "Google हिन्दी" : "Google UK English Male",
      });
    }
  }, [bot, last, text, lang]);

  return (
    <div className="my-4">
      <div
        className={`message-text w-fit max-w-screen-md text-lg sm:text-xl p-4 rounded-3xl ${
          bot
            ? "bg-transparent font-semibold text-stone-900"
            : "bg-grayscale ml-auto font-medium text-stone-600 text-right"
        }`}
      >
        {text}
      </div>

      <div className="flex justify-between items-center px-4 mt-1">
        {bot ? (
          <>
            <span className="text-sm text-stone-400">Doctor Bot</span>
            <div className="flex items-center">
              <button onClick={() => speech({
                text,
                lang: lang === "hi" ? "hi-IN" : "en-GB",
                volume: 0.8,
                rate: 1.1,
                pitch: 1,
                voice: lang === "hi" ? "Google हिन्दी" : "Google UK English Male",
              })}>
                <IconVolume color="#aaa" size={16} />
              </button>
              <button className="ml-2" onClick={() => copyToClipboard(text)}>
                <IconClipboard color="#aaa" size={16} />
              </button>
            </div>
          </>
        ) : (
          <span className="text-sm text-stone-400 ml-auto">You</span>
        )}
      </div>
    </div>
  );
};

export default Message;
