import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import Checkbox from 'expo-checkbox';
import TaskService from '../../../services/task'

export default function Todo() {
  const params = useLocalSearchParams()
  
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)
  const [tag, setTag] = useState('')

  const userId = Number(params.userId)

  const handleUpdateTask = async () => {
    if (!description.trim()) {
      alert('Informe uma descricao!')
      return
    }

    TaskService.updateTask(params.id, userId, description, completed)
      .then(() => router.push(`${userId}/todos`))
      .catch((ex) => alert(ex))
  }

  useEffect(() => {
    if (!params.id) return
    TaskService.findOne(params.id, userId).then(response => {
      setDescription(response.data.DESCRIPTION)
      setCompleted(response.data.COMPLETED)
      setTag(response.data.TAG.NAME)
    })
  }, [params.id, userId])
  
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
        <Text>Tag (não editável)</Text>
        
        <TextInput 
          value={tag}
          style={{ ...styles.input, color: 'gray', borderColor: 'gray', backgroundColor: '#f3f3f3' }}
          readOnly
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
        <Link href={`${userId}/todos`} style={styles.back}>Voltar</Link>
        <Button title="Salvar" style={styles.save} onPress={handleUpdateTask} />
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