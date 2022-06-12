import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import {Feather } from "@expo/vector-icons";
import { style } from 'styled-system';
import { Button, Modal, FormControl, Input  } from "native-base";
import axios from "axios";



export default function Detail(props) {
  const id = props.route.params._id;
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(props.route.params.title);
  const [description, setDescription] = useState(props.route.params.description);

  const getTodo = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://api.kontenbase.com/query/api/v1/dc51cf3c-5601-45a2-a1b1-7c689bd989fd/task/${id}`)
      setTitle(response.data.title);
      setDescription(response.data.description)
      console.log(response.data);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
      
  }
  const handleUpdateTask = async (data) => {
    try {

      const data = {
        title: title == "" ? (titleTask):(title),
        description: description == "" ? (descriptionTask):(description),
      };

      const response = await axios.patch(`https://api.kontenbase.com/query/api/v1/dc51cf3c-5601-45a2-a1b1-7c689bd989fd/task/${id}`, data);
    } catch (error) {
      console.log(error);
    }
  }

  const onPressButton = () => {
    handleUpdateTask();
    setShowModal(false);
    getTodo();
  };

  useEffect(() => {
    getTodo()
  
  }, [])

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        
          <View style={styles.detailContainer}>
            
            <Text style={styles.itemText}>
              {title}
              <Feather name="edit" style={styles.edit} onPress={() => setShowModal(true)} size={24} color="green" />
            </Text>
        
            <Text >
              {description}
            </Text>
        </View>
      </View>
        
      </ScrollView>
      <KeyboardAvoidingView 
       
       style={styles.writeTaskWrapper}
     >
       <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
       <Modal.Content maxWidth="400px">
         <Modal.Header>Update Todo</Modal.Header>
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
             <Button onPress={ () => onPressButton()} >Save</Button>
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
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  detailContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    flex: 2,
    
  },
  itemText: {
    fontSize: 20,
    marginBottom:30,
  },
  edit:{
    marginLeft:200
  }
  
});