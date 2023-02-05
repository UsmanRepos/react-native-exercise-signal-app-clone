import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { auth } from '../Firebase/firebase';
import { SIZES, COLORS } from '../constants'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    const register = () => {
        auth.createUserWithEmailAndPassword(auth.getAuth(),email, password)
        .then(authUser => {
            const user = authUser.user;
            user.photoURL =  (imageUrl != "") ? imageUrl : "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png";
            user.displayName = name;
        })
        .catch(error => alert(error.message))
        
    }
    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: SIZES.padding,
                backgroundColor: COLORS.white,
            }}
        >
            <View>
                <Text
                    h3
                    style={{ marginBottom: SIZES.margin * 5 }}
                >Create Signal Account</Text>
            </View>
            <View
                style={{
                    width: 300,
                }}
            >
                <Input
                    autoFocus
                    placeholder="Name"
                    onChangeText={text => setName(text)}
                    textContentType="name"
                    value={name}
                />
                <Input
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    value={email}
                />
                <Input
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                    textContentType="password"
                    secureTextEntry
                    value={password}
                />
                <Input
                    placeholder="Image Url (Optional)"
                    onChangeText={text => setImageUrl(text)}
                    onSubmitEditing={register}
                    keyboardType="url"
                    value={imageUrl}
                />
            </View>
            <View>
                <Button
                    raised
                    title="Register"
                    onPress={register}
                    style={{
                        width: 200,
                        marginTop: SIZES.margin,
                    }}
                />
            </View>
            <View
                style={{
                    height: 100,
                }}
            ></View>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({})
