import { CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Task } from '@/types/task'
import { isToday, isTomorrow, isPast } from 'date-fns'

interface TaskStatsProps {
  tasks: Task[]
}

export const TaskStats = ({ tasks }: TaskStatsProps) => {
  const completedTasks = tasks.filter(task => task.completed)
  const pendingTasks = tasks.filter(task => !task.completed)
  const overdueTasks = pendingTasks.filter(task => task.dueDate && isPast(task.dueDate))
  const dueTodayTasks = pendingTasks.filter(task => task.dueDate && isToday(task.dueDate))
  const dueTomorrowTasks = pendingTasks.filter(task => task.dueDate && isTomorrow(task.dueDate))

  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0

  const priorityStats = {
    high: pendingTasks.filter(task => task.priority === 'high').length,
    medium: pendingTasks.filter(task => task.priority === 'medium').length,
    low: pendingTasks.filter(task => task.priority === 'low').length
  }

  const subjectStats = pendingTasks.reduce((acc, task) => {
    acc[task.subject] = (acc[task.subject] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const topSubjects = Object.entries(subjectStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)

  return (
    <div className="space-y-4">
      {/* Completion Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <Progress value={completionRate} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                {completedTasks.length} of {tasks.length} completed
              </span>
              <span className="font-medium">
                {Math.round(completionRate)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-success" />
            <div>
              <div className="text-lg font-bold">{completedTasks.length}</div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
        </Card>

        <Card className="p-3">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <div>
              <div className="text-lg font-bold">{pendingTasks.length}</div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Urgent Tasks */}
      {(overdueTasks.length > 0 || dueTodayTasks.length > 0 || dueTomorrowTasks.length > 0) && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              Urgent Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {overdueTasks.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-destructive">Overdue</span>
                <Badge variant="destructive">{overdueTasks.length}</Badge>
              </div>
            )}
            {dueTodayTasks.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-warning">Due Today</span>
                <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                  {dueTodayTasks.length}
                </Badge>
              </div>
            )}
            {dueTomorrowTasks.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Due Tomorrow</span>
                <Badge variant="outline">{dueTomorrowTasks.length}</Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Priority Breakdown */}
      {pendingTasks.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Priority Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {priorityStats.high > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-priority-high"></div>
                  High Priority
                </span>
                <Badge variant="outline" className="bg-priority-high/10 text-priority-high border-priority-high/20">
                  {priorityStats.high}
                </Badge>
              </div>
            )}
            {priorityStats.medium > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-priority-medium"></div>
                  Medium Priority
                </span>
                <Badge variant="outline" className="bg-priority-medium/10 text-priority-medium border-priority-medium/20">
                  {priorityStats.medium}
                </Badge>
              </div>
            )}
            {priorityStats.low > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-priority-low"></div>
                  Low Priority
                </span>
                <Badge variant="outline" className="bg-priority-low/10 text-priority-low border-priority-low/20">
                  {priorityStats.low}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Top Subjects */}
      {topSubjects.length > 0 && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Subjects</CardTitle>
          </CardHeader>
          <CardContent className="pt-0 space-y-2">
            {topSubjects.map(([subject, count]) => (
              <div key={subject} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{subject}</span>
                <Badge variant="secondary">{count}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}