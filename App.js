import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuizScreen from './src/screens/Quiz';
import ResultScreen from './src/screens/ResultScreen';
import HomeScreen from './src/screens/HomeScreen';
import { QuizProvider } from './src/component/Quizcontext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <QuizProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
      </QuizProvider>
    </NavigationContainer>
  );
}
