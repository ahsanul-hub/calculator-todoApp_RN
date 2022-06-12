import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  Button,
  Modal,
  FormControl,
  Input,
  Alert,
  Pressable,
  HStack,
  FlatList,
  List,
} from "native-base";
import axios from "axios";
import { FontAwesome, Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

const dummy = [
  {
    title: "qwer",
    description: "2345",
    _id: "234",
    status: "Done",
  },
];

export default function Todo({ navigation }) {
  console.log(navigation);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const url = "http://localhost:5000/api/v1/";
  const [todo, setTodo] = useState([]);
  const [tes, setTes] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const isFocus = useIsFocused();

  const handleAddTask = async () => {
    try {
      if (!title || !description) {
        return <Alert>You need to fill the field</Alert>;
      }

      const data = {
        title,
        description,
      };

      const response = await axios.post(
        `https://api.kontenbase.com/query/api/v1/dc51cf3c-5601-45a2-a1b1-7c689bd989fd/task`,
        data
      );
      getTodo();
    } catch (error) {
      console.log(error);
    }
  };

  const onPressButton = () => {
    getTodo();
    handleAddTask();
    setShowModal(false);
  };

  const getTodo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.kontenbase.com/query/api/v1/dc51cf3c-5601-45a2-a1b1-7c689bd989fd/task`
      );
      setTodo(response.data);

      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `https://api.kontenbase.com/query/api/v1/dc51cf3c-5601-45a2-a1b1-7c689bd989fd/task/${id}`
      );
      getTodo();
    } catch (error) {
      console.log(error);
    }
  };

  const doneTodo = async (id) => {
    try {
      let done = {
        status: "Done",
      };

      const response = await axios.patch(
        `https://api.kontenbase.com/query/api/v1/dc51cf3c-5601-45a2-a1b1-7c689bd989fd/task/${id}`,
        done
      );
      setIsLoading(true);
      getTodo();
    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
    getTodo();
    
  }, [isFocus]);
  
  const _renderItem = ({ item }) => {
    
    return (
      
      <List
        key={item._id.toString()}
        my={2}
        spacing={2}
        bg="#fff"
        borderRadius={10}
      >
        <List.Item>
          <HStack direction="row" space={10}>
            {item.status === "Done" ? (
              <HStack align="rigth">
                <FontAwesome
                  name="check-square-o"
                  size={24}
                  color="green"
                  style={styles.check}
                />
              </HStack>
            ) : (
              <HStack>
                <HStack>
                  <TouchableOpacity
                    style={styles.circular}
                    onPress={() => doneTodo(item._id)}
                  ></TouchableOpacity>
                  
                </HStack>
              </HStack>
            )}
            <Pressable
              style={styles.listContainer}
              onPress={() => navigation.navigate("Detail", item)}
            >
              <Text style={styles.itemText}>{item.title}</Text>
            </Pressable>

            <Feather
              onPress={() => deleteTodo(item._id)}
              name="delete"
              size={24}
              color="red"
            />
          </HStack>
        </List.Item>
      </List>
    );
  };

  if (isLoading)
    return (
      <View>
        <Text>LOADING</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Todo List </Text>
        <View style={styles.items}>
          <FlatList
            data={todo}
            renderItem={_renderItem}
            keyExtractor={(item) => item._id.toString()}
            refreshing={isLoading}
            onRefresh={getTodo}
          />
        </View>
      </View>

      <KeyboardAvoidingView style={styles.writeTaskWrapper}>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <View>
            <Text>{tes}</Text>
          </View>
          <View style={styles.addWrapper}>
            
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.Header>Add Todo</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Title</FormControl.Label>
                <Input
                  placeholder="Input your Title"
                  autoFocus={true}
                  onChangeText={(nextValue) => setTitle(nextValue)}
                />
              </FormControl>
              <FormControl>
                <FormControl.Label>Description</FormControl.Label>
                <Input
                  placeholder="Input your Description"
                  // value={description}
                  autoFocus={true}
                  onChangeText={(descValue) => setDescription(descValue)}
                />
              </FormControl>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  color="white"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onPress={() => onPressButton()}>Save</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  itemText: {
    
    fontWeight: "bold",
    fontSize: 20,
  },
  circular: {
    width: 24,
    height: 24,
    borderColor: "#55BCF6",
    borderWidth: 2,
    borderRadius: 5,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    fontSize: 30,
    fontWeight: "bold",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  listContainer: {
    width: 160,
  },
});
