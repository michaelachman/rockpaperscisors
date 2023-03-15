import { useEffect, useState } from "react";
import "./App.css";
import rockImage from "./assets/rock.svg";
import paperImage from "./assets/paper.svg";
import scissorsImage from "./assets/scissors.svg";

type PossibleChoice = "rock" | "paper" | "scissors";

type Game = {
  pcChoice: PossibleChoice;
  userChoice: PossibleChoice;
};

function App() {
  const [count, setCount] = useState(0);
  const [currentResult, setCurrentResult] = useState("");
  const [game, setGame] = useState<Game | null>(null);
  const srcMap = {
    rock: rockImage,
    paper: paperImage,
    scissors: scissorsImage,
  };

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
        return prevV + 1;
      } else if (result === "PC WON") {
        return prevV - 1;
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
      <div className="flex items-center mt-10">
        <button
          onClick={() => {
            userChose("rock");
          }}
          className="flex w-40 h-40 rounded-full border-8 border-red-500/75 mx-4 items-center justify-center"
        >
          <img src={rockImage} className="w-28 h-28"></img>
        </button>
        <button
          onClick={() => {
            userChose("paper");
          }}
          className="flex w-40 h-40 rounded-full border-8 border-blue-500/75 mx-4 items-center justify-center"
        >
          <img src={paperImage} className="w-36 h-36"></img>
        </button>
        <button
          onClick={() => {
            userChose("scissors");
          }}
          className="flex w-40 h-40 rounded-full border-8 border-yellow-500/75 mx-4 items-center justify-center"
        >
          <img src={scissorsImage} className="w-32 h-32"></img>
        </button>
      </div>
      {game && (
        <div className="flex justify-between text-center pt-12">
          <div className="flex choice justify-start w-40">
            <p className="text-2xl text-white">
              YOUR CHOICE
              <img src={srcMap[game.userChoice]}></img>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center p-6 text-white border border-white mx-8 mt-6 rounded-lg">
            <h1 className="text-2xl">RESULT</h1>
            <h1 className="text-4xl font-bold">{currentResult}</h1>
          </div>
          <div className="flex choice justify-end w-40">
            <p className="text-2xl text-white">
              PC CHOICE
              <img src={srcMap[game.pcChoice]}></img>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

// 1. jak pomniejszyc ten kamien zeby dopasowac go wielkosciowo do papieru i nozyc ktore sa mniejsze
// 2. jak zrobic zeby mozliwosc klikniecia buttona sie pojawila dopiero w momencie jak najade na obszar obrazka a nie zeby byla opcja na klikniecie w divie ale poza okraglym borderem
