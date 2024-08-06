import { AddTodo } from "./components/AddTodo"
import { Navbar } from "./components/Navbar"
import { Todos } from "./components/Todos"
import './App.css'

export const App = () => {
  return (
    <>
      <main>
        <h1>TODO REACT + TYPESCRIPT</h1>
        <br />
        <br />
        <Navbar />
        <AddTodo />
        <Todos />
      </main>
    </>
  )
}