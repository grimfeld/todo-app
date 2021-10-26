import { useState } from 'react'
import './App.css'
import moonIcon from "./images/icon-moon.svg"
import sunIcon from "./images/icon-sun.svg"
import lightBg from "./images/bg-desktop-light.jpg"
import darkBg from "./images/bg-desktop-dark.jpg"
import checkIcon from './images/icon-check.svg'
import crossIcon from './images/icon-cross.svg'

interface Todo {
  id: string
  status: "completed" | 'active'
  description: string
}

function App () {

  const getRandomId = () => Math.random().toString(36).slice(2)

  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  const switchTheme = () => {
    setTheme(theme === "light" ? 'dark' : 'light')
  }

  const [todos, setTodos] = useState<Array<Todo>>([
    { id: getRandomId(), status: "active", description: "Try to complete me" },
    { id: getRandomId(), status: "completed", description: "Try to undo me" }
  ])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo(e.currentTarget.value)
      e.currentTarget.value = ""
    }
  }

  const addTodo = (description: string) => {
    setTodos(todos => [{ id: getRandomId(), status: 'active', description: description }, ...todos])
  }

  const switchTodoStatus = (id: string) => {
    setTodos(todos => todos.map(todo => todo.id === id ? { ...todo, status: todo.status === 'active' ? 'completed' : 'active' } : todo))
  }

  const deleteTodo = (id: string) => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => todo.status === 'active'))
  }

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const switchFilter = (newFilter: 'all' | 'active' | 'completed') => {
    setFilter(newFilter)
  }

  return (
    <div className={[theme, 'h-screen flex flex-col bg-global'].join(' ')}>
      <header className='px-8 py-16' style={{ backgroundImage: `url(${theme === "light" ? lightBg : darkBg})`, backgroundPosition: "center", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <nav className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-widest text-white">TODO</h1>
          <img src={theme === "light" ? moonIcon : sunIcon} className="cursor-pointer" alt="Theme Toggler" onClick={switchTheme} />
        </nav>
        <input type="text" placeholder="Create a new todo..." className="w-full p-4 mt-8 rounded" onKeyPress={(e) => handleKeyPress(e)} />
        {/* <img src={checkIcon} alt="" /> */}
      </header>
      <main className="flex-grow px-8">
        <div className="bg-white rounded" style={{ transform: 'translateY(-25px)' }}>
          {todos.filter(todo => filter === 'completed' ? todo.status === 'completed' : filter === 'active' ? todo.status === 'active' : todo).map(todo => (
            <div key={todo.id} className="flex items-center justify-between p-4 border-b border-gray-300">
              <label htmlFor={todo.id} className={["grid w-6 h-6 border border-gray-300 rounded-full place-items-center cursor-pointer", todo.status === "completed" ? "bg-primary" : ''].join(' ')}>{todo.status === "completed" && <img src={checkIcon} alt="Completed" />}</label>
              <input onClick={() => switchTodoStatus(todo.id)} name="status" id={todo.id} type="checkbox" checked={todo.status === 'completed'} className="hidden cursor-pointer" />
              <p className="flex-grow ml-4">{todo.description}</p>
              <img src={crossIcon} onClick={() => deleteTodo(todo.id)} alt="Delete todo" className="w-3 cursor-pointer" />
            </div>
          ))}
          <div className="flex justify-between p-4">
            <p>{todos.filter(todo => filter === 'completed' ? todo.status === 'completed' : filter === 'active' ? todo.status === 'active' : todo).length} item{todos.filter(todo => filter === 'completed' ? todo.status === 'completed' : filter === 'active' ? todo.status === 'active' : todo).length === 1 ? '' : 's'} left</p>
            <p className="cursor-pointer" onClick={clearCompleted}>Clear Completed</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 bg-white rounded">
          <p onClick={() => switchFilter('all')} className={["cursor-pointer font-bold", filter === "all" ? 'text-primary' : ''].join(' ')}>All</p>
          <p onClick={() => switchFilter('active')} className={["cursor-pointer font-bold mx-4", filter === "active" ? 'text-primary' : ''].join(' ')}>Active</p>
          <p onClick={() => switchFilter('completed')} className={["cursor-pointer font-bold", filter === "completed" ? 'text-primary' : ''].join(' ')}>Completed</p>
        </div>
        {/* {JSON.stringify(todos, null, 2)} */}
      </main>
    </div>
  )
}

export default App
