import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { useDispatch } from 'react-redux';
import { addFavorite, deleteFavorite } from "../redux/slices/favoritesSlice";

const ListItem = ({item, handleFavorite, goToDetails}) => {

    const dispatch = useDispatch();

    const handleFavoriteBreed = ( item ) => {
        handleFavorite({...item, isFavorite: !item.isFavorite});

        const favoriteRedux = {
            id: item.name,
            name: item.name,
            isFavorite: !item.isFavorite,
            isBreed: true,
            Breed: item.name,
        }

        if(favoriteRedux.isFavorite){
            dispatch(addFavorite(favoriteRedux));
        } else {
            dispatch(deleteFavorite(favoriteRedux));
        }
    }

    const handleFavoriteSubBreed = (item, subItem) => {
        const newSubItem = { ...subItem, isFavorite: !subItem.isFavorite }
        const data = item.data.map(elem => {
            if (elem.subBreedName === newSubItem.subBreedName) {
                return newSubItem;
            } else {
                return elem;
            }
        })
        
        const newItem = {...item, data};
        handleFavorite(newItem);

        const favoriteRedux = {
            id: subItem.subBreedName + item.name,
            name: subItem.subBreedName,
            isFavorite: !subItem.isFavorite,
            isBreed: false,
            Breed: item.name,
        }

        if(favoriteRedux.isFavorite){
            dispatch(addFavorite(favoriteRedux));
        } else {
            dispatch(deleteFavorite(favoriteRedux));
        }

    }

    return (
        <TouchableOpacity delayPressIn={300} delayPressOut={5} delayLongPress={5} onPress={()=>goToDetails(item)}>
            <View style={styles.itemView}>
                <View style={styles.breadView}>
                    <Text style={styles.breed}>{item.name}</Text>
                    <TouchableOpacity style={styles.favoriteButton} 
                        onPress={()=>handleFavoriteBreed(item)}
                    >
                        <Icon name='star' size={20} color={item.isFavorite ? 'yellow' : 'gray'} />
                    </TouchableOpacity>
                </View>
                {
                    item.data.map((elem, index) => {
                        return(
                            <View key={index} style={styles.subBreedWrapper}>
                                <View >
                                    <Text style={styles.subBreed}>{elem.subBreedName}</Text>
                                    <Text style={styles.subBreedSubtitle}>sub-breed of {item.name}</Text>
                                </View>
                                <TouchableOpacity 
                                    style={styles.favoriteButton} 
                                    onPress={()=>handleFavoriteSubBreed(item, elem)}
                                >
                                    <Icon name='star' size={20} color={elem.isFavorite ? 'yellow' : 'gray'} />
                                </TouchableOpacity>
                            </View>
                        )
                    })
                    
                }
            </View>
        </TouchableOpacity>
    );
}

export default ListItem;

const styles = StyleSheet.create({
    itemView: {
        margin: 2,
        borderRadius: 5
    },
    breadView:{
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        borderColor: '#555',
        backgroundColor: 'tomato',
    },
    breed: {
        fontSize:25,
        color: '#FFF',
    },
    subBreedWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#55555520',
        borderBottomWidth: 1,
    },
    subBreed: {
        fontSize:25,
        fontStyle:'italic',
        color: '#FFF',
        color: '#555555',
        marginLeft: 20
    },
    favoriteButton: {
        height: 20,
    },
    subBreedSubtitle: {
        marginLeft: 20
    }
});