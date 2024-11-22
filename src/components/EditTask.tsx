import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";
import { SelectDate } from "./SelectDate";
import { Task, Priority } from '@/files/file';
import { updateTask } from "@/lib/utils";

interface EditTaskProps {
  task: Task;
  onTaskUpdated: (task: Task) => void;
  onClose: () => void;
}

const EditTask: React.FC<EditTaskProps> = ({ task, onTaskUpdated, onClose }) => {
  const [taskName, setTaskName] = useState(task.title);
  const [taskDescription, setTaskDescription] = useState(task.description);
  const [taskPriority, setTaskPriority] = useState<Priority>(task.priority);
  const [taskDate, setTaskDate] = useState<Date | undefined>(new Date(task.date));
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState<Priority | null>(task.priority);

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

  const handleUpdateTask = async () => {
    if (!taskName || !taskDate) return;

    const updatedTask = {
      ...task,
      title: taskName,
      description: taskDescription,
      date: taskDate!,
      priority: taskPriority,
    };

    const result = await updateTask(task.id, updatedTask);
    if (result) {
      onTaskUpdated(updatedTask);
      onClose(); // Cierra el Dialog al actualizar una tarea
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Editar tarea</DialogTitle>
          <DialogDescription>
            Edita la tarea y personaliza a tu gusto.
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
            <Label htmlFor="date" className="text-right flex" />
            <div>
              <SelectDate onDateSelect={handleTaskDateChange} initialDate={taskDate}/>
            </div>
          </div>
          <div className="flex justify-center mt-4 mb-0">
            <Button onClick={handleUpdateTask} className="bg-blue-500 text-white">
              Actualizar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTask;