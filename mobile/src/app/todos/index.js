import { Alert, FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { router } from "expo-router";

const todos = [
  {id: 1, description: 'lavar a louca', completed: false},
  {id: 2, description: 'fazer tal coisa', completed: true},
  {id: 3, description: 'abastecer carro', completed: false},
  {id: 5, description: 'comprar fosforo', completed: true},
  {id: 6, description: 'comprar carvao', completed: false},
  {id: 7, description: 'levar o cachorro passear', completed: false},
  {id: 8, description: 'fazer alguma coisa', completed: true},
  {id: 9, description: 'fazer TDE de prog movel', completed: true},
  {id: 10, description: 'fazer outro TDE', completed: true},
  {id: 11, description: 'dormir?', completed: true},
]

const Item = ({id, description, onUpdate, onDelete}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.description}>{description}</Text>
      <View style={{ flexDirection: 'row', gap: 16 }}>
        <Feather name="edit" size={24} color="black" onPress={() => onUpdate(id)} />
        <Feather name="trash" size={24} color="black" onPress={() => onDelete(id)} />
      </View>
    </View>
  );
}

export default function Todos() {
  const handleUpdateTodo = (id) => {
    router.push(`/todos/${id}`)
  }

  const handleDeleteTodo = (id) => {
    Alert.alert('Conrirmação', 'Deseja apagar essa tarefa?', [
      {
        text: 'Não',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Sim', onPress: () => console.log('OK Pressed')},
    ]);
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>
      <FlatList
        data={todos}
        renderItem={({item}) => <Item 
          description={item.description}
          id={item.id}  
          onUpdate={handleUpdateTodo}
          onDelete={handleDeleteTodo}
        />}
        keyExtractor={item => item.id}
        style={styles.list}
      />
    </SafeAreaView>
  )
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
  description: {
    fontSize: 16,
  },
});
