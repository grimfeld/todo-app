import { Filters } from '../types'

export default function FilterBar ({ filter, changeFilter }: { filter: Filters, changeFilter (f: Filters): void }) {
  return (
    <div className="flex items-center justify-center p-4 rounded bgBlocks grayTexts">
      <p onClick={() => changeFilter('all')} className={["cursor-pointer font-bold", filter === "all" ? 'text-primary' : ''].join(' ')}>All</p>
      <p onClick={() => changeFilter('active')} className={["cursor-pointer font-bold mx-4", filter === "active" ? 'text-primary' : ''].join(' ')}>Active</p>
      <p onClick={() => changeFilter('completed')} className={["cursor-pointer font-bold", filter === "completed" ? 'text-primary' : ''].join(' ')}>Completed</p>
    </div>
  )
}