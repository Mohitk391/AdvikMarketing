import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage';
import Svg, { Rect, Text } from 'react-native-svg';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
// import ImageResizer from 'react-native-image-resizer';
// import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

// const getImageUrl = async (pageIndex: number): Promise<string> => {
//   const pageNumber = (pageIndex + 5).toString().padStart(3, '0');

//   // Check if the URL is already cached
//   const cachedUrl = await AsyncStorage.getItem(`catalog-upgrade-${pageNumber}`);
//   if (cachedUrl) {
//     return cachedUrl;
//   }

//   // Fetch URL from Firebase Storage if not cached
//   const imageRef = storage().ref(`catalogs/upgrade/${pageNumber}.jpg`);
//   const url = await imageRef.getDownloadURL();

//   const resizedImage = await ImageResizer.createResizedImage(url, 800, 600, 'WEBP', 95);

//   const resizedImageUrl = resizedImage.uri;
//   console.log(resizedImageUrl);
//   // Save the URL in AsyncStorage for future use
//   await AsyncStorage.setItem(`catalog-upgrade-${pageNumber}`, resizedImageUrl);

//   return resizedImageUrl;
// };


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


interface ModelData {
  id: string;
  size: number[];
  packing: number[];
  rate: number[];
  isPvd: boolean;
  pvdRate?: number[];
  isPos: boolean;
  position?: number[];
}

interface PageData {
  pageNumber: number;
  imageUrl: string;
  models: ModelData[];
}

