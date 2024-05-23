import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Link, router } from 'expo-router';
import AuthService from '../services/auth'
import Button from '../components/Button'

export default function NewUser() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreateUser = async () => {
    if (!user.trim() || !pass.trim()) {
      alert('Informe usuário e senha!')
      return
    }

    try {
      setLoading(true)
      const { data } = await AuthService.createUser(user, pass)
      router.push(`/${data.ID}/todos`)
    } catch (ex) {
      alert('deu ruim! :/')
      console.log(ex)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <View style={styles.container}>
      <Text>Crie seu usuário</Text>
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
      <Button title='Criar' onPress={handleCreateUser} isLoading={loading} />
      <Link href="/">Voltar</Link>
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
