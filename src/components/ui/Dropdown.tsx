import React, { useState } from 'react';
import { Button, buttonVariants } from './button';
import TaskCard from '../TaskCard';
import { ChevronDown } from 'lucide-react';
import { tasks } from '@/files/file';

interface DropdownProps {
  triggerText: string;
}

const Dropdown: React.FC<DropdownProps> = ({ triggerText }) => {
  const [isOpen, setIsOpen] = useState(true);

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
        <span className="">
          {triggerText}
          <ChevronDown className={`w-5 h-5 ml-2 inline-block align-middle transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
        </span>
        </div>
      </Button>
      <div
        className={`absolute top-8 left-0 w-full p-4 bg-white transition-all duration-300 ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        {tasks && tasks.length !== 0 ? (
          <TaskCard />
        ) : (
          <div className='flex justify-center'>
          <p className='text-2xl text-muted-foreground'>Está vacío por ahora.
            <span className='flex justify-center'>
              :(
            </span>
          </p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;