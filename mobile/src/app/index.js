import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { Link, router } from 'expo-router';
import AuthService from '../services/auth'
import SunriseSunsetService from '../services/sunrise-sunset'
import * as Location from 'expo-location';


const STATUS = {
  ASKING_FOR_LOCATION: '🛠️: verificando permissão de uso da localização',
  LOCATION_DENIED: '😔: não temos acesso a sua localização',
  GETTING_SUNRISE_SUNSET: '🤔: buscando informações do período do dia',
  ERROR_SUNSET_SUNRISE_API: '💀: deu ruim ao buscar as informações do período do dia',
  PERIOD_DAY: '🌞: é dia',
  PERIOD_NIGHT: '🌑: é noite'
}

export default function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [status, setStatus] = useState(STATUS.ASKING_FOR_LOCATION)

  const handleLogin = async () => {
    if (!user || !pass) {
      alert('Informe usuário e senha!')
      return
    }

    try {
      const { data } = await AuthService.authUser(user, pass)
      router.push(`${data.ID}/todos`)
    } catch (ex) {
      alert('Usuário ou senha inválidos!')
      console.log(ex)
    }
  }

  const setUserThemeBasedOnLocation = async () => {
    const location = await Location.requestForegroundPermissionsAsync()

    if (location.status !== 'granted') {
      setStatus(STATUS.LOCATION_DENIED)
      return
    }

    
    try {
      setStatus(STATUS.GETTING_SUNRISE_SUNSET)
      
      const { coords } = await Location.getCurrentPositionAsync()
      await SunriseSunsetService.getSunriseSunsetInfo(coords.latitude, coords.longitude)
      // TODO continuar logica de ver se eh dia ou noite

      setStatus(STATUS.PERIOD_DAY) // TODO logica...
      
    } catch (ex) {
      setStatus(STATUS.ERROR_SUNSET_SUNRISE_API)
      return
    }
  }
  
  useEffect(() => {
    setUserThemeBasedOnLocation()
  }, [])
  
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput 
          placeholder='usuário'
          value={user}
          onChangeText={setUser}
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
        <Link href="/new-user">Não possui uma conta?</Link>
      </View>

      <Text style={{ alignSelf: 'center', marginBottom: 8, fontSize: 12 }}>
        {status}
      </Text>
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
