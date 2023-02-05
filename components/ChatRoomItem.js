import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
// import { useNavigation } from '@react-navigation/core'
import { SIZES, COLORS } from '../constants'
import { db } from '../Firebase/firebase'

const ChatRoomItem = ({ chatRoom, enterChat }) => {
    // const { id, users, lastMessage, newMessages } = chatRoom;
    // const navigation = useNavigation();
    const { id, data: { chatName } } = chatRoom;
    const [messages, setMessages] = useState([]);    

    const getMessages = async () => {
        const docRef = db.doc(db.getFirestore(), 'chats', id);
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
    useEffect(() => {
        getMessages();
        //const docRef = doc(db.getFirestore(), 'chats', id);
        // const unsubscribe = db.onSnapshot(db.collection(docRef, "messages"), (snapshot) => setMessages(snapshot.docs.map((doc) => ({
        //     id: doc.id,
        //     data: doc.data(),
        // }))))
    }, [])
    return (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                padding: SIZES.padding,
                borderBottomColor: COLORS.secondary,
                borderBottomWidth: 1,
                backgroundColor: COLORS.white,
            }}
            // onPress={()=> navigation.navigate('chatRoom', {id: id, chatName: chatName})}
            onPress={() => enterChat(id, chatName)}

        >
            <View>
                <Image
                    source={{uri:messages?.[0]?.data?.photoURL ? messages?.[0]?.data?.photoURL: require("../assets/icon.png")}}
                    resizeMode="contain"
                    style={{
                        width: 45,
                        height: 45,
                        borderRadius: 999,
                        marginRight: SIZES.margin,
                    }}
                />
                {/* {newMessages && <View
                    style={{
                        width:20,
                        height:20,
                        position:"absolute",
                        right:5,
                        top:5,
                        justifyContent:"center",
                        alignItems:"center",
                        borderRadius:999,
                        borderWidth:1,
                        borderColor:COLORS.white,
                        backgroundColor:"#3872E9",
                    }}
                >
                    <Text
                        style={{
                            color:COLORS.white,
                        }}
                    >4</Text>
                </View>} */}
            </View>

            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: SIZES.h4,
                            marginBottom: SIZES.margin * .3,
                        }}
                    >{chatName}</Text>
                    <Text
                        style={{
                            color: COLORS.lightGray1,
                            fontSize: SIZES.font,
                        }}
                    >10:12 am</Text>
                </View>
                <View>
                    <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{
                            color: COLORS.lightGray1,
                            fontSize: SIZES.font,
                        }}
                    >{messages?.[0]?.data?.displayName}: {messages?.[0]?.data?.message}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}

export default ChatRoomItem

const styles = StyleSheet.create({})
