import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

export default function Button({ onPress, title, isLoading = false }) {
  const styles = makeStyles(isLoading)

  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => makeButtonStyle(pressed)}
      disabled={isLoading}
    >
      <Text style={styles.title}>{title}</Text>
      {isLoading && <ActivityIndicator color="#fff" style={styles.loading} />}
    </Pressable>
  ) 
}

const makeButtonStyle = (pressed) => {
  const backgroundColor = pressed ? '#357799' : '#0081f1'

  return StyleSheet.create({
    backgroundColor,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  })
}

const makeStyles = (isLoading) => StyleSheet.create({
  title: {
    fontSize: 16,
    color: '#fff',
    opacity: isLoading ? 0.3 : 1,
  },
  loading: {
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
  }
})
