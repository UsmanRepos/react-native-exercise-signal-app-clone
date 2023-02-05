import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeHeader from '../components/HomeHeader'
import ChatRoomHeader from '../components/ChatRoomHeader'
import { Home, ChatRoom, Login, Register, AddChat } from '../screens'


import { SIZES, COLORS } from '../constants'
import { auth } from '../Firebase/firebase';

const homeStack = createNativeStackNavigator();
const authStack = createNativeStackNavigator();


const AuthStack_Screen = () => {

    const globalOptions = {
        headerStyle: { backgroundColor: COLORS.primary },
        headerTitleStyle: { color: COLORS.white },
        headerTintColor: COLORS.white,
    }

    return (
        <authStack.Navigator initialRouteName="Home" screenOptions={globalOptions}>
            <authStack.Screen name="Login" component={Login} />
            <authStack.Screen name="Register" component={Register} />
            <authStack.Screen
                name="Home"
                component={Home}
                // options={() => ({
                //     header: () => <HomeHeader />
                // })}
            />
            <authStack.Screen name = "AddChat" component={AddChat}/>
            <authStack.Screen name = "ChatRoom" component={ChatRoom}/>
        </authStack.Navigator>
    )

}
const HomeStack_Screen = () => (
    <homeStack.Navigator>
        <homeStack.Screen
            name="home"
            component={Home}
            options={() => ({
                header: () => <HomeHeader />
            })}
        />
        <homeStack.Screen
            name="chatRoom"
            component={ChatRoom}
            options={({ navigation, route }) => ({
                header: () => <ChatRoomHeader navigation={navigation} />
            })}
        />
    </homeStack.Navigator>
)

const Index = () => {
    return (
        <NavigationContainer>
            <AuthStack_Screen />
        </NavigationContainer>

    )
}

export default Index
