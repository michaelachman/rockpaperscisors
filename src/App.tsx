import { useEffect, useState } from "react";
import "./App.css";
import { Shape } from "./components/Shape";

type PossibleChoice = "rock" | "paper" | "scissors";

type Game = {
  pcChoice: PossibleChoice;
  userChoice: PossibleChoice;
};

function App() {
  const [count, setCount] = useState(0);
  const [currentResult, setCurrentResult] = useState("");
  const [game, setGame] = useState<Game | null>(null);
  const [resultColor, setResultColor] = useState("");

  useEffect(() => {
    if (game) {
      const result = gameResult();
      setCurrentResult(result);
    }
  }, [game]);

  const rps = ["rock", "paper", "scissors"] as const;

  function pcChose(): PossibleChoice {
    const drawnNumber = Math.floor(Math.random() * 3);
    const drawnChoice = rps[drawnNumber];
    return drawnChoice;
  }

  function userChose(choice: PossibleChoice) {
    const pcChosen = pcChose();
    setGame({
      pcChoice: pcChosen,
      userChoice: choice,
    });
  }

  function gameResult() {
    // ... //
    let result = "";
    if (game?.userChoice === game?.pcChoice) {
      result = "DRAW";
    } else if (game?.userChoice === "rock" && game?.pcChoice === "paper") {
      result = "PC WON";
    } else if (game?.userChoice === "rock" && game?.pcChoice === "scissors") {
      result = "YOU WIN";
    } else if (game?.userChoice === "paper" && game?.pcChoice === "rock") {
      result = "YOU WIN";
    } else if (game?.userChoice === "paper" && game?.pcChoice === "scissors") {
      result = "PC WON";
    } else if (game?.userChoice === "scissors" && game?.pcChoice === "rock") {
      result = "PC WON";
    } else if (game?.userChoice === "scissors" && game?.pcChoice === "paper") {
      result = "YOU WIN";
    }

    setCount((prevV) => {
      if (result === "YOU WIN") {
        setResultColor("text-green-500");
        return prevV + 1;
      } else if (result === "PC WON") {
        setResultColor("text-red-500");
        return prevV - 1;
      } else if (result === "DRAW") {
        setResultColor("text-white");
      }
      return prevV;
    });

    console.log(result);
    return result;
  }

  return (
    <div className="flex flex-col min-w-full min-h-screen items-center bg-gradient-to-b from-blue-900 to-blue-600">
      <div className="flex justify-between w-2/5 items-center mt-10 rounded-xl border-white border-2">
        <div className="ml-8 mb-2 mt-2 text-white">
          <h1 className="title font-sans leading-tight tracking-normal font-bold">
            ROCK
          </h1>
          <h1 className="title font-sans leading-tight tracking-normal font-bold">
            PAPER
          </h1>
          <h1 className="title font-sans leading-tight tracking-normal font-bold">
            SCISSORS
          </h1>
        </div>
        <div className="score flex flex-col mr-5 h-28 w-28 justify-center items-center rounded-xl bg-white text-2xl">
          <h1>SCORE</h1>
          <h1>{count}</h1>
        </div>
      </div>
      {!game && (
        <div className="flex items-center mt-24 text-white">
          <Shape
            variant="rock"
            onClick={() => {
              userChose("rock");
            }}
          ></Shape>

          <Shape
            variant="paper"
            onClick={() => {
              userChose("paper");
            }}
          ></Shape>
          <Shape
            variant="scissors"
            onClick={() => {
              userChose("scissors");
            }}
          ></Shape>
        </div>
      )}
      {game && (
        <div>
          <div className="flex justify-between text-center mt-8 text-white">
            <div className="flex choice justify-start w-40">
              <p className="text-2xl">
                YOUR CHOICE
                <Shape variant={game.userChoice}></Shape>
              </p>
            </div>
            <div className="flex flex-col justify-center items-center p-6 border-4 border-white mx-8 mt-6 rounded-lg">
              <h1 className="text-2xl">RESULT</h1>
              <h1 className={`text-4xl font-bold ${resultColor}`}>
                {currentResult}
              </h1>
            </div>
            <div className="flex justify-end w-40">
              <p className="text-2xl cursor-default">
                PC CHOICE
                <Shape variant={game.pcChoice}></Shape>
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => {
                setGame(null);
              }}
              className="bg-white rounded-md px-4 py-2 font-semibold"
            >
              PLAY AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

// mialem zrobic zeby czcionka byla na zielono/czerwono/bialo zaleznie od resulta, wiec dolozylem nowego state z resultcolorem i setnalem to w srodku gameResulta zaleznie od tego jaki
// jest wynik i na takiej samej zasadzie jak wczoraj wrzucilem w classname tego state
