import { Plus, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface StudyPlannerHeaderProps {
  onAddTask: () => void
  tasksCount: number
}

export const StudyPlannerHeader = ({ onAddTask, tasksCount }: StudyPlannerHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-primary-foreground">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl">
              <BookOpen className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Study Planner</h1>
              <p className="text-primary-foreground/80">
                Organize your college projects and assignments
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold">{tasksCount}</div>
              <div className="text-sm text-primary-foreground/80">
                {tasksCount === 1 ? 'Task' : 'Tasks'}
              </div>
            </div>
            <Button 
              onClick={onAddTask}
              variant="secondary"
              className="bg-white/20 hover:bg-white/30 border-white/30"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}