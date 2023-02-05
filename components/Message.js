import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements';
import { SIZES, COLORS } from '../constants'
import { auth, db } from '../Firebase/firebase';


const Message = ({ message }) => {
    const { id, data } = message;
    const imageUrl = auth.getAuth().currentUser?.photoURL;

    const isMe = data?.email == auth.getAuth().currentUser?.email;
    return (
        <View 
            style={{
                maxWidth:"75%",
                padding:SIZES.padding * 1.3,
                borderRadius:SIZES.radius * .5,
                backgroundColor:isMe ? COLORS.primary : COLORS.secondary ,
                alignSelf:isMe ? "flex-end" : "flex-start",
                marginVertical:SIZES.margin,
                marginHorizontal:SIZES.margin * 1.5,
                position:"relative",
            }}
        >
            <Avatar 
                rounded
                containerStyle={{
                    position:"absolute",
                    bottom:-15,
                    right: isMe && -5,
                    left: !isMe && -5,
                }}
                size={30}
                source={{uri:imageUrl ? imageUrl : require("../assets/icon.png")}}
                
            />
            <Text
                style={{
                    color:isMe ? COLORS.white : COLORS.black,
                }}
            >{data?.message}</Text>
        </View>
    )
}

export default Message

const styles = StyleSheet.create({})
