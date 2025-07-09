"use client";
import { use, useState } from "react";
import Image from "next/image";
import "./jdmstyle.css";

export default function jogodamemoria(Props: { Cards: any; Images: any; }) {

    const [firstSelectedCard, setFSC] = useState(-1); // primeira carta selecionada pelo jogador
    const [attempts, setAttempts] = useState(0)
    const [cardsOnGrid, setCOG] = useState([""]);

    const [non, forceRender] = useState(false)

    const [hardLockInput, setHLI] = useState(false)
    const [softLockInput, setSLI] = useState(false)

    let winScreenStatus = "not_visible"
    let gameWon = false

    function createGrid() {
        resetGame()
        let newArray = [""];

        for (let i = 0; i < Props.Cards.length; i++) {
            const card = Props.Cards[i];
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
        for (let index = 0; index < cardsOnGrid.length; index++) {
            const card = cardsOnGrid[index];
            if (card.split("/")[1] !== "2") {
                return false
            }
        }
        console.log("win")
        return true
    }

    function resetGame() {
        setHLI(false)
        setSLI(false)
        setFSC(-1)
        setAttempts(0)
    };

    function cardEvent(event: any) {
        if (softLockInput || hardLockInput) { return };
        let cardIndex = Number(event.target.innerHTML.split(" / ")[1]) - 1;
        cardsOnGrid[cardIndex] = cardsOnGrid[cardIndex].split("/")[0] + "/1"

        if (firstSelectedCard == -1) {
            setFSC(cardIndex);
        } else {
            setAttempts(attempts + 1)
            setSLI(true)
            if (cardsOnGrid[firstSelectedCard].split("/")[0] == cardsOnGrid[cardIndex].split("/")[0]) {
                setTimeout(() => {
                    cardsOnGrid[firstSelectedCard] = cardsOnGrid[firstSelectedCard].split("/")[0] + "/2"
                    cardsOnGrid[cardIndex] = cardsOnGrid[cardIndex].split("/")[0] + "/2"
                    setFSC(-1);
                    setSLI(false);
                }, 700);
            } else {
                setTimeout(() => {
                    cardsOnGrid[firstSelectedCard] = cardsOnGrid[firstSelectedCard].split("/")[0] + "/0"
                    cardsOnGrid[cardIndex] = cardsOnGrid[cardIndex].split("/")[0] + "/0"
                    setFSC(-1);
                    setSLI(false);
                }, 700);
            };
        }
    }

    gameWon = checkWinCondition()
    if (gameWon) {winScreenStatus = "visible"}
    return (
        <section id="game_section">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=add,cancel,playing_cards,refresh" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet"></link>

            <button className="game_button" onClick={createGrid}>
                <span className="material-symbols-outlined">add</span>
                Criar
            </button>
            <button className="game_button" onClick={shuffleGrid}>
                <span className="material-symbols-outlined">playing_cards</span>
                Embaralhar
            </button>
            <button className="game_button" onClick={() => { forceRender(!non) }}>
                <span className="material-symbols-outlined">refresh</span>
                Render
            </button>
            <button className="game_button" onClick={resetGame}>
                <span className="material-symbols-outlined">cancel</span>
                Resetar
            </button>

            <section className="game_win_screen" id={winScreenStatus}>
                <p id="game_win_title">Você ganhou!</p>
                <p id="game_win_tries">{"Você fez todos os pares em " + attempts.toString() + " tentativas!"}</p>
                <p id="game_win_precision">{ ((Props.Cards.length/(Math.max(attempts,1)))*100).toString().split(".")[0] + "% de precisão." }</p>
            </section>

            <section className="game_cards_grid">
                {cardsOnGrid.map((card, index) => {
                    let pieces = card.split("/")

                    if (gameWon) { //caso o jogo esteja ganho
                        return (
                            <div key={index} id="game_card" className="game_card_won">
                                <button id="card_button">{pieces[0].toUpperCase()}</button>
                            </div>
                        )
                    } //se a condição acima for verdadeira, acaba aqui.

                    switch (Number(pieces[1])) {
                        case 0: //carta está virada para baixo
                            return (
                                <div key={index} id="game_card" className="game_card_hidden">
                                    <button id="card_button" onClick={cardEvent}>{"CARTA ESCONDIDA / " + (index + 1).toString()}</button>
                                </div>
                            )

                        case 1: //carta está virada para cima
                            return (
                                <div key={index} id="game_card" className="game_card_visible">
                                    <Image className="game_card_image" alt="placeholder" src="/Images/no_image.jpeg" width={80} height={80}/>
                                    <button id="card_button">{pieces[0].toUpperCase()}
                                        
                                    </button>
                                </div>
                            )
                        case 2: //carta é parte de um par
                            return (
                                <div key={index} id="game_card" className="game_card_pair">
                                    <button id="card_button">{pieces[0].toUpperCase()}</button>
                                    <img className="game_card_image" src="./no_image.jpg" />
                                </div>
                            )
                    }

                })}
            </section>
        </section>
    );
};