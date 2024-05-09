import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { HelperText, Button } from "react-native-paper";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc} from "firebase/firestore"; 

const RegisterScreen = ({ navigation }) => {
  const auth = getAuth();
  const firestore = getFirestore(); // Correct way to get Firestore instance

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const registerScreen = () => {
    if (!fullname.trim()) {
      setError('Tên không được để trống');
      return;
    }
    if (!email.includes('@')) {
      setError('Email sai định dạng');
      return;
    }
    if (password.length < 6) {
      setError('Mật khẩu ít nhất 6 kí tự');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu không trùng khớp');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("tạo tài khoản thành công với email: " +email)
        // Store user data in Firestore
        setDoc(doc(firestore, "users", email), {
          email,
          fullname,
          password,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={require("../assets/logo.png")} style={styles.image} />

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullname}
        onChangeText={text => setFullname(text)}
        placeholderTextColor="#aaaaaa"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={text => setEmail(text)}
        placeholderTextColor="#aaaaaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        placeholderTextColor="#aaaaaa"
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)}
        secureTextEntry
        placeholderTextColor="#aaaaaa"
      />

      <TouchableOpacity onPress={registerScreen} style={styles.button}>
        <Text style={styles.buttonText}>Create account</Text>
      </TouchableOpacity>

      {error ? <HelperText type="error">{error}</HelperText> : null}

      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 8 }}>Already got an account?</Text>
          <Button onPress={() => navigation.navigate('Login')} style={{ marginLeft: -5 }}>Log in</Button>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    height: 150,
    marginBottom: 30,
    alignItems: 'center',
    width: 'auto',
  },
  input: {
    width: '90%',
    height: 48,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    alignItems: 'center',
    width: 'auto',
  },
  button: {
    backgroundColor: '#007bff',
    width: '90%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
