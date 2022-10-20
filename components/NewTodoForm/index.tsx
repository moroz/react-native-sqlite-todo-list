import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

interface Props {
  onAdd: (value: string) => Promise<void>;
}

const NewTodoForm: React.FC<Props> = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState("");

  const onSubmit = useCallback(async () => {
    await onAdd(newTodo);
    setNewTodo("");
  }, [newTodo]);

  return (
    <View style={styles.layout}>
      <TextInput
        value={newTodo}
        style={styles.input}
        onChangeText={setNewTodo}
      />
      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  layout: {
    margin: 16,
    flexDirection: "row"
  },
  button: {
    width: 60,
    marginLeft: 10,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "black"
  },
  input: {
    flex: 1,
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "#333",
    borderWidth: 2
  }
});

export default NewTodoForm;
