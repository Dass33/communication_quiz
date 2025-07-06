import { useEffect, useState, useRef, createContext, MutableRefObject, useContext } from "react";
import { getJsObjects } from "./fetchJson";

interface config {
    textPlay: string;
    roundsAmount: number;
    copyright: string;
    buttonNext: string;
    buttonPrev: string;
    correctAnswer: string;
    wrongAnswer: string;
    textAnswer: string;
    textSuccess: string;
    textGameover: string;
    gameTitle: string;
    textPickTheme: string;
    buttonNextRound: string;
    time: number;
    nextRoundText: string;
    textStartGame: string;
    imagesURL: string;
    textRound: string;
    textFirstRound: string;
    textLastRound: string;
    attentionFlash: number;
    prettyURL: string;
    resultsText: string;
    forYou: string;
    recommendation: string;
    shareToOthers: string;
    allCorrect: string;
    powerConsumption: string;
    reclamation: string;
    executor: string;
}

interface question {
    question: string,
    id: number,
    answers: [string, string, string, string],
    answerDescription: string,
    recommendation: string,
}

interface treshold {
    thresholdValue: number,
    thresholdTexts: string,
}

interface GameLoopState {
    configData: config,
    tresholdData: treshold[]
    questionsData: question[],
    isInitialized: MutableRefObject<boolean>,
    figmaColors: string[],
    shuffledQuestions: question[],
    setShuffledQuestions: Function,
    roundsCount: number,
    showQuestion: boolean,
    setShowQuestion: Function,
    showRoundEnd: boolean,
    setShowRoundEnd: Function,
    currRoundAnswer: string,
    setCurrRoundAnswer: Function,
    answersShift: number[],
    setAnswersShift: Function,
    score: number,
    setScore: Function,
    wrongAnswers: number[],
    setWrongAnswers: Function
}

const GameLoopContext = createContext<GameLoopState | undefined>(undefined);

// Index 0 is config, 1 editions, 2 is question
export function useJson(index: number) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData = await getJsObjects();
                if (fetchedData) {
                    setData(fetchedData[index]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setData(null);
            }
        };
        fetchData();
    }, [index]);

    return [data, setData];
}

export const GameLoopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [configData] = useJson(0);
    const [tresholdData] = useJson(1);
    const [questionsData] = useJson(2);
    const isInitialized = useRef(false);
    const figmaColors = ['csas-blue', 'csas-red-violet', 'csas-dark-teal', 'csas-green'];
    const [shuffledQuestions, setShuffledQuestions] = useState<question[]>([]);
    const roundsCount = 10;
    const [showQuestion, setShowQuestion] = useState(true);
    const [showRoundEnd, setShowRoundEnd] = useState(false);
    const [currRoundAnswer, setCurrRoundAnswer] = useState("");
    const [answersShift, setAnswersShift] = useState([]);
    const [score, setScore] = useState(0)
    const [wrongAnswers, setWrongAnswers] = useState<number[]>([])

    return (
        <GameLoopContext.Provider value={{
            configData,
            tresholdData,
            questionsData,
            isInitialized,
            figmaColors,
            shuffledQuestions, setShuffledQuestions,
            roundsCount,
            showQuestion, setShowQuestion,
            showRoundEnd, setShowRoundEnd,
            currRoundAnswer, setCurrRoundAnswer,
            answersShift, setAnswersShift,
            score, setScore,
            wrongAnswers, setWrongAnswers
        }}>
            {children}
        </GameLoopContext.Provider>
    );
};

export const useGameLoop = () => {
    const context = useContext(GameLoopContext);
    if (!context) {
        throw new Error('useGameLoop must be used within a GameProvider');
    }
    return context;
}
