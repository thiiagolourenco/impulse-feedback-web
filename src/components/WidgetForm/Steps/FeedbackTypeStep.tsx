import CloseButton from "../../CloseButton";
import { FeedbackType, feedbackTypes } from "..";

interface FeedbackTypeStepProps {
  onChangeFeedbackType: (type: FeedbackType) => void;
}

function FeedbackTypeStep(props: FeedbackTypeStepProps) {
  const { onChangeFeedbackType } = props;

  return (
    <>
      <header>
        <span className="text-xl leanding-6">Deixe seu feedback</span>
        <CloseButton />
      </header>
      <div className="flex py-8 gap-2 w-full">
        {Object.entries(feedbackTypes).map(([key, value]) => {
          return (
            <button
              key={key}
              onClick={() => {
                onChangeFeedbackType(key as FeedbackType);
              }}
              className="bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2 border-transparent hover:border-brand-500 focus: border-brand-500 focus:outline-none"
            >
              <img
                src={value.image.source}
                alt={value.image.alt}
                className="w-10"
              />
              <span>{value.title}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}

export default FeedbackTypeStep;