const UpgradeCatalogue = () => {
  const [pageDataList, setPageDataList] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  // const zoomableViewRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataList: PageData[] = [];
        const snapshot = await firestore()
          .collection('advikmarketing')
          .doc('upgrade')
          .collection('pages')
          .get();

        for (const [, doc] of snapshot.docs.entries()) {
          const data = doc.data();
          const pageData: PageData = {
            pageNumber: data.pageNumber,
            imageUrl: data.imageUrl,
            models: data.models || [],
          };

          dataList.push(pageData);
        }

        setPageDataList(dataList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    let index = -1;

    // First search for a match by pageNumber
    index = pageDataList.findIndex(
      pageData =>
        pageData.pageNumber.toString() === searchQuery // Search by pageNumber
    );

    // If no match is found by pageNumber, search by model ID within each page
    if (index === -1) {
      index = pageDataList.findIndex(pageData =>
        pageData.models.some(model => model.id.includes(searchQuery)) // Search by model ID
      );
    }

    // Scroll to the matched page or show an alert if not found
    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: index * 520, animated: true }); // Adjusted for item height
    } else {
      console.warn('No matching data found for the query.');
    }
  };


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // const resetZoom = () => {
  //   if (zoomableViewRef.current) {
  //     zoomableViewRef.current.zoomTo(1); // Reset zoom level to 1
  //   }
  // };

  // const handleZoomAfter = (event, gestureState, zoomableViewEventObject) => {
  //   if (zoomableViewEventObject && zoomableViewEventObject.zoomLevel !== 1) {
  //    resetZoom();
  //   }
  // };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by model number or page number"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <ScrollView contentContainerStyle={styles.contentContainer} ref={scrollViewRef} >
        {pageDataList.map((pageData, index) => (
        <View key={index} style={styles.imageContainer}>
              <FastImage
                style={styles.image}
                source={{
                  uri: pageData.imageUrl,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
                {
                  pageData.models.map((model, id) => (
                <View style={{...styles.overlay, top : model.isPos ? model.position?.[0] : styles.overlay.top, left : model.isPos ? model.position?.[1] : styles.overlay.left}} key={id}>
                  <Svg height={screenHeight * 0.4} width={screenWidth * 0.9}>
                      <Rect
                        x="0"
                        y="0"
                        width={model.isPvd ? screenWidth / 2.5 : screenWidth / 3.33}
                        height={screenHeight * 0.02} // Relative height
                        fill="transparent"
                        stroke="gray"
                      />
                      <Text x="10" y={screenHeight * 0.015} fill="gray" fontSize={10}>
                        Size
                      </Text>
                      <Text x="45" y={screenHeight * 0.015} fill="gray" fontSize={10}>
                        Pkg
                      </Text>
                      <Text x="77" y={screenHeight * 0.015} fill="gray" fontSize={10}>
                        Rate
                      </Text>
                      {model.isPvd && (
                        <Text x="112" y={screenHeight * 0.015} fill="gray" fontSize={10}>
                          PVD
                        </Text>
                      )}
                      {model.size?.map((size, idex) => {
                        const pvdRateValue = model.isPvd ? model.pvdRate?.[idex] : null;
                        return (
                          <React.Fragment key={idex}>
                            <Rect
                              x="0"
                              y={(idex + 1) * (screenHeight * 0.02)}
                              width={screenWidth * 0.1}
                              height={screenHeight * 0.02}
                              fill="white"
                              stroke="gray"
                            />
                            <Text
                              x="8"
                              y={(idex + 1) * (screenHeight * 0.02) + screenHeight * 0.015}
                              fill="gray"
                              fontSize={10}
                            >
                              {size}
                            </Text>
                            <Rect
                              x={screenWidth * 0.1}
                              y={(idex + 1) * (screenHeight * 0.02)}
                              width={screenWidth * 0.1}
                              height={screenHeight * 0.02}
                              fill="white"
                              stroke="gray"
                            />
                            <Text
                              x={screenWidth * 0.1 + 10}
                              y={(idex + 1) * (screenHeight * 0.02) + screenHeight * 0.015}
                              fill="gray"
                              fontSize={10}
                            >
                              {model.packing[idex]}
                            </Text>
                            <Rect
                              x={screenWidth * 0.2}
                              y={(idex + 1) * (screenHeight * 0.02)}
                              width={screenWidth * 0.1}
                              height={screenHeight * 0.02}
                              fill="white"
                              stroke="gray"
                            />
                            <Text
                              x={screenWidth * 0.2 + 7}
                              y={(idex + 1) * (screenHeight * 0.02) + screenHeight * 0.015}
                              fill="gray"
                              fontSize={10}
                            >
                              {model.rate[idex]}
                            </Text>
                            {pvdRateValue !== null && (
                              <React.Fragment>
                                <Rect
                                  x={screenWidth * 0.3}
                                  y={(idex + 1) * (screenHeight * 0.02)}
                                  width={screenWidth * 0.1}
                                  height={screenHeight * 0.02}
                                  fill="white"
                                  stroke="gray"
                                />
                                <Text
                                  x={screenWidth * 0.3 + 7}
                                  y={(idex + 1) * (screenHeight * 0.02) + screenHeight * 0.015}
                                  fill="gray"
                                  fontSize={10}
                                >
                                  {pvdRateValue}
                                </Text>
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </Svg>
                  </View>
                ))}
            </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  contentContainer: {
    flexGrow: 1,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 500,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: 355,
    left: 120,
    right: 0,
    alignItems: 'center',
  },
});

export default UpgradeCatalogue;

/*
<ScrollView scrollEnabled={false}>
            <ReactNativeZoomableView
                key={index}
                ref={zoomableViewRef}
                panEnabled={false}
                style={styles.imageContainer}
                maxZoom={2}
                minZoom={1}
                zoomStep={0.5}
                initialZoom={1}
                onZoomAfter={handleZoomAfter}
                bindToBorders={true}
                contentHeight={500}
                contentWidth={120}
              >

              <FastImage
                style={styles.image}
                source={{
                  uri: pageData.imageUrl,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.contain}
              />
                {
                  pageData.models.map((model, id) => (
                <View style={{...styles.overlay, top : model.isPos ? model.position?.[0] : styles.overlay.top, left : model.isPos ? model.position?.[1] : styles.overlay.left}} key={id}>
                  <Svg height={screenHeight * 0.4} width={screenWidth * 0.9}>
                      <Rect
                        x="0"
                        y="0"
                        width={model.isPvd ? screenWidth / 2.5 : screenWidth / 3.33}
                        height={screenHeight * 0.02} // Relative height
                        fill="transparent"
                        stroke="gray"
                      />
                      <Text x="10" y={screenHeight * 0.015} fill="gray" fontSize={10}>
                        Size
                      </Text>
                      <Text x="45" y={screenHeight * 0.015} fill="gray" fontSize={10}>
                        Pkg
                      </Text>
                      <Text x="77" y={screenHeight * 0.015} fill="gray" fontSize={10}>
                        Rate
                      </Text>
                      {model.isPvd && (
                        <Text x="112" y={screenHeight * 0.015} fill="gray" fontSize={10}>
                          PVD
                        </Text>
                      )}
                      {model.size?.map((size, idex) => {
                        const pvdRateValue = model.isPvd ? model.pvdRate?.[idex] : null;
                        return (
                          <React.Fragment key={idex}>
                            <Rect
                              x="0"
                              y={(idex + 1) * (screenHeight * 0.02)}
                              width={screenWidth * 0.1}
                              height={screenHeight * 0.02}
                              fill="white"
                              stroke="gray"
                            />
                            <Text
                              x="8"
                              y={(idex + 1) * (screenHeight * 0.02) + screenHeight * 0.015}
                              fill="gray"
                              fontSize={10}
                            >
                              {size}
                            </Text>
                            <Rect
                              x={screenWidth * 0.1}
                              y={(idex + 1) * (screenHeight * 0.02)}
                              width={screenWidth * 0.1}
                              height={screenHeight * 0.02}
                              fill="white"
                              stroke="gray"
                            />
                            <Text
                              x={screenWidth * 0.1 + 10}
                              y={(idex + 1) * (screenHeight * 0.02) + screenHeight * 0.015}
                              fill="gray"
                              fontSize={10}
                            >
                              {model.packing[idex]}
                            </Text>
                            <Rect
                              x={screenWidth * 0.2}
                              y={(idex + 1) * (screenHeight * 0.02)}
                              width={screenWidth * 0.1}
                              height={screenHeight * 0.02}
                              fill="white"
                              stroke="gray"
                            />
                            <Text
                              x={screenWidth * 0.2 + 7}
                              y={(idex + 1) * (screenHeight * 0.02) + screenHeight * 0.015}
                              fill="gray"
                              fontSize={10}
                            >
                              {model.rate[idex]}
                            </Text>
                            {pvdRateValue !== null && (
                              <React.Fragment>
                                <Rect
                                  x={screenWidth * 0.3}
                                  y={(idex + 1) * (screenHeight * 0.02)}
                                  width={screenWidth * 0.1}
                                  height={screenHeight * 0.02}
                                  fill="white"
                                  stroke="gray"
                                />
                                <Text
                                  x={screenWidth * 0.3 + 7}
                                  y={(idex + 1) * (screenHeight * 0.02) + screenHeight * 0.015}
                                  fill="gray"
                                  fontSize={10}
                                >
                                  {pvdRateValue}
                                </Text>
                              </React.Fragment>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </Svg>
                  </View>
                ))}
            </ReactNativeZoomableView>
            </ScrollView>

*/
