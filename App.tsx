/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  View,
  Text,
} from 'react-native';
import Pdf from 'react-native-pdf';

const source = {
  uri: 'https://firebasestorage.googleapis.com/v0/b/advik-marketing.firebasestorage.app/o/catalogs%2FUpgrade%202024%20Brochure.pdf?alt=media&token=4d66e7eb-04bf-4f83-a63e-50ef17ebc953',
  cache: true,
};

function App(): React.JSX.Element {

  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
      <Pdf
        source={source}
        trustAllCerts={Platform.OS === 'ios'}
        onLoadComplete={(numberOfPages: any, _filePath: any) => {
          console.log(`number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page: any, _numberOfPages: any) => {
          console.log(`current page: ${page}`);
        }}
        onError={(error: any) => {
          console.log(error);
        }}
        onPressLink={(uri: any) => {
          console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default App;
