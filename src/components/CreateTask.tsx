import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { SelectDate } from "./SelectDate";
import { createTask } from '@/lib/utils';
import { Task, Priority } from '@/files/file';
import { toast } from 'react-toastify';

interface CreateTaskProps {
  onTaskCreated: (task: Task) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ onTaskCreated }) => {
  const [taskName, setTaskName] = useState("Sin título");
  const [taskDescription, setTaskDescription] = useState("Sin descripción");
  const [taskPriority, setTaskPriority] = useState<Priority>("default");
  const [taskDate, setTaskDate] = useState<Date | undefined>();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleTaskNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleTaskDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTaskDescription(e.target.value);
  };

  const handleTaskPriorityChange = (priority: Priority) => {
    setTaskPriority(priority);
    setSelectedPriority(priority);
    setIsPopoverOpen(false); // Cierra el Popover al seleccionar una prioridad
  };

  const handleTaskDateChange = (date: Date | undefined) => {
    setTaskDate(date);
  };

  const handleCreateTask = async () => {
    const defaultName = "Sin título";
    const defaultDescription = "Sin descripción";
    const defaultPriority: Priority = "low";
    const defaultDate = new Date();

    const newTask = {
      title: taskName || defaultName,
      description: taskDescription || defaultDescription,
      date: taskDate || defaultDate,
      priority: taskPriority || defaultPriority,
      completed: false,
    };

    const createdTask = await createTask(newTask);
    if (createdTask) {
      onTaskCreated(createdTask);
      setTaskName(defaultName);
      setTaskDescription(defaultDescription);
      setTaskPriority(defaultPriority);
      setTaskDate(undefined);
      setSelectedPriority(null);
      setIsDialogOpen(false);
      toast.success("Tarea creada exitosamente.");
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="p-6 text-md">Añadir tarea <Plus className='h-4 w-4'/></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] ">
          <DialogHeader>
            <DialogTitle>Agregar tarea</DialogTitle>
            <DialogDescription>
              Añade una nueva tarea y personaliza a tu gusto.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                value={taskName}
                className="col-span-3"
                onChange={handleTaskNameChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Textarea
                id="description"
                value={taskDescription}
                className="col-span-3"
                onChange={handleTaskDescriptionChange}
              />
            </div>
            <div className="flex justify-between items-center gap-4">
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="flex items-center ml-1">
                    Prioridad
                    {selectedPriority === 'high' && <div className="rounded-full bg-red-600 w-[13px] h-[13px] mr-2" />}
                    {selectedPriority === 'low' && <div className="rounded-full bg-primary w-[13px] h-[13px] mr-2" />}
                    {selectedPriority === null && <div className="rounded-full bg-gray-300 w-[13px] h-[13px] mr-2" />}
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => handleTaskPriorityChange("high")}
                      className={buttonVariants({
                        variant: "secondary",
                        className: "hover:bg-zinc-200 flex items-center  w-40",
                      })}
                    >
                      <span>Prioridad alta</span>
                      <div className="rounded-full bg-red-600 w-[13px] h-[13px]" />
                    </Button>
                    <Button
                      onClick={() => handleTaskPriorityChange("low")}
                      className={buttonVariants({
                        variant: "secondary",
                        className: "hover:bg-zinc-200 flex items-center w-40",
                      })}
                    >
                      <span>Prioridad baja</span>
                      <div className="rounded-full bg-primary w-[13px] h-[13px]" />
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              <Label htmlFor="date" className="text-right flex mr-10" />
              <div>
                <SelectDate onDateSelect={handleTaskDateChange}/>
              </div>
            </div>
            <div className="flex justify-center mt-4 mb-0">
              <Button onClick={handleCreateTask} className="bg-blue-500 text-white">
                Crear 
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTask;