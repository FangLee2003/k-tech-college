import React from 'react';
import TaskList from '../../../components/TaskList';
import Loading from '../../../components/Loading';
import { useEffect, useState } from 'react';
import { getTasksByAssignee } from '../../../services';
import type { Task } from '../../../types';

const MyTasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  // TODO: Replace with actual user id from auth context
  const userId = 1;

  useEffect(() => {
    setLoading(true);
    getTasksByAssignee(userId)
      .then(setTasks)
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <Loading />;
  return <TaskList tasks={tasks} />;
};

export default MyTasks;
