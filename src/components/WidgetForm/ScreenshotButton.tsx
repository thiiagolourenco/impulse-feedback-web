import { useState } from "react";
import Loading from "../Loading";
import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";

interface ScreenshotButtonProps {
  screenshot: string | null;
  setScreenshot: (value: string | null) => void;
}

function ScreenshotButton({
  screenshot,
  setScreenshot,
}: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState<boolean>(false);

  async function handleScreenshot() {
    setIsTakingScreenshot(true);
    try {
      const canvas = await html2canvas(document.querySelector("html")!);
      const base64image = canvas.toDataURL("image/png");
      setScreenshot(base64image);
    } catch (error) {
      window.alert("Não foi possível tirar a foto da tela :(");
    } finally {
      setIsTakingScreenshot(false);
    }
  }

  if (screenshot) {
    return (
      <button
        type="button"
        onClick={() => setScreenshot(null)}
        style={{ backgroundImage: `url(${screenshot})` }}
        className="p-1 flex justify-end w-10 h-10 items-end rounded-md border-transparent text-zinc-400 hover:text-zinc-100 transition-colors"
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => handleScreenshot()}
        className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
      >
        {isTakingScreenshot ? (
          <Loading />
        ) : (
          <Camera className="w-6 h-6 text-zinc-100" />
        )}
      </button>
    </>
  );
}
export default ScreenshotButton;
