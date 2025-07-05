import { useGame } from "./GameContext";
import { useGameLoop } from "./GameLoopContext";
import logo from "./assets/logo.svg";

function EndScreen() {
    const { } = useGame();
    const { configData, tresholdData, score } = useGameLoop();
    const validTreshold = tresholdData
        .filter(obj => obj.thresholdValue > score - 1)
        .sort((a, b) => a.thresholdValue - b.thresholdValue)[0] || null;

    return (
        <div className="flex flex-col justify-center h-screen-dvh bg-csas-blue text-figma-white">
            <div className="flex flex-col justify-between h-screen-dvh max-h-[50rem]">
                <div>
                    <h1 className="font-bold mt-12 text-center text-[5.17rem]">{score}</h1>
                    <h2 className="text-center text-2xl">{configData.textGameover}</h2>
                </div>
                <h2 className="font-bold mt-10 sm:mt-4 lg:mt-12 text-center text-2xl max-w-96 mx-auto px-2">
                    {validTreshold.thresholdTexts[0]}
                </h2>
                <h2 className="mt-10 sm:mt-4 lg:mt-12 text-center text-xl max-w-96 mx-auto px-2">
                    {validTreshold.thresholdTexts[1]}
                </h2>


                <div className="relative z-10 text-figma-white mb-16 mt-4">
                    <button className="block mx-auto text-xl rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                        onClick={() => {
                            const url = new URL(window.location.href);
                            window.location.replace(url.toString());
                        }}>
                        {"->"} {configData.textRestart}
                    </button>
                    <img className="mx-auto w-28 mb-8 mt-6" src={logo} alt="logo" />
                </div>
            </div>
        </div>
    );

}

export default EndScreen;
