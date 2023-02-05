import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { FlatList, StyleSheet, SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Avatar, } from 'react-native-elements'
// import { useRoute } from '@react-navigation/core'
import Message from '../components/Message'
import Chat from '../assets/dumyData/Chat'
import MessageInput from '../components/MessageInput'
import { COLORS, SIZES } from '../constants'
import { auth, db } from '../Firebase/firebase';
import { doc, serverTimestamp } from "firebase/firestore"


const ChatRoom = ({ navigation, route }) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const { id, chatName } = route.params;
    // const route = useRoute();
    // const {id} = route.params; =>Second Way

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity activeOpacity={.5} >
                        <Avatar
                            rounded
                            source={require("../assets/icon.png")}
                        />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "500",
                            color: COLORS.white,
                            marginLeft: SIZES.margin * .5,
                        }}
                        numberOfLines={1}
                    >{chatName}</Text>
                </View>
            ),
            headerTitleAlign: "left",
            headerLeft: () => (
                <View
                    style={{
                        marginLeft: SIZES.margin * 1.5,
                        justifyContent: "center",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            justifyContent: "center",
                        }}
                        onPress={() => navigation.goBack()}
                    >
                        <AntDesign name="arrowleft" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: SIZES.margin * 1.5,
                    }}
                >
                    <TouchableOpacity >
                        <FontAwesome name="video-camera" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color={COLORS.white} style={{ marginHorizontal: SIZES.margin * 1.7 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="dots-vertical" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            )
        })
    }, [navigation])

    const sendMessage = async () => {
        Keyboard.dismiss();

        console.log(auth.getAuth().currentUser);
        const docRef = doc(db.getFirestore(), 'chats', id);
        db.addDoc(db.collection(docRef, "messages"), {
            timestamp: serverTimestamp(),
            message: message,
            displayName: auth.getAuth().currentUser?.displayName,
            email: auth.getAuth().currentUser?.email,
            photoUrl: auth.getAuth().currentUser?.photoURL,
        })
        setMessage('');
    }
    const getMessages = async () => {
        const docRef = doc(db.getFirestore(), 'chats', id);
        const querySnapshot = await db.getDocs(db.collection(docRef, "messages"));
        querySnapshot.forEach((doc) => {
            setMessages((prev) => ([
                ...prev,
                {
                    id: doc.id,
                    data: doc.data(),
                }
            ]))
        });
    }
    useLayoutEffect(() => {
        getMessages();
        //const docRef = doc(db.getFirestore(), 'chats', id);
        // const unsubscribe = db.onSnapshot(db.collection(docRef, "messages"), (snapshot) => setMessages(snapshot.docs.map((doc) => ({
        //     id: doc.id,
        //     data: doc.data(),
        // }))))
    }, [route])
    return (
        <SafeAreaView style={{
            flex: 1,
            // padding: SIZES.padding * 1.5,
            backgroundColor: COLORS.white,
        }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "height"}
                keyboardVerticalOffset={90}
                style={{
                    flex: 1,
                }}
            >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => <Message message={item} />}
                        showsVerticalScrollIndicator={false}
                    />
                </TouchableWithoutFeedback>
                <MessageInput sendMessage={sendMessage} setMessage={setMessage} message={message} />
            </KeyboardAvoidingView>

        </SafeAreaView>
    )

}

export default ChatRoom

const styles = StyleSheet.create({})
