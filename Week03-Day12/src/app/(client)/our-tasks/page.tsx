'use client';

import React from 'react';
import TaskList from '@/components/TaskList';
import Loading from '@/components/Loading';
import { useEffect, useState } from 'react';
import { getTasks } from '@/services';
import type { Task } from '@/types';

const OurTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTasks()
      .then(setTasks)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  return <TaskList tasks={tasks} />;
};

export default OurTasks;
