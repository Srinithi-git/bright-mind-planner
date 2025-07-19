import { useState } from 'react'
import { Calendar, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Task, Priority, TaskFormData } from '@/types/task'

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void
  onCancel: () => void
  initialData?: Task | null
  isEditing?: boolean
}

const subjects = [
  'Mathematics',
  'Computer Science',
  'Physics',
  'Chemistry',
  'Biology',
  'Literature',
  'History',
  'Economics',
  'Psychology',
  'Engineering',
  'Other'
]

export const TaskForm = ({ onSubmit, onCancel, initialData, isEditing }: TaskFormProps) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    subject: initialData?.subject || '',
    priority: initialData?.priority || 'medium',
    dueDate: initialData?.dueDate || undefined
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.subject) return
    
    onSubmit(formData)
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'high': return 'text-priority-high'
      case 'medium': return 'text-priority-medium'
      case 'low': return 'text-priority-low'
      default: return 'text-muted-foreground'
    }
  }

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-card to-card/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">
          {isEditing ? 'Edit Task' : 'Add New Task'}
        </CardTitle>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onCancel}
          className="h-8 w-8 p-0"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter task title..."
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select 
                value={formData.subject} 
                onValueChange={(value) => setFormData({...formData, subject: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subject..." />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Enter task description..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value: Priority) => setFormData({...formData, priority: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-priority-high"></div>
                      High Priority
                    </span>
                  </SelectItem>
                  <SelectItem value="medium">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-priority-medium"></div>
                      Medium Priority
                    </span>
                  </SelectItem>
                  <SelectItem value="low">
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-priority-low"></div>
                      Low Priority
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate ? formData.dueDate.toISOString().split('T')[0] : ''}
                onChange={(e) => setFormData({
                  ...formData, 
                  dueDate: e.target.value ? new Date(e.target.value) : undefined
                })}
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              {isEditing ? 'Update Task' : 'Add Task'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}