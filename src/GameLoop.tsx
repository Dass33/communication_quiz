import { useState } from "react";
import { useGame } from "./GameContext";
import { useGameLoop } from "./GameLoopContext";


function RoundEnd() {
    const { round, setRound, setEndGame } = useGame();
    const { configData,
        shuffledQuestions,
        setShowRoundEnd,
        setShowQuestion,
        currRoundAnswer,
        setScore,
        score,
        roundsCount,
        figmaColors,
    } = useGameLoop();

    const currQuestion = shuffledQuestions[round - 1];
    const currColor = figmaColors[(round - 1) % figmaColors.length]
    const isCorrect = currQuestion.answers[0] === currRoundAnswer

    return (
        <div className="flex flex-col h-screen-dvh text-figma-black bg-white">
            <div className="flex flex-col h-screen-dvh max-h-[50rem]">
                <div className="flex flex-col w-full md:w-[40rem] mx-auto">

                    <div className={`lg:pt-12 py-2 bg-${currColor} px-5`}>
                        <div className="flex flex-row items-center">
                            <span className="text-figma-white font-bold text-[2rem]">{round}</span>
                            <div className="w-full bg-white bg-opacity-20 h-2 mx-6">
                                <div
                                    className="bg-figma-white h-2"
                                    style={{ width: `${round * 10}%` }}
                                ></div>
                            </div>
                        </div>

                        <p className="mb-3 mt-7 text-figma-white text-[1rem] text-start font-bold">
                            {isCorrect
                                ? configData.correctAnswer
                                : configData.wrongAnswer
                            }
                        </p>
                    </div>

                    <div className="flex flex-col mx-5 p-2 my-6 border-black border rounded-lg">
                        {currQuestion.answerDescription}
                    </div>


                </div>
            </div>
            <div className="flex relative z-10 mb-6">
                <button
                    className={`block mx-auto text-2xl text-${currColor} rounded-full py-2 px-7 font-bold
                            hover:scale-110 duration-200`}
                    onClick={() => {
                        setShowQuestion(true)
                        setShowRoundEnd(false)
                        setRound(round + 1)
                        if (isCorrect) setScore(score + 1)
                        if (round === roundsCount) setEndGame(true)
                    }}>
                    {"->"} {configData.buttonNext}
                </button>
            </div>
        </div>
    );
}

function Question() {
    const { round } = useGame();
    const { configData, shuffledQuestions,
        setShowRoundEnd,
        setShowQuestion,
        setCurrRoundAnswer,
        answersShift,
        figmaColors,
    } = useGameLoop();
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const currQuestion = shuffledQuestions[round - 1];
    let shuffledAnswers: string[] = new Array(4)
    currQuestion.answers.forEach((answer, idx) => {
        shuffledAnswers[(answersShift[round - 1] + idx) % 4] = answer
    })
    console.log(shuffledAnswers)
    const currColor = figmaColors[(round - 1) % figmaColors.length]

    return (
        <div className="flex flex-col h-screen-dvh text-figma-black bg-white">
            <div className="flex flex-col h-screen-dvh max-h-[50rem]">
                <div className="flex flex-col w-full md:w-[40rem] mx-auto">

                    <div className={`lg:pt-12 py-2 bg-${currColor} px-5`}>
                        <div className="flex flex-row items-center">
                            <span className="text-figma-white font-bold text-[2rem]">{round}</span>
                            <div className="w-full bg-white bg-opacity-20 h-2 mx-6">
                                <div
                                    className="bg-figma-white h-2"
                                    style={{ width: `${round * 10}%` }}
                                ></div>
                            </div>
                        </div>

                        <p className="my-3 text-figma-white font-medium text-lg text-start">
                            {currQuestion.question}
                        </p>
                    </div>

                    <div className="flex flex-col mx-5 gap-4 my-4">
                        {shuffledAnswers.map((answer, index) => (
                            <label
                                key={index}
                                className={`flex items-center py-3 px-4 cursor-pointer border-figma-light-gray border rounded-[1.375rem] min-h-10
                                            ${selectedAnswer === answer ? "text-figma-white bg-" + currColor : 'bg-white'}`}>

                                <input
                                    type="radio"
                                    name="answers"
                                    value={answer}
                                    checked={selectedAnswer === answer}
                                    className="appearance-none"
                                    onChange={e => setSelectedAnswer(e.target.value)}
                                />
                                <span className="font-medium text-[1rem]">{answer}</span>
                            </label>
                        ))}
                    </div>


                </div>
            </div>
            <div className="flex relative z-10 mb-6">
                {selectedAnswer && <button
                    className={`block mx-auto text-2xl text-${currColor} rounded-full py-2 px-7 font-bold
                            hover:scale-110 duration-200`}
                    disabled={selectedAnswer === ""}
                    onClick={() => {
                        setCurrRoundAnswer(selectedAnswer);
                        setShowQuestion(false);
                        setShowRoundEnd(true)
                    }}>
                    {"->"} {configData.buttonNext}
                </button>}
            </div>
        </div>
    );
}

function GameLoop() {

    const {
        showQuestion,
        showRoundEnd,
    } = useGameLoop();

    let content = null;
    if (showQuestion) content = <Question />;
    if (showRoundEnd) content = <RoundEnd />

    return content;
}

export default GameLoop;
