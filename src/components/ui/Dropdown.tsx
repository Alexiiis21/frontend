import React, { useState, useEffect } from 'react';
import { Button, buttonVariants } from './button';
import TaskCard from '../TaskCard';
import { ChevronDown } from 'lucide-react';
import { Task, Priority } from '@/files/file';

interface DropdownProps {
  triggerText: string;
  priority: Priority | 'all';
  tasks: Task[];
  onDelete: (id: number) => void;
  onUpdate: (task: Task) => void;
  onToggleComplete: (id: number) => void;
  showCompleted?: boolean; // Nueva propiedad
}

const Dropdown: React.FC<DropdownProps> = ({ triggerText, priority, tasks, onDelete, onUpdate, onToggleComplete, showCompleted }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    let filtered = tasks;

    if (priority !== 'all') {
      filtered = filtered.filter(task => task.priority === priority);
    }

    if (showCompleted !== undefined) {
      filtered = filtered.filter(task => task.completed === showCompleted);
    }

    setFilteredTasks(filtered);
  }, [priority, tasks, showCompleted]);

  const sortedTasks = filteredTasks.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={buttonVariants({
          variant: "secondary",
          className: 'text-2xl font-normal bg-white flex items-center justify-between hover:bg-white'
        })}
      >
        <div className='flex items-center justify-center'>
          <span className="flex items-center">
            {triggerText}
            <ChevronDown className={`w-5 h-5 ml-2 inline-block align-middle transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
          </span>
        </div>
      </Button>
      <div
        className={` bg-white transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="mt-0">
          {filteredTasks && filteredTasks.length !== 0 ? (
            <ul className='grid grid-cols-1 w-full gap-6 md:grid-cols-2 lg:grid-cols-2'>
              {sortedTasks.map(task => (
                <TaskCard key={task.id} task={task} onDelete={onDelete} onUpdate={onUpdate} onToggleComplete={onToggleComplete} />
              ))}
            </ul>
          ) : (
            <div className='flex justify-center'>
              <p className='text-2xl text-muted-foreground'>Está vacío por ahora.
                <span className='flex justify-center'>:(</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;

