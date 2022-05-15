import React, { useEffect, useState } from 'react';
import {SafeAreaView, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import ListItem from '../components/ListItem';
import { getRequest } from '../utils/axiosClient';

const HomeScreen = ({ navigation }) => {

  const mapDogs = (dogsraw) => {
    return Object.entries(dogsraw)
      .map(item => ({name: item[0], isFavorite: false, data: item[1].map(elem => ({subBreedName: elem, isFavorite: false}))}));
  }

  const [dummyBreeds, setDummyBreeds] = useState([]);

  const handleFavorite = (item) => {
    setDummyBreeds(bValue => {
     return bValue.map(elem =>{
        if( elem.name === item.name){
          return item
        } else {
          return elem;
        }
      })
    })
  }

  const getBreeds = async () => {
    try {
      const breeds = await getRequest('https://dog.ceo/api/breeds/list/all');
      setDummyBreeds(mapDogs(breeds.data.message));
    } catch (error) {
      console.log(error);
    }
  }

  const goToDetails = (item) => {
    navigation.navigate('Details', { item });
  }

  useEffect(() => {
    getBreeds();
  }, [])

  return (
    <SafeAreaView  style={styles.container}
    >
    {
      dummyBreeds.length > 0 ?
      <FlatList
        data={dummyBreeds}
        renderItem={({item}) => <ListItem item={item} handleFavorite={handleFavorite} goToDetails={goToDetails}/> }
        keyExtractor={(item) => item.name}
      /> :
      <ActivityIndicator size="large" color="tomato" />
    }  
    </SafeAreaView >
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 10,
    justifyContent: 'center'
  }
});