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
      if (e.currentTarget.value === '') return
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
    <div className={theme}>
      <div className='flex flex-col h-screen bg-background-200 dark:bg-background-900'>
        <header className='grid py-16 place-items-center' style={{ backgroundImage: `url(${theme === "light" ? lightBg : darkBg})`, backgroundPosition: "center", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <div className="flex flex-col items-center w-full max-w-3xl px-8">
            <nav className="flex items-center justify-between w-full">
              <h1 className="text-3xl font-bold tracking-widest text-white">TODO</h1>
              <img src={theme === "light" ? moonIcon : sunIcon} className="cursor-pointer" alt="Theme Toggler" onClick={switchTheme} />
            </nav>
            <input type="text" placeholder="Create a new todo..." className="w-full p-4 mt-8 rounded shadow-lg outline-none bg-background-100 dark:bg-background-800 placeholder-gray-blue-500 dark:placeholder-gray-blue-600 text-gray-blue-700 dark:text-gray-blue-400" onKeyPress={(e) => handleKeyPress(e)} />
          </div>
        </header>
        <main className="flex-grow w-full max-w-3xl px-8 m-auto">
          <div className="rounded bg-background-100 dark:bg-background-800" style={{ transform: 'translateY(-25px)' }}>
            {todos.filter(todo => filter === 'completed' ? todo.status === 'completed' : filter === 'active' ? todo.status === 'active' : todo).map(todo => (
              <div key={todo.id} className="flex items-center justify-between p-4 border-b border-gray-blue-200 dark:border-gray-blue-900">
                <label htmlFor={todo.id} className="grid w-6 h-6 border rounded-full cursor-pointer border-gray-blue-200 dark:border-gray-blue-900 place-items-center" style={{ background: todo.status === 'completed' ? 'linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))' : '' }}>{todo.status === "completed" && <img src={checkIcon} alt="Completed" />}</label>
                <input onClick={() => switchTodoStatus(todo.id)} name="status" id={todo.id} type="checkbox" checked={todo.status === 'completed'} className="hidden cursor-pointer" />
                <p className={["flex-grow ml-4 ", todo.status === "completed" ? "text-gray-blue-400 dark:text-gray-blue-600 line-through" : 'text-gray-blue-700 dark:text-gray-blue-400'].join(' ')}>{todo.description}</p>
                <img src={crossIcon} onClick={() => deleteTodo(todo.id)} alt="Delete todo" className="w-3 cursor-pointer" />
              </div>
            ))}
            <div className="flex justify-between p-4 text-gray-blue-500 dark:text-gray-blue-600">
              <p>{todos.filter(todo => filter === 'completed' ? todo.status === 'completed' : filter === 'active' ? todo.status === 'active' : todo).length} item{todos.filter(todo => filter === 'completed' ? todo.status === 'completed' : filter === 'active' ? todo.status === 'active' : todo).length === 1 ? '' : 's'} left</p>
              <p className="cursor-pointer" onClick={clearCompleted}>Clear Completed</p>
            </div>
          </div>
          <div className="flex items-center justify-center p-4 rounded bg-background-100 dark:bg-background-800 text-gray-blue-500 dark:text-gray-blue-600">
            <p onClick={() => switchFilter('all')} className={["cursor-pointer font-bold", filter === "all" ? 'text-primary' : ''].join(' ')}>All</p>
            <p onClick={() => switchFilter('active')} className={["cursor-pointer font-bold mx-4", filter === "active" ? 'text-primary' : ''].join(' ')}>Active</p>
            <p onClick={() => switchFilter('completed')} className={["cursor-pointer font-bold", filter === "completed" ? 'text-primary' : ''].join(' ')}>Completed</p>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
