import React, { useLayoutEffect, useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from 'react-native'
import { Avatar } from 'react-native-elements'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import ChatRoomItem from '../components/ChatRoomItem'

import { SIZES, COLORS } from '../constants'
import { auth, db } from '../Firebase/firebase';

const Home = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const imageUrl = auth.getAuth().currentUser?.photoURL;
    const SignOut = () => {
        auth
            .signOut(auth.getAuth())
            .then(() => {
                navigation.replace("Login")
            });
    }
    useEffect(() => {
        const unsubscribe = db.onSnapshot(db.collection(db.getFirestore(), "chats"), (snapshot) => setChats(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
        }))))
        return unsubscribe;
    }, [])
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: COLORS.white },
            headerTitleStyle: { color: COLORS.black },
            headerTintColor: COLORS.black,
            headerLeft: () => (
                <View
                    style={{
                        marginLeft: SIZES.margin * 1.5,
                    }}
                >
                    <TouchableOpacity activeOpacity={.5} onPress={SignOut}>
                        <Avatar
                            rounded
                            source={{uri:imageUrl ? imageUrl : require("../assets/icon.png")}}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        marginRight: SIZES.margin * 1.5,
                        flexDirection: "row",
                        alignItems: "center",

                    }}
                >
                    <TouchableOpacity onPress={() => { }}>
                        <Feather
                            name="camera"
                            size={24}
                            style={{
                                marginRight: SIZES.margin
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { navigation.navigate("AddChat") }}>
                        <SimpleLineIcons
                            name="pencil"
                            size={24}
                            style={{
                                marginLeft: SIZES.margin
                            }}
                        />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const enterChat = (id, chatName) =>{
        navigation.navigate('ChatRoom', {id: id,chatName: chatName});
    }
    return (
        <SafeAreaView>
            <FlatList
                data={chats}
                renderItem={({ item }) => <ChatRoomItem chatRoom={item} enterChat={enterChat}/>}
                showsVerticalScrollIndicator={false}
                style={{ height: "100%"}}
            />
        </SafeAreaView>


    )
}

export default Home

const styles = StyleSheet.create({})
