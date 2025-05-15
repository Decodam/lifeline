import React, { useEffect } from "react";
import { IconVolume, IconClipboard } from "@tabler/icons-react";
import { ReactTyped } from "react-typed";
import speech from "react-tts-voice";
import { useSelector } from "react-redux";
import { selectLanguage } from "../config/languageSlice";

const Message = (props) => {
  const lang = useSelector(selectLanguage);

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  useEffect(() => {
    if (props.bot && props.last) {
      speech({
        text: props.text,
        lang: lang === "hi" ? "hi-IN" : "en-GB",
        volume: 0.8,
        rate: 1.1,
        pitch: 1,
        voice: lang === "hi" ? "Google हिन्दी" : "Google UK English Male",
      });
    }
  }, [props.bot, props.last, props.text, lang]);

  return (
    <div className="my-4">
      <div
        className={`message-text w-fit ${
          props.bot
            ? "font-semibold text-stone-900"
            : "font-medium text-stone-600 ml-auto text-right"
        } text-lg sm:text-xl max-w-60 sm:max-w-screen-md ${
          !props.bot ? "bg-grayscale" : "bg-transparent"
        } p-4 rounded-3xl`}
      >
        {props.last && props.bot ? (
          <>
            <ReactTyped
              strings={[
                (() => {
                  const sentences = props.text.match(/[^.?!]+[.?!]?/g) || [];
                  const output = [];
                  let buffer = "";
                  let insideNumberedPoint = false;

                  const isNumberedStart = (str) => {
                    // Match number + dot + space, but NOT decimals like 1.3 or 2.5
                    return /^\d+\.\s/.test(str);
                  };

                  for (let i = 0; i < sentences.length; i++) {
                    const current = sentences[i].trim();

                    // Check if current ends with colon :
                    const endsWithColon = current.endsWith(":");

                    if (isNumberedStart(current)) {
                      if (buffer) {
                        output.push(buffer);
                      }
                      buffer = current;
                      insideNumberedPoint = true;

                      // If colon at end of numbered start line, push buffer immediately to break line
                      if (endsWithColon) {
                        output.push(buffer);
                        buffer = "";
                        insideNumberedPoint = false;
                      }
                    } else if (insideNumberedPoint) {
                      buffer += " " + current;

                      // If colon inside numbered point, break buffer here
                      if (endsWithColon) {
                        output.push(buffer);
                        buffer = "";
                        insideNumberedPoint = false;
                      }
                    } else {
                      // Normal line prefix with >
                      output.push(`${current}`);

                      // Colon in normal lines means break line naturally anyway (already separate)
                    }

                    // Peek next sentence for numbered start to flush buffer
                    const next = sentences[i + 1]?.trim() || "";
                    if (insideNumberedPoint && isNumberedStart(next)) {
                      output.push(buffer);
                      buffer = "";
                      insideNumberedPoint = false;
                    }
                  }

                  if (buffer) {
                    output.push(buffer);
                  }

                  return output.join("<br/><br/>");
                })(),
              ]}
              typeSpeed={40}
              backSpeed={50}
              showCursor={false}
              loop={false}
              html
            />
          </>
        ) : (
          props.text
        )}
      </div>

      <div className="flex justify-between items-center px-4">
        {props.bot ? (
          <div className="text-sm text-stone-400">{`>. `}Doctor Bot</div>
        ) : (
          <div className="text-sm ml-auto w-fit mt-4 text-stone-400">
            user{` .<`}
          </div>
        )}
        {props.bot && (
          <div>
            <button
              onClick={() => {
                speech({
                  text: props.text,
                  lang: lang === "hi" ? "hi-IN" : "en-GB",
                  volume: 0.8,
                  rate: 1.1,
                  pitch: 1,
                  voice:
                    lang === "hi" ? "Google हिन्दी" : "Google UK English Male",
                });
              }}
            >
              <IconVolume color="#aaa" size={16} />
            </button>
            <button
              className="ml-2"
              onClick={() => {
                copyToClipboard(props.text);
              }}
            >
              <IconClipboard color="#aaa" size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
