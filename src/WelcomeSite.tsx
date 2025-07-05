import { useGame } from "./GameContext";
import { useGameLoop } from "./GameLoopContext";
import logo from "../src/assets/logo.svg"

function LandingSite() {
    const { setShowWelcomeSite, setShowInstructions } = useGame();
    const { configData,
        setShuffledQuestions,
        questionsData,
        setAnswersShift,
    } = useGameLoop();

    if (configData === null) {
        return (
            <div className="bg-figma-black h-screen-dvh">
                <h1 className="text-center pt-36 lg:pt-56 text-white">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between h-screen-dvh safe-padding bg-csas-blue px-8 max-h-[50rem]">
            <div className="w-[20rem]">
                <h1 className="font-bold text-figma-white text-left mt-48 text-[3rem]">{configData.gameTitle}</h1>
            </div>


            <div className="relative z-10 text-figma-white mb-16">
                <button className="block text-2xl font-bold hover:scale-110 duration-200"
                    onClick={() => {
                        setShowWelcomeSite(false);
                        setShowInstructions(true);
                        const shuffledQuestoins = [...questionsData].sort(() => Math.random() - 0.5);
                        const answersShift = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
                        setShuffledQuestions(shuffledQuestoins)
                        setAnswersShift(answersShift)
                    }}>
                    {"->"} {configData.textPlay}
                </button>
            </div>
            <img className="w-28 mb-8" src={logo} alt="logo" />
        </div>
    );
}


function WelcomeSite() {
    const { showLandingSite } = useGame();

    return (
        <>
            {showLandingSite && <LandingSite />}
        </>
    );
}

export default WelcomeSite;
