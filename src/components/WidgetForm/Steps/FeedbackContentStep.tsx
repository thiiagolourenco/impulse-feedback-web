import { FormEvent, useState } from "react";
import { ArrowLeft } from "phosphor-react";
import CloseButton from "../../CloseButton";
import { FeedbackType, feedbackTypes } from "..";
import ScreenshotButton from "../ScreenshotButton";
import { api } from "../../../lib/api";
import Loading from "../../Loading";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestart: () => void;
  onFeedbackSent: () => void;
}

function FeedbackContentStep({
  feedbackType,
  onFeedbackRestart,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [comment, setComment] = useState<string>("");
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [isSendingFeedback, setIsSendingFeedback] = useState<boolean>(false);

  async function feedbackSubmit(event: FormEvent) {
    event.preventDefault();
    setIsSendingFeedback(true);

    await api.post("/feedbacks", {
      type: feedbackType,
      comment: comment,
      screenshot: screenshot ?? "",
    });
    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header>
        <button
          type="button"
          onClick={() => onFeedbackRestart()}
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>
        <span className="text-xl leanding-6 flex items-center gap-2">
          <img
            className="w-5 h-5"
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>
      <form onSubmit={feedbackSubmit} className="my-4 w-full">
        <textarea
          onChange={(event) => setComment(event?.target.value)}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Conte com detalhes o que est?? acontecendo..."
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton
            screenshot={screenshot}
            setScreenshot={setScreenshot}
          />
          <button
            type="submit"
            disabled={comment === "" || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : "Enviar feedback"}
          </button>
        </footer>
      </form>
    </>
  );
}

export default FeedbackContentStep;
