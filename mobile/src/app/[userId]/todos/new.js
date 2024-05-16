import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import TaskService from '../../../services/task'
import TagService from '../../../services/tag'
import { Picker } from '@react-native-picker/picker';

export default function NewTodo() {
  const params = useLocalSearchParams()
  
  const [description, setDescription] = useState('')
  const [tagId, setTagId] = useState(1)
  const [tags, setTags] = useState([])

  const userId = Number(params.userId)

  const handleCreateTask = async () => {
    if (!description.trim()) {
      alert('Informe uma descricao!')
      return
    }

    if (!tagId) {
      alert('Selecione uma tag!')
      return
    }

    TaskService.create(description, tagId, userId)
      .then(() => router.push(`${userId}/todos`))
      .catch(alert)
  }

  useEffect(() => {
    TagService.findAll(userId)
      .then(response => {
        if (response.data.length === 0) {
          alert('Vc nao tem nenhuma Tag cadastrada ainda :(, cadastre agora!')
          router.push(`${userId}/todos/tag`)
        } else {
          setTags(response.data)
        }
      })
  }, [userId])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nova tarefa</Text>

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
        <Text>Tag</Text>
        
        <Picker
          style={styles.input}
          selectedValue={tagId}
          onValueChange={(itemValue) => setTagId(itemValue)}
        >
          {tags.map(tag => (
            <Picker.Item key={tag.ID} label={tag.NAME} value={tag.ID} />
          ))}
        </Picker>
      </View>

      
      <View style={styles.buttons}>
        <Link href={`${userId}/todos`} style={styles.back}>Voltar</Link>
        <Button title="Salvar" style={styles.save} onPress={handleCreateTask} />
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