import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { getRequest } from '../utils/axiosClient';

const DetailScreen = ({ route }) => {

    const { item } = route.params || {};
    const { data , name } = item;

    const [breedImage, setBreedImage] = useState('');
    const [subBreeds, setSubBreeds] = useState([]);

    const getBreedImage = async () => {
        try {
            const image = await getRequest(`https://dog.ceo/api/breed/${name}/images/random`);
            setBreedImage(image.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const getSubBreedImages = async () => {
        if(data.length){
            try {
                const subBreedData = [];
                for (const subBreed of data) {
                    const image = await getRequest(`https://dog.ceo/api/breed/${name}/${subBreed.subBreedName}/images/random`);
                    subBreedData.push({...subBreed, image: image.data.message})
                }
                setSubBreeds(subBreedData);                
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        getBreedImage();
        getSubBreedImages();
    }, [])
    

    return (
        <View style={styles.body}>
            <View style={styles.breadContainer}>
                { breedImage.length > 0 ?
                    <Image 
                        style={styles.breedImage} 
                        source={{uri: breedImage}}
                        resizeMode='cover' 
                    /> :
                    <ActivityIndicator size="large" color="tomato" />
                }
                <Text style={styles.breedName}>{ name }</Text>
            </View>
            <View style={styles.subBreadContainer}>
                { data.length > 0 && <Text style={styles.subBreadTitle}>Sub Breeds</Text>}
                <FlatList
                    data={subBreeds}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <Image style={styles.subBreedImage} source={{uri: item.image}} />
                            <Text>{item.subBreedName}</Text>
                        </View>
                    ) }
                    keyExtractor={(item, index) => index}
                />
            </View>
        </View>
    );
}

export default DetailScreen;

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    breadContainer : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    breedImage: {
        width: 150,
        height: 150,
        borderRadius: 10
    },
    breedName: {
        fontSize: 25,
        paddingTop: 20
    },
    subBreadContainer : {
        flex: 1,
        padding: 10,
    },
    subBreedImage: {
        width: 80,
        height: 80,
        borderRadius: 5,
        borderColor: '#555'
    },
    itemContainer: {
        borderWidth: 1, 
        margin: 2,
        padding: 5,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 5,
        borderColor: 'tomato'
    },
    subBreadTitle: {
        marginBottom: 15
    },
})