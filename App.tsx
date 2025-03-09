/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homepage from './src/Homepage';
import PoinsCatalogue from './src/PoinsCatalogue';
import UpgradeCatalogue from './src/UpgradeCatalogue';

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
        <Stack.Screen name="PoinsCatalogue" component={PoinsCatalogue} />
        <Stack.Screen name="UpgradeCatalogue" component={UpgradeCatalogue} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
