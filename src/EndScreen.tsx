import { useGame } from "./GameContext";
import { useGameLoop } from "./GameLoopContext";
import logo from "./assets/logo.svg"
import logo_black from "./assets/logo_black.svg";

function splitRec(input: string): [string, string] {
    const trimmed = input.trim();
    const words = trimmed.split(' ').filter(word => word.length > 0);

    if (words.length <= 3) {
        return ['', trimmed];
    }

    const lastThreeWords = words.slice(-3).join(' ');
    const start = words.slice(0, -3).join(' ');

    return [start, lastThreeWords];
}

function Recomendations() {
    const { configData,
        score,
        roundsCount,
        wrongAnswers,
        shuffledQuestions
    } = useGameLoop();
    let selected_recomendations: [string, string, string][] = [];

    if (score == roundsCount) {
        selected_recomendations.push([...splitRec(configData.allCorrect), configData.allCorrectURL])
    } else if (score < 7) {
        selected_recomendations.push([...splitRec(configData.powerConsumption), configData.powerConsumptionURL])
        selected_recomendations.push([...splitRec(configData.reclamation), configData.reclamationURL])
        selected_recomendations.push([...splitRec(configData.executor), configData.executorURL])
    } else {
        wrongAnswers.forEach(item => (
            selected_recomendations.push([...splitRec(shuffledQuestions[item].recommendation),
            shuffledQuestions[item].recommendationURL])
        ))
    }

    return (
        <div className="flex flex-col h-screen-dvh text-figma-black bg-white">
            <img className="hidden xl:block w-28 fixed right-8 top-5" src={logo} alt="logo" />
            <div className="flex flex-col h-screen-dvh">
                <div className="flex flex-col w-full mx-auto">

                    <div className={`py-16 xl:py-24 bg-csas-blue px-5`}>
                        <div className="mx-auto max-h-[50rem]  md:w-[40rem] text-figma-white text-[2rem] text-center font-bold">
                            <h1>{configData.recommendation}</h1>
                        </div>
                    </div>

                    <div className="md:mx-auto max-h-[50rem]  md:w-[40rem] mx-2 p-2 mb-6">
                        {selected_recomendations.map(item => (
                            <div key={item[1]} className="flex flex-col items-center">
                                <p className="md:mx-auto md:w-[40rem] mx-4 mt-6 mb-1 text-xl text-center">
                                    {item[0]}
                                </p>
                                <a href={item[2]} className="md:mx-auto md:w-[40rem] mx-4 mb-3 text-xl text-center font-bold">
                                    {item[1]}
                                </a>
                            </div>
                        ))}
                    </div>

                    <a href={configData.skoalaLink} className="md:mx-auto md:w-[40rem] mx-8 p-2 mb-3 mt-2 font-extrabold text-xl text-center">
                        {configData.shareToOthers}
                    </a>

                    <img className="xl:hidden mx-auto w-28 mb-8 mt-6" src={logo_black} alt="logo" />
                </div>
            </div>
        </div>
    );
}

function Resutls() {
    const { setShowResults } = useGame();
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
                <h2 className="font-bold mt-10 sm:mt-4 lg:mt-12 text-center text-4xl max-w-96 mx-auto px-2">
                    {validTreshold.thresholdTexts[0]}
                </h2>
                <h2 className="mt-10 sm:mt-4 lg:mt-12 text-center text-xl max-w-96 mx-auto px-2">
                    {validTreshold.thresholdTexts[1]}
                </h2>


                <div className="relative z-10 text-figma-white mb-16 mt-4">
                    <button className="block mx-auto text-xl rounded-full py-2 px-7 font-bold hover:scale-110 duration-200"
                        onClick={() => {
                            setShowResults(false)
                        }}>
                        {"->"} {configData.forYou}
                    </button>
                </div>
            </div>
        </div>
    );
}



function EndScreen() {
    const { showResults } = useGame()

    let content = null
    if (showResults) content = <Resutls />
    else content = <Recomendations />

    return content
}

export default EndScreen
