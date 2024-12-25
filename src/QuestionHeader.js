const QuestionHeader = ({ text, index }) => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold">Question {index}</h2>
    <p className="mt-2">{text}</p>
  </div>
);

export default QuestionHeader;
