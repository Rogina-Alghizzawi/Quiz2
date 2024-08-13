
import React, { createContext, useState, useContext } from 'react';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <QuizContext.Provider
      value={{
        currentQuestionIndex,
        setCurrentQuestionIndex,
        score,
        setScore,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);
