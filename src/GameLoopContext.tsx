import { useEffect, useState, useRef, createContext, MutableRefObject, useContext } from "react";
import { getJsObjects } from "./fetchJson";

interface config {
    textPlay: string;
    roundsAmount: number;
    copyright: string;
    playerADefault: string;
    playerBDefault: string;
    pickNames: string;
    buttonNext: string;
    buttonPrev: string;
    correctAnswer: string;
    wrongAnswer: string;
    nowPlayPre: string;
    nowPlayPost: string;
    instructionsAPlayer: string;
    instructionsBPlayerPre: string;
    instructionsBPlayerPost: string;
    passDevice: string;
    resultBothFail: string;
    resultOneFail: string;
    resultBothSuccess: string;
    textAnswer: string;
    textGuessA: string;
    textGuessB: string;
    textSuccess: string;
    textGameover: string;
    colorA: string;
    colorB: string;
    gameTitle: string;
    textTutorial: string;
    textTutorialHead: string;
    textPickTheme: string;
    buttonNextRound: string;
    textPickAll: string;
    textClearAll: string;
    soundJingle: string;
    soundButtonClick: string;
    soundQuestionClick: string;
    soundAnswerCorrect: string;
    soundAnswerWrong: string;
    soundChangeStandings: string;
    soundTimerThreshold: string;
    soundTimerOver: string;
    soundNextRound: string;
    soundFinalRound: string;
    soundVictory: string;
    textRestart: string;
    textPlaying: string;
    colorTeamC: string;
    colorTeamD: string;
    colorTeamE: string;
    correctSpeed: number;
    teamBName: string;
    teamCName: string;
    teamDName: string;
    teamEName: string;
    time: number;
    timeOutStart: number;
    flashFrequency: number;
    timeOutText: number;
    exitQtext: string;
    exitQYes: string;
    exitQNo: string;
    textPickNrTeams: string;
    exitTooltipText: string;
    nextRoundText: string;
    textStartGame: string;
    imagesURL: string;
    textRound: string;
    textFirstRound: string;
    textLastRound: string;
    attentionFlash: number;
    prettyURL: string;
    resultsText: string;
    authorsTitle: string;
    authorsText: string;
}

interface question {
    question: string,
    id: number,
    answers: [string, string, string, string],
    answerDescription: string,
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
    roundStart: boolean,
    setRoundStart: Function,
    tutorial: boolean,
    setTutorial: Function,
    playerData: [Player, Player],
    setPlayerData: Function,
    selectedCategories: string[],
    setSelectedCategories: Function,
    shuffledQuestions: question[],
    setShuffledQuestions: Function,
    roundsCount: number,
    showQuestion: boolean,
    setShowQuestion: Function,
    showswitchPlayers: boolean,
    setShowSwitchPlayers: Function,
    showRoundEnd: boolean,
    setShowRoundEnd: Function,
    firstQuestion: boolean,
    setFirstQuestion: Function,
    secondQuestion: boolean,
    setSecondQuestion: Function,
    currRoundAnswer: string,
    setCurrRoundAnswer: Function,
    answersShift: number[],
    setAnswersShift: Function,
    score: number,
    setScore: Function,
}

interface Player {
    name: string,
    points: number,
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
    const hideTutorial = localStorage.getItem("tutorial") == "false";

    const [configData] = useJson(0);
    const [tresholdData] = useJson(1);
    const [questionsData] = useJson(2);
    const isInitialized = useRef(false);
    const figmaColors = ['csas-blue', 'csas-red-violet', 'csas-dark-teal', 'csas-green'];
    const [roundStart, setRoundStart] = useState(true);
    const [tutorial, setTutorial] = useState(hideTutorial ? false : true);
    const [playerData, setPlayerData] = useState<[Player, Player]>([{ name: "", points: 0, }, { name: "", points: 0, }]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [shuffledQuestions, setShuffledQuestions] = useState<question[]>([]);
    const roundsCount = 10;
    const [showQuestion, setShowQuestion] = useState(true);
    const [showswitchPlayers, setShowSwitchPlayers] = useState(false);
    const [showRoundEnd, setShowRoundEnd] = useState(false);
    const [firstQuestion, setFirstQuestion] = useState(true);
    const [secondQuestion, setSecondQuestion] = useState(false);
    const [currRoundAnswer, setCurrRoundAnswer] = useState("");
    const [answersShift, setAnswersShift] = useState([]);
    const [score, setScore] = useState(0)

    return (
        <GameLoopContext.Provider value={{
            configData,
            tresholdData,
            questionsData,
            isInitialized,
            figmaColors,
            roundStart, setRoundStart,
            tutorial, setTutorial,
            playerData, setPlayerData,
            selectedCategories, setSelectedCategories,
            shuffledQuestions, setShuffledQuestions,
            roundsCount,
            showQuestion, setShowQuestion,
            showswitchPlayers, setShowSwitchPlayers,
            showRoundEnd, setShowRoundEnd,
            firstQuestion, setFirstQuestion,
            secondQuestion, setSecondQuestion,
            currRoundAnswer, setCurrRoundAnswer,
            answersShift, setAnswersShift,
            score, setScore,
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
