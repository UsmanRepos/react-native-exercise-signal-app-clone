import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { SIZES, COLORS } from '../constants'
const ChatRoomHeader = ({navigation, route}) => {
    return (
        <View
            style={{
                flexDirection:"row",
                paddingVertical:SIZES.padding,
                paddingHorizontal:SIZES.padding * 1.5,
                backgroundColor:COLORS.primary,
                alignItems:"center",
            }}
        >
            <TouchableOpacity 
                style={{
                    justifyContent:"center",
                }}
                onPress={()=>navigation.goBack()}
            >
                <AntDesign name="arrowleft" size={20} color={COLORS.white} />
            </TouchableOpacity>
            <View
                style={{
                    flex:1,
                    flexDirection:"row",
                    paddingHorizontal:SIZES.padding,
                    alignItems:"center",
                }}
            >
                <Image
                    source={require('../assets/icon.png')}
                    resizeMode="contain"
                    style={{
                        width: 30,
                        height: 30,
                        borderRadius: 999,
                        marginRight:SIZES.margin,
                    }}
                />
                <Text
                    style={{
                        color:COLORS.white,
                    }}
                >Usman Aslam</Text>
            </View>
            <View
                style={{
                    flexDirection:"row",
                    justifyContent:"center",
                }}
            >
                <TouchableOpacity >
                    <FontAwesome name="video-camera" size={20} color={COLORS.white} style={{marginRight:SIZES.margin}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="call" size={20} color={COLORS.white} style={{marginHorizontal:SIZES.margin}}/>
                </TouchableOpacity>
                <TouchableOpacity>
                <MaterialCommunityIcons name="dots-vertical" size={20} color={COLORS.white} style={{marginLeft:SIZES.margin}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatRoomHeader
