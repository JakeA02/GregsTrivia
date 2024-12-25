import { useState } from "react";
import "./App.css";

const Choices = ({
  choiceArray,
  onSelection,
  selectedValue,
  correctChoice,
  onSubmit,
}) => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmit();
  };

  const getChoiceLabelClass = (choice) => {
    if (!submitted) return "p-2 hover:bg-gray-100 cursor-pointer rounded";
    return choice === choiceArray[correctChoice]
      ? "p-2 bg-green-100 text-green-700 rounded"
      : "p-2 bg-red-100 text-red-700 rounded";
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {choiceArray.map((choice, index) => (
          <div key={index} className="flex items-center space-x-2">
            <input
              type="radio"
              id={`choice${index}`}
              name="answer"
              value={choice}
              checked={selectedValue === choice}
              onChange={(e) => onSelection(e.target.value)}
              disabled={submitted}
              className="w-4 h-4"
            />
            <label
              htmlFor={`choice${index}`}
              className={getChoiceLabelClass(choice)}
            >
              {choice}
            </label>
          </div>
        ))}
        <button
          type="submit"
          disabled={submitted || !selectedValue}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit answer
        </button>
      </form>
    </div>
  );
};

export default Choices;
