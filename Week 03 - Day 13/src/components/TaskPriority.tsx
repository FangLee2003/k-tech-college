import React from 'react';

import type { Task } from '../types';

type Props = {
  priority: 'low' | 'medium' | 'high';
};

export default function TaskPriority({ priority }: Props) {
  const getPriorityBadge = (priority: Task['priority']) => {
    const priorityStyles = {
      low: 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-200/50 shadow-green-100',
      medium: 'bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-800 border-yellow-200/50 shadow-yellow-100',
      high: 'bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-red-200/50 shadow-red-100',
    };

    const priorityLabels = {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
    };

    const priorityIcons = {
      low: '○',
      medium: '◐',
      high: '●',
    };

    return (
      <span
        className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold border-2 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 ${priorityStyles[priority]}`}
      >
        <span className="mr-1.5 text-sm">{priorityIcons[priority]}</span>
        {priorityLabels[priority]}
      </span>
    );
  };

  return <React.Fragment>{getPriorityBadge(priority)}</React.Fragment>;
}