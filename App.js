import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainContainer from './app/MainContainer';
import SwipePages from './app/SwipePages';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Swipe" component={SwipePages} />
        <Stack.Screen name="Main" component={MainContainer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
