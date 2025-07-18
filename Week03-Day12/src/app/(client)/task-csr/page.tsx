'use client';
// (client)/task-csr/page.tsx
import React, { useEffect, useState } from 'react';
import TaskManagementLayout from '../layout';
import TaskFilterForm from '@/components/TaskFilterForm';
import TaskList from '@/components/TaskList';
import { getTasks } from '@/services';
import { searchTasks } from '@/utils';
import { useRouter } from 'next/navigation';
import type { Task, Filter } from '@/types';
import Loading from '@/app/loading';
import Error from '@/app/error';

export default function CSRPage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<Filter>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getTasks();
        setTasks(data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleSearch = (newFilters: Filter) => {
    setFilters(newFilters);
  };

  const handleEdit = (taskId: string | number | undefined) => {
    router.push(`/update/${taskId}`);
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  if (error) {
    return (
      <Error
        error={error}
        reset={() => router.refresh()} />
    );
  }

  return (
    <TaskManagementLayout
    >
      {/* Filter Section */}
      <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
          <h2 className="text-lg font-semibold text-white flex items-center">
            <span className="mr-2">🔍</span>
            Filter Tasks
          </h2>
        </div>
        <div className="p-6">
          <TaskFilterForm onSearch={handleSearch} />
        </div>
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
                  <span className="text-sm font-medium text-gray-700">
                    {searchTasks(tasks, filters)?.length} tasks
                  </span>
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
          <TaskList tasks={searchTasks(tasks, filters)} onEdit={handleEdit} />
        </section>
      </section>
    </TaskManagementLayout>
  );
}