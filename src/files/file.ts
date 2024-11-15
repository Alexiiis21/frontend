type Task = {
    id: number;
    name: string;
    description: string;
    date: Date;
    priority: Priority
    completed: boolean;
  };

  type Priority = "alta" | "media" | "baja";
  
  export const tasks: Task[] = [
    {
      id: 1,
      name: "Tarea 1",
      description: "Primera tarea",
      date: new Date(2024, 11, 2, 21),
      priority: "alta",
      completed: false
    },
    {
      id: 2,
      name: "Tarea 2",
      description: "Segunda tarea",
      date: new Date(2024, 11, 15, 0),
      priority: "media",
      completed: true
    },
  ];