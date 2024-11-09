"use client";
import { useState } from "react";

type DiceValues = number; // 1-6
type DiceState = {
  dice1: DiceValues;
  dice2: DiceValues;
};

export default function Home() {
  const [dice, setDice] = useState<DiceState>({ dice1: 6, dice2: 6 });

  const handleRoll = () => {
    const numberFromInterval = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const newDiceState: DiceState = {
      dice1: numberFromInterval(1, 6),
      dice2: numberFromInterval(1, 6),
    };
    setDice(newDiceState);
  };
  return (
    <>
      <div>Dice 1: {dice.dice1}</div>
      <div>Dice 2: {dice.dice2}</div>
      <div>Total: {dice.dice1 + dice.dice2}</div>
      <button onClick={handleRoll}>Roll</button>
      <Mafia />
    </>
  );
}

type CardProps = {
  children: JSX.Element;
};
export function Card(props: CardProps) {
  return (
    <div className="block max-w-sm p-6 rounded-lg shadow  bg-gray-800 border-gray-700">
      {props.children}
    </div>
  );
}

const cardValues = ["imposter", "goku", "gokue", "PLAY"];

const CHARACTERS = ["goku", "deku", "ash"];
const IMPOSTER = "imposter";

export function Mafia() {
  const [page, setPage] = useState(0);
  const [playerCount, setPlayerCount] = useState(4);
  const [gameCardValues, setGameCardValues] = useState<Array<string>>([]);

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleStartGame = () => {
    setGameCardValues([]);
    setPage(0);
    const numberFromInterval = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const randomCharacter =
      CHARACTERS[numberFromInterval(0, CHARACTERS.length - 1)];

    // leave 1 spot for imposter
    const gameArray: Array<string> = new Array(playerCount - 1).fill(
      randomCharacter
    );

    const gameArrayWithImposter = gameArray.toSpliced(
      numberFromInterval(0, playerCount - 1),
      0,
      IMPOSTER
    );

    let arrayWithPasses: Array<string> = [];

    gameArrayWithImposter.forEach((value, index) => {
      arrayWithPasses.push(`Player ${index + 1}: ` + value);
      arrayWithPasses.push("Pass to next player");
    });

    setGameCardValues(arrayWithPasses);
  };
  const card = (
    <Card>
      <>
        <h1 className="text-white mb-2 text-2xl font-bold tracking-tight">
          {page >= gameCardValues.length
            ? "START THE GAME!"
            : gameCardValues[page]}
        </h1>
        {page < gameCardValues.length ? (
          <button onClick={handleNext} className="text-white tracking-tight">
            Next
          </button>
        ) : (
          <></>
        )}
      </>
    </Card>
  );

  const settings = (
    <div className="w-6/12">
      <div>
        <label
          htmlFor="number_of_players"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Number of Players
        </label>
        <input
          type="number"
          id="number_of_players"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={playerCount}
          onInput={(e) =>
            setPlayerCount(parseInt((e.target as HTMLInputElement).value))
          }
          required
        />
      </div>
      <button
        onClick={handleStartGame}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Start
      </button>
    </div>
  );

  return (
    <div className="flex w-screen flex-col items-center gap-4">
      {settings}
      {gameCardValues.length > 0 ? card : <></>}
    </div>
  );
}
