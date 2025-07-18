import React from 'react';
import { Suspense } from 'react';
import Link from 'next/link';
import TaskManagementLayout from '../layout';
import { getTasks } from '@/services';
import Loading from '@/app/loading';

// Thời gian revalidate cho danh sách task
export const revalidate = 60;

// Server Component cho Task Selection
async function TaskSelection() {
  const tasks = await getTasks();

  return (
    <>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
            <span className="text-white font-bold text-xl">🔄</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              ISR Task Selection
            </h1>
            <p className="text-gray-600 mt-1">
              Choose a task to view with Incremental Static Regeneration
            </p>
            <p className="text-xs text-teal-600 mt-1">
              List revalidates every {revalidate} seconds
            </p>
          </div>
        </div>
      </div>

      {/* Task Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <Link 
            href={`/task-isr/${task.id}`}
            key={task.id}
            className="block"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-teal-300 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
                <span className={`px-2 py-1 rounded text-xs ${
                  task.status === 'done'
                    ? 'bg-green-100 text-green-800'
                    : task.status === 'in_progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                }`}>
                  {task.status?.replace('_', ' ')}
                </span>
              </div>
              {task.description && (
                <p className="text-gray-600 text-sm line-clamp-2">
                  {task.description}
                </p>
              )}
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs text-gray-500">ID: {task.id}</span>
                <span className="text-teal-600 text-sm">View Details →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="mr-2">💡</span>
          <span>Click on any task to view its details with ISR. Each task page will be statically generated and revalidated every {revalidate} seconds.</span>
        </div>
      </div>
    </>
  );
}

// Main ISR Selection Page
export default async function ISRSelectionPage() {
  return (
    <TaskManagementLayout>
      <Suspense fallback={<Loading />}>
        <TaskSelection />
      </Suspense>
    </TaskManagementLayout>
  );
}
