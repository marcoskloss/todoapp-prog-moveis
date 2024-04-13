import { Link, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import Checkbox from 'expo-checkbox';

export default function Todo() {
  const params = useLocalSearchParams()
  
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)

  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edição de tarefa</Text>
      <Text>Tarefa de ID: {params.id}</Text>

      <View style={styles.field}>
        <Text>Descrição</Text>
        
        <TextInput 
          placeholder="descrição"
          value={description}
          onChangeText={(txt) => setDescription(txt)}
          style={styles.input}
        />
      </View>

      

      <View style={styles.field}>
        <Text>Finalizada</Text>
        <Checkbox
          style={styles.checkbox}
          value={completed}
          onValueChange={setCompleted}
          color={completed ? '#4630EB' : undefined}
        />
      </View>

      <View style={styles.buttons}>
        <Link href="/todos" style={styles.back}>Voltar</Link>
        <Button title="Salvar" style={styles.save} />
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