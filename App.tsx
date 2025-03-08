/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Homepage } from './src/Homepage';
import { ViewPdf } from './src/ViewPdf';

const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={Homepage}
        options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="ViewPdf" component={ViewPdf} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
