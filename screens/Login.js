import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View,Image } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { auth } from '../Firebase/firebase';

import { SIZES, COLORS } from '../constants';

const Login = ({navigation, route}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const unsubscribe = auth.getAuth().onAuthStateChanged(authUser => {
            if(authUser){
                navigation.replace("Home");
            }
        })
        return unsubscribe;
    }, [])
    const SignIn = () => {
        auth
        .signInWithEmailAndPassword(auth.getAuth(), email, password)
        .catch(error => alert(error.message))
    }
    return (
        <KeyboardAvoidingView
            style={{
                flex:1,
                justifyContent:"center", 
                alignItems:"center",
                padding:SIZES.padding, 
                backgroundColor:COLORS.white,
            }}
        >
            <Image 
               source={{uri:"https://blog.mozilla.org//internetcitizen/files/2018/08/signal-logo.png"}}
                resizeMode="contain"
                style={{
                    width:200, height:200,
                }}
            />
            <View
                style={{
                    width:300,
                }}
            >
                <Input 
                    autoFocus
                    placeholder="Email"
                    onChangeText = {text => setEmail(text)}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={email}
                />
                <Input 
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                    onSubmitEditing={SignIn}
                    textContentType="password"
                    secureTextEntry
                    value={password}
                />
            </View>
            <View>
                <Button 
                    title="Login" 
                    onPress={SignIn} 
                    style={{
                        width:200, 
                        marginTop:SIZES.margin,
                    }}
                />
                <Button 
                    title="Register" 
                    type="outline" 
                    onPress = {() => navigation.navigate('Register')}
                    style={{
                        width:200, 
                        marginTop:SIZES.margin,
                    }}
                />
            </View>
            <View
                style={{
                    height:100,
                }}
            ></View>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({})
