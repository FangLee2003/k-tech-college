// app/task-ssr/page.tsx
import React from 'react';
import { Suspense } from 'react';
import TaskManagementLayout from '../layout';
import TaskListWrapper from '@/components/TaskListWrapper';
import { getTasks } from '@/services';
import type { Task } from '@/types';
import Loading from '@/app/loading';
// import ErrorBoundary from '@/components/ErrorBoundary';

// Server Component cho Task Content
async function TaskContent() {
  try {
    // Fetch tasks on server
    const tasks: Task[] = await getTasks();

    return (
      <>
        {/* Filter Section */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <span className="mr-2">🔍</span>
              Filter Tasks
            </h2>
          </div>
          {/* <div className="p-6">
            <TaskFilterForm onSearch={} />
          </div> */}
        </section>

        {/* Task List Section */}
        <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <section className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <span className="mr-3">📝</span>
                  Our Tasks
                </h2>
                <p className="text-gray-600 mt-2 flex items-center">
                  <span className="mr-2">📊</span>
                  Manage and track all our tasks
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-gray-200">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    {/* <span className="text-sm font-medium text-gray-700">
                      {filteredTasks?.length || 0} tasks
                    </span> */}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="p-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <span className="mr-2">💡</span>
                <span>Tip: Use the filters above to quickly find specific tasks</span>
              </div>
            </div>
            <TaskListWrapper tasks={tasks} />
          </section>
        </section>
      </>
    );
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to load tasks');
  }
}

// Main Server Component
export default async function SSRPage() {
  return (
    <TaskManagementLayout>
      {/* <ErrorBoundary> */}
      <Suspense fallback={<Loading />}>
        <TaskContent />
      </Suspense>
      {/* </ErrorBoundary> */}
    </TaskManagementLayout>
  );
}