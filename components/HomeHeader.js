import React from 'react'
import { View, Text,Image , TouchableOpacity } from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Feather } from '@expo/vector-icons'
import { SIZES, COLORS } from '../constants'

const HomeHeader = () => {
    return (
        <View
            style={{
                flexDirection:"row",
                justifyContent:"center",
                alignItems:"center",
                paddingHorizontal:SIZES.padding * 1.5,
                paddingVertical:SIZES.padding,
                backgroundColor:COLORS.white,
                borderWidth:1,
                borderColor:COLORS.darkgray,
            }}
        >
            <View
                style={{
                    flex:1,
                }}
            >
                <Image 
                    source={require('../assets/icon.png')}
                    resizeMode="contain"
                    style={{
                        width:30,
                        height:30,
                        borderRadius:999,
                    }}
                />
            </View>
            <View
                style={{
                    flex:1,
                    alignItems:"center",
                    justifyContent:"center",
                }}
            >

                <Text>Signal</Text>
            </View>
            <View
                style={{
                    flex:1,
                    flexDirection:"row",
                    justifyContent:"flex-end",
                    alignItems:"center",
                }}
            >
                <TouchableOpacity onPress={()=>{}}>
                <Feather
                        name="camera" 
                        size={20}
                        color={COLORS.darkgray}
                        style={{
                            marginRight:SIZES.margin
                        }}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                    <SimpleLineIcons 
                        name="pencil" 
                        size={20} 
                        color={COLORS.darkgray}
                        style={{
                            marginLeft:SIZES.margin
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeHeader
