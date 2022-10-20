import React, { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";

interface Props {
  refetch: () => void;
}

const NewTodoForm: React.FC<Props> = () => {
  const [newTodo, setNewTodo] = useState("");

  return (
    <View>
      <TextInput
        value={newTodo}
        style={styles.input}
        onChangeText={setNewTodo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "blue",
    borderWidth: 2,
    margin: 16
  }
});

export default NewTodoForm;
