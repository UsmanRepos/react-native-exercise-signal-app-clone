import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'

import { SIZES, COLORS } from '../constants'

const MessageInput = ({sendMessage, setMessage, message}) => {
    
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
                margin:SIZES.margin * 1.5,
            }}
        >
            <View
                style={{
                    flex:1,
                    flexDirection: "row",
                    justifyContent: "center",
                    paddingVertical: SIZES.padding * .7,
                    paddingHorizontal: SIZES.padding,
                    marginRight:SIZES.margin * .5,
                    borderRadius: 999,
                    borderWidth:1,
                    borderColor:COLORS.secondary,
                    backgroundColor: COLORS.lightGray4,

                }}
            >
                <View>
                    <Ionicons name="ios-happy-outline" size={20} color={COLORS.darkgray} />
                </View>
                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: SIZES.padding * .7,
                        justifyContent: "center",
                    }}
                >
                    <TextInput 
                        placeholder="Signal Message" 
                        onChangeText={(text) => setMessage(text)}
                        onSubmitEditing={sendMessage}
                        value={message}  
                        style={{
                            borderColor:COLORS.transparent,
                        }}  
                    />
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <Feather
                        name="camera" 
                        size={20}
                        color={COLORS.darkgray}
                        style={{
                            marginRight: SIZES.margin * .5,
                        }}
                    />
                    <Ionicons
                        name="mic-outline"
                        size={20}
                        color={COLORS.darkgray}
                        style={{
                            marginLeft: SIZES.margin * .5,
                        }}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={{
                    width:40,
                    height:40,
                    borderRadius: 999,
                    backgroundColor: COLORS.primary,
                    justifyContent:"center",
                    alignItems:"center",
                    marginLeft:SIZES.margin * .5,
                }}
                onPress={()=>{
                    sendMessage();
                }}
            >
                {message 
                    ? <Ionicons name="send" size={20} color={COLORS.white} />
                    :<Ionicons name="add" size={20} color={COLORS.white} />
                }
            </TouchableOpacity>
        </View>
    )
}

export default MessageInput

const styles = StyleSheet.create({})
