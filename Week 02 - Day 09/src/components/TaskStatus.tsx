import React from 'react';

import type { Task } from '../types';

export default function TaskStatus({ task }: { task: Task }) {
  const getStatusBadge = (status: Task['status']) => {
    const statusStyles = {
      to_do: 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-800 border-gray-200/50 shadow-gray-100',
      in_progress: 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-800 border-blue-200/50 shadow-blue-100',
      done: 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-200/50 shadow-green-100',
    };

    const statusLabels = {
      to_do: 'To Do',
      in_progress: 'In Progress',
      done: 'Done',
    };

    const statusIcons = {
      to_do: '◯',
      in_progress: '◐',
      done: '●',
    };

    return (
      <span
        className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold border-2 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 ${statusStyles[status]}`}
      >
        <span className="mr-1.5 text-sm">{statusIcons[status]}</span>
        {statusLabels[status]}
      </span>
    );
  };
  return <React.Fragment>{getStatusBadge(task.status)}</React.Fragment>;
}