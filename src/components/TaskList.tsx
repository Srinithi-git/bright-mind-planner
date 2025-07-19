import { format, isToday, isTomorrow, isPast } from 'date-fns'
import { Check, Clock, Edit, Trash2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Task, Priority } from '@/types/task'
import { cn } from '@/lib/utils'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (task: Task) => void
}

export const TaskList = ({ tasks, onToggle, onDelete, onEdit }: TaskListProps) => {
  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'bg-priority-high/10 text-priority-high border-priority-high/20'
      case 'medium': return 'bg-priority-medium/10 text-priority-medium border-priority-medium/20'
      case 'low': return 'bg-priority-low/10 text-priority-low border-priority-low/20'
    }
  }

  const getPriorityDot = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'bg-priority-high'
      case 'medium': return 'bg-priority-medium'
      case 'low': return 'bg-priority-low'
    }
  }

  const formatDueDate = (date: Date) => {
    if (isToday(date)) return 'Today'
    if (isTomorrow(date)) return 'Tomorrow'
    return format(date, 'MMM dd, yyyy')
  }

  const isDueSoon = (date: Date) => {
    return isToday(date) || isTomorrow(date)
  }

  const groupedTasks = {
    pending: tasks.filter(task => !task.completed),
    completed: tasks.filter(task => task.completed)
  }

  if (tasks.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
          <p className="text-muted-foreground">
            Add your first study task to get started with your academic planning!
          </p>
        </CardContent>
      </Card>
    )
  }

  const TaskItem = ({ task }: { task: Task }) => (
    <Card className={cn(
      "transition-all duration-200 hover:shadow-md",
      task.completed && "opacity-75"
    )}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggle(task.id)}
            className={cn(
              "mt-1 h-5 w-5 p-0 rounded-full border-2 transition-colors",
              task.completed 
                ? "bg-success border-success text-success-foreground" 
                : "border-muted-foreground/30 hover:border-primary"
            )}
          >
            {task.completed && <Check className="h-3 w-3" />}
          </Button>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <h3 className={cn(
                  "font-semibold leading-tight",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                    {task.description}
                  </p>
                )}
              </div>

              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(task)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(task.id)}
                  className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Badge variant="secondary" className="text-xs">
                {task.subject}
              </Badge>
              
              <Badge 
                variant="outline" 
                className={cn("text-xs capitalize", getPriorityColor(task.priority))}
              >
                <div className={cn("w-1.5 h-1.5 rounded-full mr-1", getPriorityDot(task.priority))} />
                {task.priority}
              </Badge>

              {task.dueDate && (
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs",
                    isPast(task.dueDate) && !task.completed && "bg-destructive/10 text-destructive border-destructive/20",
                    isDueSoon(task.dueDate) && !isPast(task.dueDate) && "bg-warning/10 text-warning border-warning/20"
                  )}
                >
                  {isPast(task.dueDate) && !task.completed ? (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  ) : (
                    <Clock className="w-3 h-3 mr-1" />
                  )}
                  {formatDueDate(task.dueDate)}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {groupedTasks.pending.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Pending Tasks ({groupedTasks.pending.length})
          </h2>
          <div className="space-y-3">
            {groupedTasks.pending.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {groupedTasks.completed.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Check className="h-5 w-5 text-success" />
            Completed Tasks ({groupedTasks.completed.length})
          </h2>
          <div className="space-y-3">
            {groupedTasks.completed.map(task => (
              <TaskItem key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}