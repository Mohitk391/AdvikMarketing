 import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Platform,
  View,
} from 'react-native';
import Pdf from 'react-native-pdf';
import TableComponent from './TableComponent';

const tableData = [
  { quantity: '10', packing: 'Box', rate: '$5' }, // Data for page 1
  { quantity: '20', packing: 'Bag', rate: '$3' }, // Data for page 2
  // Add more data for additional pages as needed
];// State to track current page



const source = {
    uri: 'https://firebasestorage.googleapis.com/v0/b/advik-marketing.firebasestorage.app/o/catalogs%2FUpgrade%202024%20Brochure.pdf?alt=media&token=4d66e7eb-04bf-4f83-a63e-50ef17ebc953',
    cache: true,
  };


function ViewPdf () {
const [currentPage, setCurrentPage] = React.useState(0);
    return (
        <View style={styles.container}>
      <View style={styles.pdfContainer}>
      <TableComponent data={tableData[currentPage]} /> {/* Pass the current page's data */}


        <Pdf

          source={source}
          trustAllCerts={Platform.OS === 'ios'}
          onLoadComplete={(numberOfPages: any, _filePath: any) => {
            setCurrentPage(0); // Initialize current page
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page: any, _numberOfPages: any) => {
            setCurrentPage(page - 1); // Update current page
            console.log(`current page: ${page}`);
          }}




        onError={(error: any) => {
          console.log(error);
        }}
        onPressLink={(uri: any) => {
          console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdfImage}

      />
    </View>
    </View>
    );
}

const styles = StyleSheet.create({
  imageContainer: {
    position: 'relative',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },

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
    pdfContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pdfImage: {

      flex: 1,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

  export { ViewPdf };

  /*
const source = {
    uri: 'https://firebasestorage.googleapis.com/v0/b/advik-marketing.firebasestorage.app/o/catalogs%2FUpgrade%202024%20Brochure.pdf?alt=media&token=4d66e7eb-04bf-4f83-a63e-50ef17ebc953',
    cache: true,
  };


const [currentPage, setCurrentPage] = React.useState(0);
<TableComponent data={tableData[currentPage]} />
<Pdf

        source={source}
        trustAllCerts={Platform.OS === 'ios'}
        onLoadComplete={(numberOfPages: any, _filePath: any) => {
          setCurrentPage(0); // Initialize current page
          console.log(`number of pages: ${numberOfPages}`);
        }}




        onPageChanged={(page: any, _numberOfPages: any) => {
          setCurrentPage(page - 1); // Update current page
          console.log(`current page: ${page}`);
        }}




        onError={(error: any) => {
          console.log(error);
        }}
        onPressLink={(uri: any) => {
          console.log(`Link presse: ${uri}`);
        }}
        style={styles.pdfImage}

      />
  */
/*

<View style={styles.container}>
        <Image
          source={{ uri: 'https://picsum.photos/200/300' }}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Svg height="500" width="150">
          <Rect x="0" y="0" width="100%" height="30" fill="transparent" />
          <Text x="10" y="20" fill="black">Header 1</Text>
          <Rect x="50" y="0" width="100%" height="30" fill="transparent" />
          <Text x="60" y="20" fill="black">Header 2</Text>
          <Rect x="100" y="0" width="100%" height="30" fill="transparent" />
          <Text x="110" y="20" fill="black">Header 3</Text>
          <Rect x="0" y="20" width="100%" height="30" fill="transparent" />
          <Text x="10" y="40" fill="black">Header 1</Text>
          <Rect x="50" y="20" width="100%" height="30" fill="transparent" />
          <Text x="60" y="40" fill="black">Header 2</Text>
          <Rect x="100" y="20" width="100%" height="30" fill="transparent" />
          <Text x="110" y="40" fill="black">Header 3</Text>
            {/* Add more rows and columns as needed }
          </Svg>
        </View>
      </View>


      container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 500,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 500, // Adjust positioning as needed
    left: 50,
    right: 0,
  },



  <ScrollView contentContainerStyle={styles.contentContainer} ref={scrollViewRef}>
  {pageDataList.map((pageData, index) => (
    <View key={index} style={styles.imageContainer}>
      <Image
        source={{ uri: pageData.imageUrl }}
        style={styles.image}
      />
      <View
        style={{
          ...styles.overlay,
          top: pageData.isPositionedChanged ? pageData.top : styles.overlay.top,
          left: pageData.isPositionedChanged ? pageData.left : styles.overlay.left,
        }}
      >
        <Svg height="500" width={width}>
          <Rect x="0" y="0" width={width / 2.31} height="15" fill="transparent" stroke="black" />
          <Text x="10" y="12.5" fill="black">Size</Text>
          <Text x="55" y="12.5" fill="black">Packing</Text>
          <Text x="130" y="12.5" fill="black">Rate</Text>
          {pageData.size?.map((size, idx) => (
            <React.Fragment key={idx}>
              <Rect x="0" y={(idx + 1) * 15} width="50" height="15" fill="white" stroke="black" />
              <Text x="13" y={(idx + 1) * 15 + 12.5} fill="black">{size}</Text>
              <Rect x="50" y={(idx + 1) * 15} width="60" height="15" fill="white" stroke="black" />
              <Text x="70" y={(idx + 1) * 15 + 12.5} fill="black">{pageData.packing[idx]}</Text>
              <Rect x="110" y={(idx + 1) * 15} width="60" height="15" fill="white" stroke="black" />
              <Text x="130" y={(idx + 1) * 15 + 12.5} fill="black">{pageData.rate[idx]}</Text>
            </React.Fragment>
          ))}
        </Svg>
      </View>
    </View>
  ))}
</ScrollView>

      */
