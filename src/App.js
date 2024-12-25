import React, { useState, useEffect } from "react";
import { GeneralQuestions } from "./Questions/GeneralQuestions";
import { MusicQuestions } from "./Questions/MusicQuestions";
import { FamilyQuestions } from "./Questions/FamilyQuestions";
import { Trophy, ArrowRight, Loader2 } from 'lucide-react';

const QuestionHeader = ({ text, index }) => (
  <div className="space-y-2">
    <h2 className="text-xl font-semibold text-gray-700">Question {index}</h2>
    <p className="text-lg text-gray-600">{text}</p>
  </div>
);

const Choice = ({ choice, index, selected, correct, showFeedback, onClick, disabled }) => {
  const baseStyles = "w-full p-4 mb-3 text-left rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const getStyles = () => {
    if (!showFeedback) {
      return `${baseStyles} ${selected ? 'bg-blue-50 border-blue-500' : 'bg-white border-gray-200 hover:bg-gray-50'}`;
    }
    if (index === correct) {
      return `${baseStyles} bg-green-50 border-green-500 text-green-700`;
    }
    if (selected && index !== correct) {
      return `${baseStyles} bg-red-50 border-red-500 text-red-700`;
    }
    return `${baseStyles} bg-white border-gray-200 opacity-50`;
  };

  return (
    <button
      onClick={() => onClick(choice)}
      disabled={disabled}
      className={getStyles()}
    >
      {choice}
    </button>
  );
};

const Question = ({
  questionText,
  choiceArray,
  correctChoice,
  index,
  onSubmit,
  setShowFeedback,
  showFeedback,
}) => {
  const [selection, setSelection] = useState(null);

  const handleSelection = (value) => {
    if (!showFeedback) {
      setSelection(value);
    }
  };

  const handleSubmit = () => {
    onSubmit(selection === choiceArray[correctChoice]);
    setShowFeedback(true);
  };

  return (
    <div className="space-y-6">
      <QuestionHeader text={questionText} index={index + 1} />
      
      <div className="space-y-2">
        {choiceArray.map((choice, idx) => (
          <Choice
            key={idx}
            choice={choice}
            index={idx}
            selected={selection === choice}
            correct={correctChoice}
            showFeedback={showFeedback}
            onClick={handleSelection}
            disabled={showFeedback}
          />
        ))}
      </div>

      {showFeedback ? (
        <div className={`p-4 rounded-lg text-center font-medium ${
          selection === choiceArray[correctChoice]
            ? 'bg-green-50 text-green-700'
            : 'bg-red-50 text-red-700'
        }`}>
          {selection === choiceArray[correctChoice]
            ? "Correct! 🎉"
            : `Incorrect. The correct answer was: ${choiceArray[correctChoice]} 😅`}
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={!selection}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
        >
          Submit Answer
        </button>
      )}
    </div>
  );
};

const App = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [nextQuestion, setNextQuestion] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    const GeneralQuestionsRandomIndex = Math.floor(Math.random() * GeneralQuestions.length);
    const MusicQuestionsRandomIndex = Math.floor(Math.random() * MusicQuestions.length);
    const FamilyQuestionsRandomIndex = Math.floor(Math.random() * FamilyQuestions.length);

    const questionArray = [
      GeneralQuestions[GeneralQuestionsRandomIndex],
      FamilyQuestions[FamilyQuestionsRandomIndex],
      MusicQuestions[MusicQuestionsRandomIndex],
    ];

    setQuestions(questionArray);
  }, []);

  const onSubmit = (correct) => {
    setNextQuestion(true);
    if (correct) setScore(score + 1);
  };

  const handleNextQuestion = () => {
    if (questionIndex === 2) {
      setFinished(true);
      setShowFeedback(false);
    } else {
      setNextQuestion(false);
      setShowFeedback(false);
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleRestartQuiz = () => {
    const GeneralQuestionsRandomIndex = Math.floor(Math.random() * GeneralQuestions.length);
    const MusicQuestionsRandomIndex = Math.floor(Math.random() * MusicQuestions.length);
    const FamilyQuestionsRandomIndex = Math.floor(Math.random() * FamilyQuestions.length);

    const questionArray = [
      GeneralQuestions[GeneralQuestionsRandomIndex],
      FamilyQuestions[FamilyQuestionsRandomIndex],
      MusicQuestions[MusicQuestionsRandomIndex],
    ];

    setQuestions(questionArray);
    setQuestionIndex(0);
    setNextQuestion(false);
    setScore(0);
    setFinished(false);
  };

  if (!questions) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md space-y-6 text-center">
          <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
          <h2 className="text-3xl font-bold text-gray-900">Quiz Complete!</h2>
          <div className="text-2xl font-semibold text-blue-600">{score}/3</div>
          <p className="text-lg text-gray-600">
            {score === 0 && "Dang, even Levi would've done better"}
            {score === 1 && "Dial in, Greg"}
            {score === 2 && "Just short! Srini Venkatraman would be proud though."}
            {score === 3 && "Good work, Slink"}
          </p>
          <button
            onClick={handleRestartQuiz}
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Greg's Trivia</h1>
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <Question
            questionText={questions[questionIndex].question}
            choiceArray={questions[questionIndex].options}
            index={questionIndex}
            correctChoice={questions[questionIndex].correctAnswer}
            onSubmit={onSubmit}
            setShowFeedback={setShowFeedback}
            showFeedback={showFeedback}
          />
        </div>
        {nextQuestion && (
          <button
            onClick={handleNextQuestion}
            className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
          >
            <span>{questionIndex === 2 ? 'Finish Quiz' : 'Next Question'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
