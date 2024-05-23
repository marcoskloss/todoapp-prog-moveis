import { Link, router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import TagService from '../../../services/tag'
import Button from '../../../components/Button'

export default function NewTag() {
  const params = useLocalSearchParams()

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const userId = Number(params.userId)
  
  const handleCreateTag = async () => {
    if (!name.trim()) {
      alert('Informe um nome!')
      return
    }

    setLoading(true)
    TagService.create(name, userId)
      .then(() => router.push(`${userId}/todos`))
      .catch((ex) => alert(ex))
      .finally(() => setLoading(false))
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nova tag</Text>

      <View style={styles.field}>
        <Text>Nome</Text>
        
        <TextInput 
          placeholder="nome"
          value={name}
          onChangeText={(txt) => setName(txt)}
          style={styles.input}
        />
      </View>

      <View style={styles.buttons}>
        <Link href={`${userId}/todos`} style={styles.back}>Voltar</Link>
        <Button title="Salvar" onPress={handleCreateTag} isLoading={loading} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  checkbox: {
    height: 24,
    width: 24,
  },
  field: {
    gap: 8,
    width: 250,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
    width: 250,
  },
  buttons: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    width: 250,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center'
  },
  back: {
    backgroundColor: '#f3f3f3',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});