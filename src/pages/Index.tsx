import { useState } from 'react'
import { StudyPlannerHeader } from '@/components/StudyPlannerHeader'
import { TaskForm } from '@/components/TaskForm'
import { TaskList } from '@/components/TaskList'
import { TaskStats } from '@/components/TaskStats'
import { Task, Priority } from '@/types/task'

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const addTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    const newTask: Task = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date()
    }
    setTasks([...tasks, newTask])
    setIsFormOpen(false)
  }

  const updateTask = (taskData: Omit<Task, 'id' | 'completed' | 'createdAt'>) => {
    if (!editingTask) return
    
    setTasks(tasks.map(task => 
      task.id === editingTask.id 
        ? { ...task, ...taskData }
        : task
    ))
    setEditingTask(null)
    setIsFormOpen(false)
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, completed: !task.completed }
        : task
    ))
  }

  const startEdit = (task: Task) => {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  const cancelEdit = () => {
    setEditingTask(null)
    setIsFormOpen(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <StudyPlannerHeader 
          onAddTask={() => setIsFormOpen(true)}
          tasksCount={tasks.length}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {isFormOpen && (
              <TaskForm
                onSubmit={editingTask ? updateTask : addTask}
                onCancel={cancelEdit}
                initialData={editingTask}
                isEditing={!!editingTask}
              />
            )}
            
            <TaskList
              tasks={tasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={startEdit}
            />
          </div>
          
          <div className="lg:col-span-1">
            <TaskStats tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
