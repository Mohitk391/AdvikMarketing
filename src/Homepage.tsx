import React from 'react';
import { View, Text, Button } from 'react-native';


const Homepage: React.FC<{ navigation: any }> = ({ navigation }) => {

  return (
    <View>
      <Text>Welcome to the Catalogue</Text>
      <Button
        title="Go to Poins Catalogue"
        onPress={() => navigation.navigate('PoinsCatalogue')}
      />
      <Button
        title="Go to Upgrade Catalogue"
        onPress={() => navigation.navigate('UpgradeCatalogue')}
      />
    </View>
  );
};

export default Homepage;
