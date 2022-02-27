import { Button, TextField } from '@mui/material';
import React, {useReducer,useRef,useCallback} from 'react';
import './App.css';

interface Todo{
  id:number,
  text:string
}
type  ActionType={type:"ADD";text:string} | {type:"REMOVE";id:number}
function App() {
  function reducer(state:Todo[],action:ActionType){
    switch(action.type){
      case "ADD":
        return[
          ...state,
          {
            id:state.length,
            text:action.text,
          },
        ];
        case "REMOVE" :
          return state.filter(({id})=>id!==action.id)
    }
  }
  const[todos,dispatch]=useReducer(reducer,[]);
  const newtodoRef=useRef<HTMLInputElement>(null);
  const onAddTodo=useCallback(()=>{
if(newtodoRef.current){
  dispatch({
    type:"ADD",
    text:newtodoRef.current.value
  })
  newtodoRef.current.value="";
}
  },[])

  return (
    <div className="App">
      <h1>Please text input </h1>
      
      <input type="text" ref={newtodoRef} style={{width:"20%",borderRadius:"10px"}} />
      <br />
      <Button variant="contained" onClick={onAddTodo} style={{width:"20%"}}>add</Button>
      
     
   {
     todos.map((todo)=>(
       <div key={todo.id}>{todo.text}
             <Button variant="contained" onClick={()=>dispatch({type:"REMOVE",id:todo.id})} style={{width:"5%",margin:"10px"}}>remove</Button>

       </div>
     ))
   }
     
    </div>
  );
}

export default App;
