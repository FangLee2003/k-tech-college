import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

import TaskFilterForm from '../components/TaskFilterForm';
import TaskList from '../components/TaskList';
import { searchTasks } from '../utils';

import type { Filter, Task } from '../types';
import { getTasksByAssignee } from '../services';

export default function AssigneeMe() {
  const assigneeId = 1;
  const navigate = useNavigate();
  // Mock data for demonstration
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [filters, setFilters] = React.useState<Filter>({});

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasksByAssignee(assigneeId);
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleEdit = (taskId: string | number | undefined) => {
    navigate(`/update/${taskId}`);
  };

  // Filter tasks based on current filter criteria
  const filteredTasks = React.useMemo(() => {
    return searchTasks(tasks, filters);
  }, [tasks, filters]);

  const handleSearch = (newFilters: Filter) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            My Tasks Dashboard
          </h1>
          <p className="text-gray-600 text-lg">Manage your personal tasks efficiently</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
            <div className="bg-white rounded-xl p-6">
              <TaskFilterForm onSearch={handleSearch} />
            </div>
          </div>
        </div>

        {/* Task List Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1">
            <div className="bg-white rounded-xl">
              <section className="px-8 py-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-xl">📋</span>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        Your Tasks
                      </h2>
                      <p className="text-gray-500 mt-1 text-lg">
                        Manage and track all your assigned tasks
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-4 py-2 rounded-full">
                      <span className="text-green-700 font-semibold">
                        {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <section className="p-6">
                <div className="overflow-x-auto">
                  <TaskList tasks={filteredTasks} onEdit={handleEdit} />
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredTasks.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-gray-400">📝</span>
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No tasks found</h3>
            <p className="text-gray-500 text-lg">
              {tasks.length === 0 ? "You don't have any tasks assigned yet." : "No tasks match your current filters."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}