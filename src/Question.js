import QuestionHeader from "./QuestionHeader";
import Choices from "./Choices";
import { useState } from "react";

const Question = ({
  questionText,
  choiceArray,
  correctChoice,
  index,
  onSubmit,
}) => {
  const [selection, setSelection] = useState(null);

  const handleSelection = (value) => {
    setSelection(value);
  };

  const handleSubmit = () => {
    onSubmit(selection === choiceArray[correctChoice]);
  };

  return (
    <div className="p-4">
      <QuestionHeader text={questionText} index={index + 1} />
      <Choices
        choiceArray={choiceArray}
        selectedValue={selection}
        onSelection={handleSelection}
        correctChoice={correctChoice}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Question;
