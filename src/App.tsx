import { useEffect, useState } from "react";
import "./App.css";

type Game = {
  pcChoice: string;
  userChoice: string;
};

function App() {
  const [count, setCount] = useState(0);
  const [currentResult, setCurrentResult] = useState("");
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (game) {
      const result = gameResult();
      setCurrentResult(result);
    }
  }, [game]);

  const rps = ["rock", "paper", "scissors"];

  function pcChose() {
    const drawnNumber = Math.floor(Math.random() * 3);
    const drawnChoice = rps[drawnNumber];
    return drawnChoice;
  }

  function userChose(choice: string) {
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
      result = "Draw";
    } else if (game?.userChoice === "rock" && game?.pcChoice === "paper") {
      result = "PC Won";
    } else if (game?.userChoice === "rock" && game?.pcChoice === "scissors") {
      result = "User Won";
    } else if (game?.userChoice === "paper" && game?.pcChoice === "rock") {
      result = "User Won";
    } else if (game?.userChoice === "paper" && game?.pcChoice === "scissors") {
      result = "PC Won";
    } else if (game?.userChoice === "scissors" && game?.pcChoice === "rock") {
      result = "PC Won";
    } else if (game?.userChoice === "scissors" && game?.pcChoice === "paper") {
      result = "User Won";
    }

    setCount((prevV) => {
      if (result === "User Won") {
        return prevV + 1;
      } else if (result === "PC Won") {
        return prevV - 1;
      }
      return prevV;
    });
    console.log(result);
    return result;
    // return {
    // userWin: true,
    // pcWin: false,
    // draw: false,
    // pcChoice: 'rock',
    // userChoice: 'paper'
    // }
  }

  return (
    <div className="flex flex-col min-w-full min-h-screen items-center bg-gradient-to-t from-cyan-500 to-blue-500">
      <div className="flex justify-between outline w-2/5 items-center mt-10 bg-gradient-to-t from-indigo-700 to-violet-700">
        <div className="ml-5 mb-2 mt-2">
          <h1 className="title font-serif">Rock</h1>
          <h1 className="title font-serif">Paper</h1>
          <h1 className="title font-serif">Scisors</h1>
        </div>
        <div className="flex mr-5 border border-black h-28 w-28 justify-center items-center">
          <h1>Score: {count}</h1>
        </div>
      </div>
      <div className="flex items-center mt-10">
        <button
          onClick={() => {
            userChose("rock");
          }}
        >
          <img src="./public/rock.svg" className="choice"></img>
        </button>
        <button
          onClick={() => {
            userChose("paper");
          }}
        >
          <img src="./public/paper.svg" className="choice"></img>
        </button>
        <button
          onClick={() => {
            userChose("scissors");
          }}
        >
          <img src="./public/scissors.svg" className="choice"></img>
        </button>
      </div>
      {game && (
        <div className="flex justify-between text-center pt-12">
          <div className="flex choice justify-start">
            <p>
              Your choice:
              <img src={`./public/${game?.userChoice}.svg`}></img>
            </p>
          </div>
          <div className="flex justify-center items-center p-6">
            <h1>Result: {currentResult}</h1>
          </div>
          <div className="flex choice justify-end">
            <p>
              PC choice:
              <img src={`./public/${game?.pcChoice}.svg`}></img>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;