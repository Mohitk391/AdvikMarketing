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
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
        name="Home"
        component={Homepage}
        options={{ title: 'Advik Marketing' }}
        />
        <Stack.Screen name="PoinsCatalogue" component={PoinsCatalogue} options={{ title: 'Poins' }} />
        <Stack.Screen name="UpgradeCatalogue" component={UpgradeCatalogue} options={{ title: 'Upgrade' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
