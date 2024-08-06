import { FormEvent, useState } from "react"
import { useTodos } from "./store/useTodos";
import { useSearchParams } from "react-router-dom";

export const AddTodo = () => {
  const [todo, setTodo] = useState("");
  const {handleAddTodo} = useTodos();
  const [searchParams] = useSearchParams();
  const todosData = searchParams.get('todo');

  console.log(todosData);

  const handleFormSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo && (todo !== ' ')) {
      handleAddTodo(todo);
    }
    
    setTodo("");
  }

  if (todosData === 'active' || todosData === 'completed') {
    return (<><br /><br /></>)
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)}/>
      <button type='submit' >Add</button>
    </form>
  )


}