import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import ImageCatalogue from './ImageCatalgue';
// import Pdf from 'react-native-pdf';
// import TableComponent from './TableComponent';

//const data = { quantity: '10', packing: 'Box', rate: '$5' }; // Data for page 1
  // Data for page 2
  //Add more data for additional pages as neede// State to track current page






function Homepage () {
    return (
      <SafeAreaView style={styles.container}>
      <ImageCatalogue />
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  });

  export { Homepage };
