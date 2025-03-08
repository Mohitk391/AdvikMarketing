import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ScrollView, ActivityIndicator, Image, Dimensions, TextInput } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Svg, { Rect, Text } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface PageData {
  id: string;
  size: number[];
  packing: number[];
  rate: number[];
  imageUrl: string; // Add imageUrl field to hold the image URL
}

const ImageCatalogue = () => {
  const [pageDataList, setPageDataList] = useState<PageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch image URLs from Firebase Storage and data from Firestore
        const dataList: PageData[] = [];
        const snapshot = await firestore()
          .collection('advikmarketing')
          .doc('poins')
          .collection('models')
          .get();

        for (const [index, doc] of snapshot.docs.entries()) {
          const data = doc.data();
          const pageData: PageData = {
            id: doc.id,
            size: data.size ?? [],
            packing: data.packing ?? [],
            rate: data.rate ?? [],
            imageUrl: await getImageUrl(index), // Fetch image URL using page number
          };

          dataList.push(pageData);
        }

        setPageDataList(dataList);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    const getImageUrl = async (pageIndex: number) => {
      const pageNumber = (pageIndex + 6).toString().padStart(3, '0'); // Starting from 006
      console.log(pageNumber);
      const imageRef = storage().ref(`catalogs/poins/${pageNumber}.jpg`); // Adjust the path as needed
      console.log(await imageRef.getDownloadURL());
      return await imageRef.getDownloadURL();
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const index = pageDataList.findIndex(
      pageData => pageData.id.includes(searchQuery) || String(Number(pageData.id) + 5) === searchQuery
    );

    if (index !== -1 && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: index * 500, animated: true }); // Assuming each item height is 600
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
            <Image
              source={{ uri: pageData.imageUrl }}
              style={styles.image}
            />
            <View style={styles.overlay}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  contentContainer : {
    flexGrow: 1,
  },
  searchBar: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 500,
    position: 'relative',
  },
  pdf: {
    width: width,
    height: 500,
  },
  overlay: {
    position: 'absolute',
    top: 385, // Adjust positioning as needed
    left: 150,
    right: 0,
    alignItems: 'center',
  },
});

export default ImageCatalogue;
