// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

// const questions = [
//   {
//     question: "What is the capital of France?",
//     options: ["London", "Berlin", "Paris", "Madrid"],
//     correctAnswer: "Paris",
//   },
//   {
//     question: "What is 2 + 2?",
//     options: ["3", "4", "5", "6"],
//     correctAnswer: "4",
//   },
//   {
//     question: "What is the largest ocean on Earth?",
//     options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
//     correctAnswer: "Pacific Ocean",
//   },
//   {
//     question: "What is the tallest mountain on Earth?",
//     options: ["Mount Everest", "Mount Kilimanjaro", "Mount Fuji", "Mount Denali"],
//     correctAnswer: "Mount Everest",
//   },
//   {
//     question: "What is the chemical symbol for water?",
//     options: ["H2O", "CO2", "O2", "N2"],
//     correctAnswer: "H2O",
//   },
// ];

// const QuizScreen = ({ navigation }) => {
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [timer, setTimer] = useState(0);
//   const [intervalId, setIntervalId] = useState(null);

//   const totalTime = questions.length * 60;

//   useEffect(() => {
//     const id = setInterval(() => {

//       setTimer(t => {
//         if (t >= totalTime) {
//           navigation.navigate('Result', { score, timer, totalQuestions: questions.length });
//           return t;
//         }
//         return t + 1;
//       });
//     }, 1000);
//     setIntervalId(id);

//     return () => clearInterval(id); 
//     // clean up function
//   }, []);

//   const handleAnswer = (selectedAnswer) => {
//     const correctAnswer = questions[currentQuestionIndex].correctAnswer;
//     if (selectedAnswer === correctAnswer) {
//       setScore(prevScore => prevScore + 1);
//     }

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(prevIndex => prevIndex + 1);
//     } else {
//       // clearInterval(intervalId);  remove this line because it is already declared in the useeffect and it will excuted in the unmount
//       navigation.navigate('Result', { score, timer, totalQuestions: questions.length });
//     }
//   };

//   const currentQuestion = questions[currentQuestionIndex];

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = time % 60;
//     return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.question}>{currentQuestion.question}</Text>
//       <ScrollView style={styles.optionsContainer}>
//         {currentQuestion.options.map((option, index) => (
//           <Button
//             key={index}
//             title={option}
//             onPress={() => handleAnswer(option)}
//           />
//           // !radio
//         ))}
//       </ScrollView>
//       <Text style={styles.timer}>Time remaining: {formatTime(totalTime - timer)}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   question: {
//     fontSize: 18,
//     marginBottom: 20,
//   },
//   optionsContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   timer: {
//     marginTop: 20,
//     fontSize: 16,
//   },
// });

// export default QuizScreen;











import React, { useEffect, useState } from 'react';
import { View, Text, Button,StyleSheet, ScrollView } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { useQuiz } from '../component/Quizcontext'; 

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Pacific Ocean", "Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
    correctAnswer: "Pacific Ocean",
  },
  {
    question: "What is the tallest mountain on Earth?",
    options: ["Mount Everest", "Mount Kilimanjaro", "Mount Fuji", "Mount Denali"],
    correctAnswer: "Mount Everest",
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "N2"],
    correctAnswer: "H2O",
  },
];

const QuizScreen = ({ navigation }) => {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
    setScore,
    selectedOption,
    setSelectedOption,
  } = useQuiz();
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const totalTime = questions.length * 60;

  useEffect(() => {
    const id = setInterval(() => {
      setTimer(t => {
        if (t >= totalTime) {
          clearInterval(id);
          navigation.navigate('Result', { score, timer, totalQuestions: questions.length });
          return t;
        }
        return t + 1;
      });
    }, 1000);
    setIntervalId(id);

    return () => clearInterval(id);
  }, []);

  const handleAnswer = () => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if (selectedOption === correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
    } else {
      clearInterval(intervalId);
      navigation.navigate('Result', { score, timer, totalQuestions: questions.length });
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{currentQuestion.question}</Text>
      <ScrollView style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <View key={index} style={styles.optionContainer}>
            <RadioButton
              value={option}
              status={selectedOption === option ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption(option)}
            />
            <Text>{option}</Text>
          </View>
        ))}
      </ScrollView>
      <Button mode="contained" title='submit' onPress={handleAnswer}/>
      <Text style={styles.timer}>Time remaining: {formatTime(totalTime - timer)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  question: {
    fontSize: 18,
    marginBottom: 20,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timer: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default QuizScreen;
