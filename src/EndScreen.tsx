import { useGame } from "./GameContext";
import { useGameLoop } from "./GameLoopContext";
import logo from "./assets/logo.svg"
import badge_0 from "./assets/statecnyzkousec.svg";
import badge_1 from "./assets/nahodilitrefovac.svg";
import badge_2 from "./assets/financninovacek.svg";
import badge_3 from "./assets/financniznalec.svg";
import badge_4 from "./assets/financniborec.svg";
import badge_5 from "./assets/financniguru.svg";
import elektrozrouti_img from "./assets/elektrozrouti.svg";
import exekutor_img from "./assets/exekutor.svg";
import ministr_img from "./assets/ministr.png";
import znatese_img from "./assets/znatese.svg";
import investice_img from "./assets/investice.svg";
import { useState } from "react";



function Recomendations() {
    const { configData } = useGameLoop();
    const banners = [
        [elektrozrouti_img, configData.powerConsumptionURL],
        [exekutor_img, configData.executorURL],
        [ministr_img, configData.ministerURL],
        [znatese_img, configData.guessGameURL],
        [investice_img, configData.investingURL]]

    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Quiz Link',
                    url: configData.quizLink,
                });
            } catch (err) {
                console.log('Share cancelled or failed');
            }
        } else {
            await navigator.clipboard.writeText(configData.quizLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    return (
        <div className="flex flex-col min-h-full text-figma-black">
            <div className="flex flex-col h-screen-dvh">
                <div className="flex flex-col w-full mx-auto">

                    <div className={`pt-16 mb-3 px-5`}>
                        <div className="mx-auto max-h-[50rem]  md:w-[21rem] text-figma-white  text-center ">
                            <h1 className="font-bold text-[2rem] mb-4">{configData.recommendationTitle}</h1>
                            <h2>{configData.recommendationText}</h2>
                        </div>
                    </div>

                    <div className="md:mx-auto  md:w-[40rem] mx-2 p-2 mb-6">
                        {banners.map(item => (
                            <div key={item[1]} className="flex flex-col items-center">
                                <a href={item[1]}>
                                    <img className="my-4" src={item[0]} alt="Doporuceni na vzdelavani" />
                                </a>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleShare}
                        className="md:mx-auto md:w-[40rem] mx-8 p-2 mb-3 mt-2 font-extrabold text-xl text-center text-figma-white cursor-pointer hover:opacity-80 transition-all"
                    >
                        {copied ? configData.copiedText : `-> ${configData.shareToOthers}`}
                    </button>

                    <img className="mx-auto w-28 mb-8 mt-6" src={logo} alt="logo" />

                    <p className="text-center mx-auto text-figma-white mb-8 text-lg max-w-60">{configData.helpToSpreadText}</p>
                </div>
            </div>
        </div>
    );
}

function Resutls() {
    const { setShowResults } = useGame();
    const { configData, tresholdData, score, roundsCount } = useGameLoop();
    const filteredTreshold = tresholdData
        .filter(obj => obj.thresholdValue > score - 1)
    const validTreshold = filteredTreshold
        .sort((a, b) => a.thresholdValue - b.thresholdValue)[0] || null;
    const badges = [badge_0, badge_1, badge_2, badge_3, badge_4, badge_5]
    const badge_index = badges.length - filteredTreshold.length

    return (
        <div className="flex flex-col justify-center h-screen-dvh bg-csas-blue text-figma-white">
            <div className="flex flex-col justify-between h-screen-dvh max-h-[50rem]">
                <div>
                    <h1 className="mt-12 text-center font-bold">
                        <span className="text-[4rem]">{score}/</span>
                        <span className="text-[1.5rem]">{roundsCount}</span>
                    </h1>
                    <h2 className="text-center text-[1rem] lg:text-xl font-bold">{configData.textGameover}</h2>
                </div>
                <img className="w-56 mx-auto mt-4" src={badges[badge_index]} alt="Odznak" />
                <h2 className="font-bold mt-6 sm:mt-4  text-center text-4xl max-w-96 mx-auto px-2">
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
