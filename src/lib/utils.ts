import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';
import { Task } from "@/files/file";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get('http://localhost:3000/task');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`http://localhost:3000/task/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const updateTask = async (id: number, data: Partial<Omit<Task, 'id'>>): Promise<Task> => {
  try {
    const response = await axios.put(`http://localhost:3000/task/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export default fetchTasks;

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  try {
    const response = await axios.post('http://localhost:3000/task', task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};