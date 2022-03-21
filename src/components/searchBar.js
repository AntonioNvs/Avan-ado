import { useState } from "react"
import { View, StyleSheet, TextInput } from "react-native"
import { Feather } from "@expo/vector-icons"

export default function SearchBar({ executeWhenPressEnter }) {
  const [textQuery, setTextQuery] = useState("")

  return (
    <View style={styles.inputContainer}>
      <Feather name="search" color="#434343" size={24}/>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do local aqui."
        placeholderTextColor="#434343"
        value={textQuery}
        onChangeText={(text) => setTextQuery(text)}
        onSubmitEditing={() => {
          setTextQuery("")
          executeWhenPressEnter(textQuery).then()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    marginTop: 24
  },
  input: {
    flex: 1,
    marginHorizontal: 12,
    color: "#FAFAFA",
  }
})