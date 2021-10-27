import { useEffect, useState } from 'react'
import './App.css'
import moonIcon from "./images/icon-moon.svg"
import sunIcon from "./images/icon-sun.svg"
import lightBg from "./images/bg-desktop-light.jpg"
import darkBg from "./images/bg-desktop-dark.jpg"
import FilterBar from './components/FilterBar'
import { Filters } from './types'
import TodoCard from './components/TodoCard'

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
    if (e.key !== 'Enter') return
    if (e.currentTarget.value === '') return
    addTodo(e.currentTarget.value)
    e.currentTarget.value = ""
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

  const [filter, setFilter] = useState<Filters>('all')

  const [filteredTodos, setFilteredTodos] = useState<Array<Todo>>([])

  useEffect(() => {
    setFilteredTodos(todos.filter(todo => filter === 'completed' ? todo.status === 'completed' : filter === 'active' ? todo.status === 'active' : todo))
  }, [filter, todos])

  return (
    <div className={theme}>
      <div className='flex flex-col h-screen bg-background-200 dark:bg-background-900'>
        <header className='grid py-16 place-items-center' style={{ backgroundImage: `url(${theme === "light" ? lightBg : darkBg})`, backgroundPosition: "center", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <div className="flex flex-col items-center w-full max-w-3xl px-8">
            <nav className="flex items-center justify-between w-full">
              <h1 className="text-3xl font-bold tracking-widest text-white">TODO</h1>
              <img src={theme === "light" ? moonIcon : sunIcon} className="cursor-pointer" alt="Theme Toggler" onClick={switchTheme} />
            </nav>
            <input type="text" placeholder="Create a new todo..." className="w-full p-4 mt-8 rounded shadow-lg outline-none bgBlocks placeholder-gray-blue-500 dark:placeholder-gray-blue-600 text-gray-blue-700 dark:text-gray-blue-400" onKeyPress={(e) => handleKeyPress(e)} />
          </div>
        </header>
        <main className="flex-grow w-full max-w-3xl px-8 m-auto">
          <div className="rounded bgBlocks" style={{ transform: 'translateY(-25px)' }}>
            {filteredTodos.map(todo => <TodoCard todo={todo} switchTodoStatus={switchTodoStatus} deleteTodo={deleteTodo} />)}
            <div className="flex justify-between p-4 grayTexts">
              <p>{filteredTodos.length} item{filteredTodos.length === 1 ? '' : 's'} left</p>
              <p className="cursor-pointer" onClick={clearCompleted}>Clear Completed</p>
            </div>
          </div>
          <FilterBar filter={filter} changeFilter={setFilter} />
        </main>
      </div>
    </div>
  )
}

export default App
