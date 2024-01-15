import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
import PhotoAlbum from "../screens/PhotoAlbum";

export type stackScreens = {
    Home: undefined
    PhotoAlbum: {albumId: number, albumTitle: string}
}

const Stack = createNativeStackNavigator<stackScreens>();

const AppContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
                <Stack.Screen name="PhotoAlbum" component={PhotoAlbum} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppContainer;