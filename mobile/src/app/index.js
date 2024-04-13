import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';

export default function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  const handleLogin = () => {
    // if (!user || !pass) {
    //   alert('Informe usuário e senha >:(')
    //   return
    // }

    router.push('/todos')
  }
  
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput 
        placeholder='usuário'
        value={user}
        onChangeText={txt => setUser(txt)}
        style={styles.input}
      />
      <TextInput
        placeholder='senha'
        value={pass}
        onChangeText={txt => setPass(txt)}
        style={styles.input}
        secureTextEntry
      />
      <Button title='Entrar' onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    width: 250,
  }
});
