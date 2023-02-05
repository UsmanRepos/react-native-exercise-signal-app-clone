import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SIZES } from '../constants';
import { auth, db } from '../Firebase/firebase';

const AddChat = ({navigation}) => {
    const [ input, setInput ] = useState("");
    
    useLayoutEffect(()=>{
        navigation.setOptions({
            title:"Add New Chat",
            headerBackTitle:"Chats",
        })
    },[navigation])

    const CreateChat = async () => {
        await db
        .addDoc(db.collection(db.getFirestore(), 'chats'),{
            chatName:input,
        })
        .then( navigation.goBack())
        .catch(error => alert(error.message));
    }
    return (
        <View
            style={{
                height:"100%",
                backgroundColor:COLORS.white,
                padding:SIZES.padding * 1.5,
            }}
        >
            <Input 
                placeholder="Enter Chat Name"
                onChangeText = {(text) => setInput(text)}
                onSubmitEditing={CreateChat}
                value={input}
                leftIcon={
                    <AntDesign name="wechat" size={24} color="black" />
                }
            />
            <Button 
                title="Create New Chat"
                onPress={CreateChat}
                disabled={!input}
            />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({})
