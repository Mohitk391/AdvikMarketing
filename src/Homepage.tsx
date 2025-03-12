import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, ActivityIndicator } from 'react-native';
import storage from '@react-native-firebase/storage';


const Homepage: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [imageUri1, setImageUri1] = useState('');
  const [imageUri2, setImageUri2] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImageUris = async () => {
      try {
        const uri1 = await storage().ref('catalogs/Poins Logo.png').getDownloadURL();
        const uri2 = await storage().ref('catalogs/Upgrade Logo.png').getDownloadURL();
        setImageUri1(uri1);
        setImageUri2(uri2);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching image URIs: ', error);
        setLoading(false);
      }
    };
    fetchImageUris();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

    {imageUri1 ? (
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PoinsCatalogue')}>
        <ImageBackground source={{ uri: imageUri1 }} style={styles.image}>
          <Text style={styles.buttonText}>Go to Poins Catalogue</Text>
        </ImageBackground>
      </TouchableOpacity>
    ) : (
      <Text style={styles.errorText}>Failed to load Poins Catalogue image</Text>
    )}

    {imageUri2 ? (
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpgradeCatalogue')}>
        <ImageBackground source={{ uri: imageUri2 }} style={styles.image}>
          <Text style={styles.buttonText}>Go to Upgrade Catalogue</Text>
        </ImageBackground>
      </TouchableOpacity>
    ) : (
      <Text style={styles.errorText}>Failed to load Upgrade Catalogue image</Text>
    )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 300,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fading effect
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default Homepage;
