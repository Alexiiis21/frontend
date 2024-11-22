export type Task = {
    id: number;
    title: string;
    description: string;
    date: Date;
    priority: Priority
    completed: boolean;
  };

  export type Priority = "high" | "low" | "default" ;
  
  