'use client'
import React, { useState, useEffect } from 'react';
import Wrapper from '@/components/Wrapper';
import CreateTask from '@/components/CreateTask';
import Dropdown from '@/components/ui/Dropdown';
import { Task } from '@/files/file';
import fetchTasks, { deleteTask, markTaskAsComplete, markTaskAsIncomplete } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      const fetchedTasks = await fetchTasks();
      setTasks(fetchedTasks);
    };

    getTasks();
  }, []);

  const handleTaskCreated = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdate = (updatedTask: Task) => {
    setTasks(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
  };

  const handleToggleComplete = async (id: number) => {
    const task = tasks.find(task => task.id === id);
    if (!task) return;

    const newCompletedStatus = !task.completed;
    try {
      const updatedTask = newCompletedStatus
        ? await markTaskAsComplete(id)
        : await markTaskAsIncomplete(id);
      handleUpdate(updatedTask);
    } catch (error) {
      console.error('Error updating task completion:', error);
    }
  };

  return (
    <Wrapper>
      <main className="mx-auto max-w-7xl md:p-10">
        <div className="mt-8 flex flex-col items-start justify-between gap-4 pb-5 sm:flex-row sm:items-center sm:gap-0">
          <h1 className="mb-3 font-semibold text-5xl text-gray-900">
            Mis Tareas
          </h1>
          <div>
            <CreateTask onTaskCreated={handleTaskCreated} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Dropdown tasks={tasks} triggerText="Todas las tareas" priority="all" onDelete={handleDelete} onUpdate={handleUpdate} onToggleComplete={handleToggleComplete} showCompleted={false} />
          <Dropdown tasks={tasks} triggerText="Prioridad Alta" priority="high" onDelete={handleDelete} onUpdate={handleUpdate} onToggleComplete={handleToggleComplete} showCompleted={false} />
          <Dropdown tasks={tasks} triggerText="Prioridad Baja" priority="low" onDelete={handleDelete} onUpdate={handleUpdate} onToggleComplete={handleToggleComplete} showCompleted={false} />
          <Dropdown tasks={tasks} triggerText="Completadas" priority="all" onDelete={handleDelete} onUpdate={handleUpdate} onToggleComplete={handleToggleComplete} showCompleted={true} />
        </div>
      </main>
    </Wrapper>
  );
};

export default Dashboard;