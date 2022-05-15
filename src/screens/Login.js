
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    StyleSheet, 
    Text,
    TextInput,
    View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../components/CustomButton';
import { setName, setEmail } from "../redux/slices/userSlice";
import { validateEmail } from '../utils/validateEmail';

export default function LoginScreen({ navigation }) {

    const dispatch = useDispatch();
    
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const { email } = useSelector((state) => state.user);

    const handleOnPressLogin = async () => {
        if(userName.length === 0){
            Alert.alert('Warning!', 'You must introduce your username to continue.')
        } 
        else if(!validateEmail(userEmail)){
            Alert.alert('Warning!', 'You must introduce a valid email to continue.')
        } else {
            try {
                dispatch(setName(userName));
                dispatch(setEmail(userEmail));
            } catch (error) {
                console.log(error)
            }
        }
    }

    const getAsyncData = async () => {
        try {
          if(email){
            navigation.navigate('Home');
          }
        } catch (error) {
          console.log(error);
        }
    }
      
    useEffect(() => {
        getAsyncData();
    }, [])

    return (
        <View style={styles.body}>
            <Image 
                source={require('../assets/logo.png')}
                style={styles.logoImage}
                resizeMode='contain'
            />
            <Text style={styles.text}>Breeds App</Text>
            <TextInput 
                style={styles.input}
                placeholder='Please text your username.'
                onChangeText={setUserName}
            />
            <TextInput 
                style={styles.input}
                placeholder='Please text your email.'
                onChangeText={setUserEmail}
            />
            <CustomButton 
                title={'Login'}
                handleOnPress={handleOnPressLogin}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'tomato',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logoImage: {
        height: 150,
        width: 150,
        margin: 20,
    },
    text: {
        color: '#FFFFFF',
        fontSize: 30,
        marginBottom: 100,
    },
    input: {
        width: 300,
        height: 40,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        textAlign: 'center',
        borderRadius: 8,
        borderColor: '#555555',
        borderWidth: 1,
        fontSize: 18,
    }
})

