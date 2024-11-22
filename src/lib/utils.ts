import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import axios from 'axios';
import { Task } from "@/files/file";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await axios.get('https://nestjs-prisma-test-production.up.railway.app/task');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const deleteTask = async (id: number): Promise<void> => {
  try {
    await axios.delete(`https://nestjs-prisma-test-production.up.railway.app/task/${id}`);
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const updateTask = async (id: number, data: Partial<Omit<Task, 'id'>>): Promise<Task> => {
  try {
    const response = await axios.put(`https://nestjs-prisma-test-production.up.railway.app/task/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export default fetchTasks;

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  try {
    const response = await axios.post('https://nestjs-prisma-test-production.up.railway.app/task', task);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const markTaskAsComplete = async (id: number): Promise<Task> => {
  try {
    const response = await axios.put(`https://nestjs-prisma-test-production.up.railway.app/task/${id}/complete`);
    return response.data;
  } catch (error) {
    console.error('Error marking task as complete:', error);
    throw error;
  }
};

export const markTaskAsIncomplete = async (id: number): Promise<Task> => {
  try {
    const response = await axios.put(`https://nestjs-prisma-test-production.up.railway.app/task/${id}/incomplete`);
    return response.data;
  } catch (error) {
    console.error('Error marking task as incomplete:', error);
    throw error;
  }
};