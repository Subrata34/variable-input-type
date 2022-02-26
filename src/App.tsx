import React, { useCallback, useReducer, useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, TextField } from '@mui/material';

interface Todo{
    id:number,
    text:string
}
type Actiontype=
   |{type:"ADD",text:string} 
   |{type:"REMOVE"; id:number};

function App() {
  function reducer(state:Todo[],action:Actiontype){
    switch(action.type){
      case "ADD" :
        return[
          ...state,
          {
            id:state.length,
            text:action.text,
          },
        ];
        case "REMOVE":
          return state.filter(({id})=>id!==action.id);
    }
  }
  const [todos, dispatch] = useReducer(reducer, []);
  const newTodoRef=useRef<HTMLInputElement>(null);
  const onaddtodo=useCallback(()=>{
 if(newTodoRef.current){
   dispatch({
     type:"ADD",
     text:newTodoRef.current.value
   })
   newTodoRef.current.value="";
 }
  },[])

  return (
    <div className="App">
    <TextField
  label="Input  Name"
  variant="standard"
  ref={newTodoRef}
/>
<Button variant="contained" onClick={onaddtodo}>add</Button>
      {
        todos.map((todo)=>(
        <div key={todo.id}>
          {todo.text}</div>
        ))
      }
     
    </div>
  );
}

export default App;
