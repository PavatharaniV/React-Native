import { View, Text, Button, TextInput,StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Firestore, addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { database } from '../../firebaseConfig';
import Ionicons from '@expo/vector-icons/Ionicons';
import {Entypo} from '@expo/vector-icons';

export interface Todo{
  title: string;
  done: boolean;
  id:string;
}

const List = ({navigation}:any) => {

  const[todos, setTodos] = useState<Todo[]>([]);
  const[todo,setTodo] = useState('');

  useEffect(()=>{
    const ref = collection(database,'todo');

    const subs = onSnapshot(ref,{ 

      next:(snapshot)=>{

        console.log('UPDATED');

        const todos : Todo[] =[];
        snapshot.docs.forEach((doc) =>{
          console.log(doc.data);
          todos.push({
            id:doc.id,
            ...doc.data(),
          } as Todo);
        });
        setTodos(todos);
      },
    });
    return ()=>subs();
  },[]);

  const addTodo = async() => {
    const doc = await addDoc(collection(database,'todo'),{title:todo, done:false});
    setTodo('');
  }

  const renderTodos = ({item}: any) =>{

    const ref = doc(database,`todo/${item.id}`)

    const toggleDone = async() =>{
      updateDoc(ref,{done: !item.done});
    }

    const deletebutton = async() =>{
      deleteDoc(ref);
    }

    return (
    <View style={styles.todocontainer}>
      <TouchableOpacity onPress={toggleDone} style={styles.todo}>
        {item.done && <Ionicons name='md-checkmark-circle'size={24} />}
        {!item.done && <Entypo name="circle" size={24} color="black"/>}
        <Text style={styles.todotext}>{item.title}</Text>
      </TouchableOpacity>
     <Ionicons name='trash-bin-outline' size={24} color="black" onPress={deletebutton} />

    </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TextInput style={styles.input} placeholder='Add new todo'
        onChangeText={(text: string) => setTodo(text)}
        value={todo}
       />

       <Button onPress={addTodo} title='Add todo' disabled={todo===''} />

      </View>

      {
        todos.length > 0 && (
          <View>
            <FlatList 
            data={todos}
            renderItem={(item)=>renderTodos(item)}
            keyExtractor={(todo:Todo) => todo.id}
            />
          </View>
        )
      }
      <View>
        {todos.map((todo) => (
          <Text key={todo.id}>
          </Text>
        ))}
      </View>
    </View>

    
  )
}

export default List

const styles = StyleSheet.create({
  container : {
    marginHorizontal:20
  },
  form:{
    flexDirection:'row',
    marginVertical:20
  },
  input:{
    flex:1,
    height:40,
    borderWidth:1,
    borderRadius:10,
    padding:5,
    backgroundColor:'#ffffff'
    
  },
  todocontainer:{
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#ffffff',
    padding:10,
    marginVertical:4
  },
  todotext:{
    flex:1,
    paddingHorizontal:4
  },
  todo:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
  }
});