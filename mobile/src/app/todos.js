import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Todos() {
  return (
    <View style={styles.container}>
      <Text>todos...</Text>
      <Link href="/">voltar</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  }
});
