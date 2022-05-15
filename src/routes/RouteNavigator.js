import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import ProfileScreen from '../screens/Profile';
import DetailScreen from '../screens/Detail';
import Icon from 'react-native-vector-icons/FontAwesome';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{
                headerShown: false
                }} 
            />
        </Stack.Navigator>
    );
}

const HomeStack = () => {
    return (

        <Tab.Navigator
            screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Breeds') {
                    iconName = focused ? 'paw' : 'paw';
                } else if (route.name === 'Profile') {
                    iconName = focused ? 'user' : 'user';
                }
                return <Icon name={iconName} size={30} color={color} />;
            },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarInactiveBackgroundColor: '#55555520'
            })}      
        >

            <Tab.Screen 
                name="Breeds" 
                component={HomeScreen} 
                options={{
                    headerTintColor: 'tomato', 
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen}
                options={{
                    headerTintColor: 'tomato', 
                }}
            />
        </Tab.Navigator>
    );
}

const RouteNavigator = () => {
    const { email } = useSelector((state) => state.user);

    return (
        <NavigationContainer>
            {
                email ?
                <Stack.Navigator>
                    <Stack.Screen
                    name="Home"
                    component={HomeStack}
                    options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="Details" 
                        component={DetailScreen} 
                        options={{
                            headerTintColor: 'tomato', 
                        }}
                    />
                </Stack.Navigator> :
                <AuthStack />
            }
        </NavigationContainer>
    );
}

export default RouteNavigator;