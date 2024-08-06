import {ReactNode, createContext, useContext, useState } from "react";



export type Todo = {
  id:string;
  task:string;
  completed:boolean;
  createdAt:Date;
}

export type TodosContext = {
  todos:Todo[];
  handleAddTodo:(task:string) => void;  // call signature
  toggleTodoAsCompleted:(id:string) => void;
  handleDeleteTodo:(id:string) => void;
}
export type TodoProviderProps = {
  children:ReactNode ;
}

export const TodoContext = createContext<TodosContext | null>(null);

export const TodoProvider = ({children}:TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const newTodos = localStorage.getItem("todos") || "[]";
      return JSON.parse(newTodos);
    } catch(error) {
      return [];
    }
  })

  const handleAddTodo = (task:string) => {

    setTodos((prev) => {
      const newTodos:Todo[] = [
        {
          id: Math.random().toString(),
          task:task,
          completed: false,
          createdAt: new Date()
        },
        ...prev
      ]
      // console.log(newTodos);
      localStorage.setItem("todos",JSON.stringify(newTodos));
      return newTodos;
    })

  }

  //functionality for checked ones
  const toggleTodoAsCompleted = (id:string) => {
    setTodos((prev) => {
      let newTodos = prev.map((todo) => {
        if (todo.id === id) {
          return {...todo, completed : !todo.completed}
        }

        return todo;
      })
      localStorage.setItem("todos",JSON.stringify(newTodos));
      return newTodos;
    })
  }

  // delete the individual data
  const handleDeleteTodo = (id:string):void => {
    setTodos((prev) => {
      let newTodos = prev.filter((todo) => todo.id !== id);
      localStorage.setItem("todos",JSON.stringify(newTodos));
      return newTodos;
    })
  }
  
  return (
    <TodoContext.Provider value = {{todos, handleAddTodo, toggleTodoAsCompleted,handleDeleteTodo}}>
      {children}
    </TodoContext.Provider>
  )
} 

//consumer 
export const useTodos = () => {
  const todosConsumer = useContext(TodoContext);

  if(!todosConsumer) {
    throw new Error('useTodos is used outside of Provider');
  }

  return todosConsumer;
}

