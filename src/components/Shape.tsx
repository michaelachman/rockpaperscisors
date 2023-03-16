import rockImage from "../assets/rock.svg";
import paperImage from "../assets/paper.svg";
import scissorsImage from "../assets/scissors.svg";

type Variant = "rock" | "paper" | "scissors";

export type ShapeProps = {
  variant: Variant;
  onClick?: () => void;
};

export const Shape = (props: ShapeProps) => {
  const srcMap = {
    rock: rockImage,
    paper: paperImage,
    scissors: scissorsImage,
  };

  const classNameMap = {
    rock: "border-red-500/75",
    paper: "border-blue-500/75",
    scissors: "border-yellow-500/75",
  };

  return (
    <button
      onClick={props.onClick}
      className={`flex w-40 h-40 rounded-full border-8 mx-4 items-center justify-center ${
        classNameMap[props.variant]
      } ${!props.onClick ? `cursor-default` : ``}`}
    >
      <img src={srcMap[props.variant]} className="w-28 h-28"></img>
    </button>
  );
};
