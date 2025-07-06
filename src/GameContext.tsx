import React, { useState, createContext, useContext } from "react";

interface GameState {
    showWelcomeSite: boolean,
    setShowWelcomeSite: Function,
    endGame: boolean,
    setEndGame: Function,
    round: number,
    setRound: Function,
    showLandingSite: boolean,
    setShowLandingSite: Function,
    showInstructions: boolean,
    setShowInstructions: Function,
    showResults: boolean,
    setShowResults: Function,
}

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [showWelcomeSite, setShowWelcomeSite] = useState(true);
    const [endGame, setEndGame] = useState(false);
    const [round, setRound] = useState(1);
    const [showLandingSite, setShowLandingSite] = useState(true);
    const [showInstructions, setShowInstructions] = useState(false);
    const [showResults, setShowResults] = useState(true)

    return (
        <GameContext.Provider value={{
            showWelcomeSite, setShowWelcomeSite,
            endGame, setEndGame,
            round, setRound,
            showLandingSite, setShowLandingSite,
            showInstructions, setShowInstructions,
            showResults, setShowResults
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
