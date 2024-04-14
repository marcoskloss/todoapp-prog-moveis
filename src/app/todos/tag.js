import { Link, router } from "expo-router";
import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import TagService from '../../backend/services/tag'
import { USER_ID } from ".";

export default function NewTask() {
  const [name, setName] = useState('')

  const handleCreateTag = async () => {
    if (!name) {
      alert('Informe um nome!')
      return
    }

    TagService.create(name, USER_ID)
      .then(() => router.push('/todos'))
      .catch((ex) => alert(ex))
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
        <Link href="/todos" style={styles.back}>Voltar</Link>
        <Button title="Salvar" style={styles.save} onPress={handleCreateTag} />
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
  save: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  }
});