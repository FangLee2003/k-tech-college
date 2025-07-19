import React from 'react';
import { Suspense } from 'react';
import TaskManagementLayout from '../layout';
import TaskListWrapper from '@/components/TaskListWrapper';
import { getTasks } from '@/services/tasks';
// import type { Task } from '@/types';
import Loading from '@/app/loading';

// Server Component cho Task Content với SSG
async function TaskContent() {
  // Fetch tasks at build time
  const tasks = await getTasks();
  const buildTime = new Date().toISOString();

  return (
    <>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
            <span className="text-white font-bold text-xl">📥</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Static Site Generation (SSG)
            </h1>
            <p className="text-gray-600 mt-1">
              Pre-rendered at build time
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Generated at: {new Date(buildTime).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Task List Section */}
      <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <section className="bg-gradient-to-r from-gray-50 to-purple-50 px-6 py-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <span className="mr-3">📝</span>
                Static Tasks
              </h2>
              <p className="text-gray-600 mt-2 flex items-center">
                <span className="mr-2">📊</span>
                Pre-rendered task list
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-gray-200">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  <span className="text-sm font-medium text-gray-700">
                    {tasks.length} tasks
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="p-6">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-4 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-2">💡</span>
              <span>These tasks are statically generated at build time</span>
            </div>
          </div>
          <TaskListWrapper tasks={tasks} />
        </section>
      </section>
    </>
  );
}

// Main SSG Page Component
export default async function SSGPage() {
  return (
    <TaskManagementLayout>
      <Suspense fallback={<Loading />}>
        <TaskContent />
      </Suspense>
    </TaskManagementLayout>
  );
}

// Force page to be statically generated
export const dynamic = 'force-static';