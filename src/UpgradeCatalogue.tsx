import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Dimensions, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Svg, { Rect, Text } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';

const getImageUrl = async (pageIndex: number): Promise<string> => {
  const pageNumber = (pageIndex + 5).toString().padStart(3, '0');

  // Check if the URL is already cached
  const cachedUrl = await AsyncStorage.getItem(`catalog-upgrade-${pageNumber}`);
  if (cachedUrl) {
    return cachedUrl;
  }

  // Fetch URL from Firebase Storage if not cached
  const imageRef = storage().ref(`catalogs/upgrade/${pageNumber}.jpg`);
  const url = await imageRef.getDownloadURL();

  // Save the URL in AsyncStorage for future use
  await AsyncStorage.setItem(`catalog-upgrade-${pageNumber}`, url);

  return url;
};


const { width } = Dimensions.get('window');

interface PageData {
  id: string;
  size: number[];
  packing: number[];
  rate: number[];
  pageNumber: number;
  imageUrl: string;
  isPvd: boolean; // New property
  pvdRate?: number[];
  isPos: boolean; // New property
  position?: number[]; // New property, optional
}

const UpgradeCatalogue = () => {
  const [pageDataList, setPageDataList] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataList: PageData[] = [];
        const snapshot = await firestore()
          .collection('advikmarketing')
          .doc('upgrade')
          .collection('models')
          .get();

        for (const [, doc] of snapshot.docs.entries()) {
          const data = doc.data();
          const pageData: PageData = {
            isPvd: data.isPvd ?? false, // New property initialization
            pvdRate: data.isPvd ? data.pvdRate ?? [] : undefined,  // Conditional property initialization
            isPos: data.isPos ?? false, // New property initialization
            position: data.isPos ? data.position ?? [] : undefined, // Conditional property initialization
            id: doc.id,
            size: data.size ?? [],
            packing: data.packing ?? [],
            rate: data.rate ?? [],
            pageNumber: data.pageNumber,
            imageUrl: await getImageUrl(data.pageNumber),
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

    // const getImageUrl = async (pageIndex: number) => {
    //   const pageNumber = (pageIndex + 5).toString().padStart(3, '0');
    //   const imageRef = storage().ref(`catalogs/upgrade/${pageNumber}.jpg`);
    //   return await imageRef.getDownloadURL();
    // };

    fetchData();
  }, []);

  const handleSearch = () => {
    const index = pageDataList.findIndex(
      pageData => pageData.id.includes(searchQuery) || String(Number(pageData.pageNumber)) === searchQuery
    );

    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: index * 520, animated: true }); // Assuming each item height is 600
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by model number or page number"
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      <ScrollView contentContainerStyle={styles.contentContainer} ref={scrollViewRef}>
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
            <View style={{...styles.overlay, top : pageData.isPos ? pageData.position?.[0] : styles.overlay.top, left : pageData.isPos ? pageData.position?.[1] : styles.overlay.left}}>
              <Svg height="500" width={width}>
                <Rect x="0" y="0" width={pageData.isPvd ? (width / 2.31) : (width / 3.02)} height="15" fill="transparent" stroke="black" />
                <Text x="10" y="12.5" fill="black">Size</Text>
                <Text x="45" y="12.5" fill="black">Packing</Text>
                <Text x="100" y="12.5" fill="black">Rate</Text>
                { pageData.isPvd ? <Text x="140" y="12.5" fill="black">PVD</Text> : null}
                {pageData.size?.map((size, idx) => {
                  const pvdRateValue = pageData.isPvd ? pageData.pvdRate?.[idx] : null;
                  return (
                    <React.Fragment key={idx}>
                      <Rect x="0" y={(idx + 1) * 15} width="50" height="15" fill="white" stroke="black" />
                      <Text x="13" y={(idx + 1) * 15 + 12.5} fill="black">{size}</Text>
                      <Rect x="40" y={(idx + 1) * 15} width="50" height="15" fill="white" stroke="black" />
                      <Text x="55" y={(idx + 1) * 15 + 12.5} fill="black">{pageData.packing[idx]}</Text>
                      <Rect x="90" y={(idx + 1) * 15} width="40" height="15" fill="white" stroke="black" />
                      <Text x="100" y={(idx + 1) * 15 + 12.5} fill="black">{pageData.rate[idx]}</Text>
                      {pvdRateValue !== null && (
                        <React.Fragment>
                          <Rect x="130" y={(idx + 1) * 15} width="40" height="15" fill="white" stroke="black" />
                          <Text x="140" y={(idx + 1) * 15 + 12.5} fill="black">{pvdRateValue}</Text>
                        </React.Fragment>
                      )}
                    </React.Fragment>
                  );
                })}
              </Svg>
            </View>
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
    top: 385,
    left: 120,
    right: 0,
    alignItems: 'center',
  },
});

export default UpgradeCatalogue;
