"use client";
import { use, useState } from "react";
import "./jdmstyle.css";

export default function jogodamemoria() {
    const [firstSelectedCard, setFSC] = useState(-1); // primeira carta selecionada pelo jogador
    const [cardsOnGrid, setCOG] = useState([""]);
    const [gameCards, setGameCards] = useState(["Carta1", "Carta2", "Carta3", "Carta4", "Carta5"]);
    const [attempts, setAttempts] = useState(0)

    const [non, forceRender] = useState(false)

    const [hardLockInput, setHLI] = useState(false)
    const [softLockInput, setSLI] = useState(false)


    function createGrid() {
        let newArray = [""];

        for (let i = 0; i < gameCards.length; i++) {
            const card = gameCards[i];
            console.log(card)
            newArray[(i * 2)] = card + "/0";
            newArray[(i * 2) + 1] = card + "/0";
        };

        setCOG(newArray);
    }

    function shuffleGrid() {
        let newArray = cardsOnGrid;
        let currentIndex = 0;
        let cards = cardsOnGrid.length;

        while (cards > 0) {
            currentIndex = Math.floor(Math.random() * cards);
            cards--;
            [newArray[currentIndex], newArray[cards]] = [newArray[cards], newArray[currentIndex]];
        };

        setCOG(newArray);
    };

    function checkWinCondition() {

    }

    function resetGame() {
        setHLI(false)
        setSLI(false)
        setFSC(-1)
        setAttempts(0)
    };

    function cardEvent(event) {
        if (softLockInput || hardLockInput) { return };
        let cardIndex = Number(event.target.innerHTML.split(" / ")[1]);
        cardsOnGrid[cardIndex] = cardsOnGrid[cardIndex].split("/")[0] + "/1"

        if (firstSelectedCard == -1) {
            setFSC(cardIndex);
        } else {
            setAttempts(attempts + 1)
            setSLI(true)
            if (cardsOnGrid[firstSelectedCard].split("/")[0] == cardsOnGrid[cardIndex].split("/")[0]) {
                console.log("Par");
                setTimeout(() => {
                    cardsOnGrid[firstSelectedCard] = cardsOnGrid[firstSelectedCard].split("/")[0] + "/2"
                    cardsOnGrid[cardIndex] = cardsOnGrid[cardIndex].split("/")[0] + "/2"
                    setFSC(-1);
                    setSLI(false);
                }, 700);
            } else {
                console.log("Errado!");
                setTimeout(() => {
                    cardsOnGrid[firstSelectedCard] = cardsOnGrid[firstSelectedCard].split("/")[0] + "/0"
                    cardsOnGrid[cardIndex] = cardsOnGrid[cardIndex].split("/")[0] + "/0"
                    setFSC(-1);
                    setSLI(false);
                }, 1150);
            };
        }
    }

    return (
        <section id="game_section">
            <button onClick={createGrid}>Criar</button>
            <button onClick={shuffleGrid}>Embaralhar</button>
            <button onClick={resetGame}>Resetar</button>
            <button onClick={() => { forceRender(!non) }}>Render</button>

            <section id="game_cards_grid">
                {cardsOnGrid.map((card, index) => {
                    let pieces = card.split("/")

                    switch (Number(pieces[1])) {
                        case 0: //carta está virada para baixo
                            return (
                                <div key={index} className="game_card_hidden">
                                    <button onClick={cardEvent}>{"CARTA ESCONDIDA / " + index.toString()}</button>
                                </div>
                            )

                        case 1: //carta está virada para cima
                            return (
                                <div key={index} className="game_card_visible">
                                    <button>{pieces[0].toUpperCase()}</button>
                                </div>
                            )
                        case 2: //carta é parte de um par
                            return (
                                <div key={index} className="game_card_pair">
                                    <button>{pieces[0].toUpperCase()}</button>
                                </div>
                            )
                    }

                })}
            </section>
        </section>
    );
};