import React, { useState } from 'react';
import { Button } from './ui/button';
import { Pencil, Trash } from 'lucide-react';
import { Checkbox } from './ui/checkbox';
import { Task } from '@/files/file';
import { format } from "date-fns";
import { es } from "date-fns/locale";
import EditTask from './EditTask';

interface TaskCardProps {
  task: Task;
  onDelete: (id: number) => void;
  onUpdate: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onUpdate }) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(task.completed);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const handleCheckboxChange = () => {
    setIsCompleted(!isCompleted);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-gradient-to-r from-red-300 to-red-700';
      case 'low':
        return 'bg-gradient-to-r from-blue-300 to-primary';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-700';
    }
  };

  const handleEditClick = () => {
    setIsEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <li className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'>
      <div className='flex flex-col gap-2'>
        <div className='pt-6 px-6 flex w-full items-center justify-between space-x-6'>
          <div className={`h-10 w-10 flex-shrink-0 rounded-full ${getPriorityColor(task.priority)}`} />
          <div className='flex-1 truncate'>
            <div className='flex items-center space-x-3'>
              <h3 className={`truncate text-lg font-medium text-zinc-900 ${isCompleted ? 'line-through' : ''}`}>
                {task.title}
              </h3>
            </div>
            <div className="flex justify-start">
              <p className={`whitespace-normal ${isCompleted ? 'line-through' : ''}`}>
                {task.description}
              </p>
            </div>
            <p className={`text-zinc-500 whitespace-normal ${isCompleted ? 'line-through' : ''}`}>
              {format(new Date(task.date), "PPPPP", { locale: es })}
            </p>
          </div>
        </div>
      </div>

      <div className='px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500'>
        <div className='flex items-center gap-2'>
          <Checkbox id="completed" checked={isCompleted} onChange={handleCheckboxChange} />
          <label
            htmlFor="completed"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Completar
          </label>
        </div>

        <div className='flex items-center gap-2'>
          <Button variant="outline" onClick={handleEditClick}>
            <Pencil className='h-4 w-4' />
            Editar
          </Button>
        </div>

        <Button
          onClick={() => onDelete(task.id)}
          size='sm'
          className='w-full'
          variant='destructive'>
          <Trash className='h-4 w-4' />
        </Button>
      </div>

      {isEditDialogOpen && (
        <EditTask
          task={task}
          onTaskUpdated={onUpdate}
          onClose={handleEditClose}
        />
      )}
    </li>
  );
};

export default TaskCard;