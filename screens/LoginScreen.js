import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {HelperText, Button} from "react-native-paper";
import { auth } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {HomeScreen} from "../screens/HomeScreen"

const Login = ({navigation})=>{
    const auth = getAuth();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const login = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigation.navigate("HomeScreen")
      }).catch((error) => {
        console.log(error);
      });
    };

  return (
    <View style = {styles.container}>
      <Image resizeMode="contain" source={require("../assets/logo.png")} style={styles.image}/>
      <TextInput style = {styles.input} value={email} onChangeText={text => setEmail(text)} placeholder="Email" placeholderTextColor="#aaaaaa"/>

      <TextInput style = {styles.input} value={password} onChangeText={text => setPassword(text)} placeholder="Password" placeholderTextColor="#aaaaaa" secureTextEntry/>

      <TouchableOpacity onPress={login} style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <View style={{alignItems:'center'}}>
        <View style={{flexDirection:'row'}}>
        <Text style={{marginTop:8}}>Don't have an account?</Text>
        <Button onPress={()=> navigation.navigate('Register')} style={{marginLeft:-5}}>Sign up </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding:16,
  },
  image:{
    height:150,
    marginBottom: 30,
    alignItems:'center',
    width:'auto',
  },
  input: {
    width: '90%',
    height: 48,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems:'center',
    width:'auto',
  },
  button: {
    backgroundColor: '#007bff',
    width: 'auto',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;

