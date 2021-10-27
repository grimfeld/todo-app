import crossIcon from '../images/icon-cross.svg'
import checkIcon from '../images/icon-check.svg'
import { Todo } from '../types'

export default function TodoCard ({ todo, switchTodoStatus, deleteTodo }: { todo: Todo, switchTodoStatus (id: string): void, deleteTodo (id: string): void }) {
  return (
    <div key={todo.id} className="flex items-center justify-between p-4 border-b border-gray-blue-200 dark:border-gray-blue-900">
      <label htmlFor={todo.id} className="grid w-6 h-6 border rounded-full cursor-pointer border-gray-blue-200 dark:border-gray-blue-900 place-items-center" style={{ background: todo.status === 'completed' ? 'linear-gradient(135deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))' : '' }}>{todo.status === "completed" && <img src={checkIcon} alt="Completed" />}</label>
      <input onClick={() => switchTodoStatus(todo.id)} name="status" id={todo.id} type="checkbox" defaultChecked={todo.status === 'completed'} className="hidden cursor-pointer" />
      <p className={["flex-grow ml-4 ", todo.status === "completed" ? "text-gray-blue-400 dark:text-gray-blue-600 line-through" : 'text-gray-blue-700 dark:text-gray-blue-400'].join(' ')}>{todo.description}</p>
      <img src={crossIcon} onClick={() => deleteTodo(todo.id)} alt="Delete todo" className="w-3 cursor-pointer" />
    </div>
  )
}