import { Alert, Button, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import TaskService from '../../../services/task'

export default function Todos() {
  const [todos, setTodos] = useState([])
  const params = useLocalSearchParams()

  const userId = Number(params.userId)
  
  const handleUpdateTodo = (id) => {
    router.push(`${userId}/todos/${id}`)
  }

  const handleDeleteTodo = (id) => {
    Alert.alert('Conrirmação', 'Deseja apagar essa tarefa?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim', 
        onPress: () => {
          TaskService.deleteTask(id, userId).then(findAndSetTodos)
        }
      },
    ]);
  }

  const findAndSetTodos = async () => {
    TaskService.findAll(userId).then(response => {
      setTodos(response.data)
    })
  }

  useEffect(() => {
    findAndSetTodos()
  }, [userId])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>

      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button title="Nova tarefa" onPress={() => router.push(`${userId}/todos/new`)} />
        <Button title="Nova tag" onPress={() => router.push(`${userId}/todos/tag`)} />
      </View>

      <FlatList
        data={todos}
        renderItem={({item}) => <Item 
          description={item.DESCRIPTION}
          id={item.ID}  
          completed={item.COMPLETED}
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />}
        ListEmptyComponent={<Text>Vc nao tem nenhuma tarefa :)</Text>}
        keyExtractor={item => item.ID}
        style={styles.list}
      />

    </SafeAreaView>
  )
}

const Item = ({id, description, completed, onUpdate, onDelete}) => {
  return (
    <View style={styles.item}>
      <Text style={{
        fontSize: 16,
        textDecorationLine: completed ? 'line-through' : 'none',
        color: completed ? 'gray' : 'black',
      }}>
        {description}
      </Text>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Feather name="edit" size={24} color="black" onPress={() => onUpdate(id)} />
        <Feather name="trash" size={24} color="black" onPress={() => onDelete(id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
  },
  list: {
    width: '100%',
    paddingHorizontal: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  item: {
    padding: 8,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
  },
  itemCompleted: {textDecorationLine: 'line-through', textDecorationStyle: 'solid'}
});
