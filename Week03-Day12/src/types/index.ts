// Global types for the project

export interface Task {
  id?: number | string;
  title: string;
  start_date: Date;
  due_date?: Date;
  description?: string;
  status: 'to_do' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee_id?: number;
  completed_date?: Date;
  created_time: Date;
  updated_time: Date;
}

export interface Filter {
  [key: string]: any;
}
