import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalImage from '../components/ModalImage';
import { getRequest } from '../utils/axiosClient';

const ProfileScreen = () => {

    const { name, email } = useSelector((state) => state.user);
    const favorites = useSelector((state) => state.favorites);
    const [image, setImage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handRandomImage = async () => {
        try {
            setShowModal(true);
            const image = await getRequest(`https://dog.ceo/api/breeds/image/random`);
            setImage(image.data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setImage('');
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ModalImage 
                handleCloseModal={handleCloseModal}
                showModal={showModal}
                image={image}
                textClose='Close'
            />
            <View style={styles.profileContainer}>
                <Icon name='user' size={50} color='gray' />
                <Text style={styles.title}>User Profile</Text>
                <Text style={styles.textProfile}>username: {name}</Text>
                <Text style={styles.textProfile}>email: {email}</Text>
                <Button
                    title='random image'
                    onPress={handRandomImage}
                />
            </View>
            {
                <View style={styles.favoritesList}>
                    <Text style={styles.favoritesTitle}>Favorites:</Text>
                    { favorites.length === 0 && <Text style={styles.textProfile}>There are not favorites yet.</Text>}
                    <FlatList 
                        data={favorites}
                        keyExtractor={ (item) => item.id }
                        renderItem={({item}) => (
                            <View style={styles.card}>
                                <Text>{item.name}</Text>
                                { (!item.isBreed) && <Text style={styles.subtitle}>sub-breed of {item.Breed}</Text>}
                            </View>
                        )}
                    />
                </View>
            }
        </View>
    );
}

export default ProfileScreen;

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    favoritesList: {
        flex: 2,
        width: '100%',
        padding: 10,
    },
    textProfile: {
        padding: 2,
    },
    favoritesTitle: {
        fontSize: 25,
        marginBottom: 15
    },
    card: {
        height: 50,
        borderWidth: 1,
        padding: 5,
        margin: 2,
        borderRadius: 5,
        borderColor: 'tomato'
    },
    subtitle: {
        textAlign: 'right',
    }
});