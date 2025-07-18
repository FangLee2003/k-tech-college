import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { getTaskById, updateTask } from '@/services';

import type { Task } from '@/types';

// Form data interface (excluding auto-generated fields)
interface TaskFormData {
  title: string;
  start_date: string;
  due_date?: string;
  description?: string;
  status: 'to_do' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignee_id?: number | string;
}

// Yup validation schema
const validationSchema: yup.ObjectSchema<TaskFormData> = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be less than 100 characters'),
  start_date: yup
    .string()
    .required('Start date is required')
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date'),
  due_date: yup
    .string()
    .optional()
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date')
    .test('due_date-after-start_date', 'Due date must be after start date', function (value) {
      if (!value) return true;
      const { start_date } = this.parent;
      return new Date(value) >= new Date(start_date);
    }),
  description: yup.string().optional().max(500, 'Description must be less than 500 characters'),
  status: yup
    .mixed<'to_do' | 'in_progress' | 'done'>()
    .required('Status is required')
    .oneOf(['to_do', 'in_progress', 'done'], 'Please select a valid status'),
  priority: yup
    .mixed<'low' | 'medium' | 'high'>()
    .required('Priority is required')
    .oneOf(['low', 'medium', 'high'], 'Please select a valid priority'),
  assignee_id: yup.number().optional().min(1, 'Assignee ID must be a positive number'),
});

export default function UpdateTask() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [task, setTask] = React.useState<Task | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
    reset,
  } = useForm<TaskFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onChange',
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (id !== undefined) {
        try {
          const data = await getTaskById(id);
          if (!data) {
            throw new Error('Task not found');
          }
          // Convert Task to TaskFormData for reset
          reset({
            title: data.title || '',
            start_date: data.start_date ? new Date(data.start_date).toISOString().split('T')[0] : '',
            due_date: data.due_date ? new Date(data.due_date).toISOString().split('T')[0] : '',
            description: data.description || '',
            status: data.status,
            priority: data.priority,
            assignee_id: data.assignee_id ?? '',
          });
          setTask(data);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      }
    };

    fetchTask();
  }, [id, reset]);

  const onSubmit = async (data: TaskFormData): Promise<void> => {
    try {
      // Convert form data to updated Task object
      if (!task || !task.id || !task.created_time) {
        throw new Error('Task data is incomplete.');
      }
      const updatedTask: Task = {
        ...task,
        id: task.id,
        title: data.title,
        start_date: new Date(data.start_date),
        due_date: data.due_date ? new Date(data.due_date) : undefined,
        description: data.description || undefined,
        status: data.status,
        priority: data.priority,
        assignee_id: data.assignee_id ? Number(data.assignee_id) : undefined,
        completed_date: data.status === 'done' ? new Date() : undefined,
      };

      // Call the updateTask service
      await updateTask(updatedTask);

      navigate('/tasks'); // Redirect to tasks list after update
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-sm transform rotate-45"></div>
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Update Task
          </h1>
          <p className="text-gray-600 text-lg">Modify your task details with ease</p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 hover:shadow-3xl transition-all duration-300">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Title Field */}
            <div className="group">
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mr-2"></span>
                Title <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  {...register('title')}
                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 ${errors.title
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50'
                      : !errors.title && dirtyFields.title
                        ? 'border-green-400 focus:border-green-500 focus:ring-green-100 bg-green-50'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100 bg-gray-50 hover:bg-white'
                    }`}
                  placeholder="Enter your task title..."
                />
                {!errors.title && dirtyFields.title && (
                  <div className="absolute right-4 top-4 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                  </div>
                )}
              </div>
              {errors.title && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Date Fields Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Start Date */}
              <div className="group">
                <label htmlFor="start_date" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mr-2"></span>
                  Start Date <span className="text-red-500 ml-1">*</span>
                </label>
                <input
                  type="date"
                  id="start_date"
                  {...register('start_date')}
                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 ${errors.start_date
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50'
                      : !errors.start_date && dirtyFields.start_date
                        ? 'border-green-400 focus:border-green-500 focus:ring-green-100 bg-green-50'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100 bg-gray-50 hover:bg-white'
                    }`}
                />
                {errors.start_date && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.start_date.message}
                  </p>
                )}
              </div>

              {/* Due Date */}
              <div className="group">
                <label htmlFor="due_date" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-full mr-2"></span>
                  Due Date
                </label>
                <input
                  type="date"
                  id="due_date"
                  {...register('due_date')}
                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 ${errors.due_date
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50'
                      : !errors.due_date && dirtyFields.due_date
                        ? 'border-green-400 focus:border-green-500 focus:ring-green-100 bg-green-50'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100 bg-gray-50 hover:bg-white'
                    }`}
                />
                {errors.due_date && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.due_date.message}
                  </p>
                )}
              </div>
            </div>

            {/* Status and Priority Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Status */}
              <div className="group">
                <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mr-2"></span>
                  Status <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  id="status"
                  {...register('status')}
                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 ${errors.status
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50'
                      : !errors.status && dirtyFields.status
                        ? 'border-green-400 focus:border-green-500 focus:ring-green-100 bg-green-50'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100 bg-gray-50 hover:bg-white'
                    }`}
                >
                  <option value="to_do">📋 To Do</option>
                  <option value="in_progress">⚡ In Progress</option>
                  <option value="done">✅ Done</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.status.message}
                  </p>
                )}
              </div>

              {/* Priority */}
              <div className="group">
                <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <span className="w-2 h-2 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mr-2"></span>
                  Priority <span className="text-red-500 ml-1">*</span>
                </label>
                <select
                  id="priority"
                  {...register('priority')}
                  className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 ${errors.priority
                      ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50'
                      : !errors.priority && dirtyFields.priority
                        ? 'border-green-400 focus:border-green-500 focus:ring-green-100 bg-green-50'
                        : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100 bg-gray-50 hover:bg-white'
                    }`}
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
                {errors.priority && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                    {errors.priority.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description Field */}
            <div className="group">
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full mr-2"></span>
                Description
              </label>
              <textarea
                id="description"
                rows={5}
                {...register('description')}
                className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 resize-none ${errors.description
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50'
                    : !errors.description && dirtyFields.description
                      ? 'border-green-400 focus:border-green-500 focus:ring-green-100 bg-green-50'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100 bg-gray-50 hover:bg-white'
                  }`}
                placeholder="Describe your task in detail..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Assignee ID Field */}
            <div className="group">
              <label htmlFor="assignee_id" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                <span className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full mr-2"></span>
                Assignee ID
              </label>
              <input
                type="text"
                id="assignee_id"
                {...register('assignee_id')}
                className={`w-full px-4 py-4 border-2 rounded-2xl focus:outline-none focus:ring-4 transition-all duration-300 ${errors.assignee_id
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-100 bg-red-50'
                    : !errors.assignee_id && dirtyFields.assignee_id
                      ? 'border-green-400 focus:border-green-500 focus:ring-green-100 bg-green-50'
                      : 'border-gray-200 focus:border-blue-500 focus:ring-blue-100 bg-gray-50 hover:bg-white'
                  }`}
                placeholder="Enter assignee ID..."
              />
              {errors.assignee_id && (
                <p className="text-red-500 text-sm mt-2 flex items-center">
                  <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                  {errors.assignee_id.message}
                </p>
              )}
            </div>

            {/* Form Status */}
            <div className="text-center py-4">
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${isValid
                  ? 'bg-green-100 text-green-700 border-2 border-green-200'
                  : 'bg-red-100 text-red-700 border-2 border-red-200'
                }`}>
                <div className={`w-3 h-3 rounded-full mr-3 ${isValid ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {isValid ? 'Form is valid and ready to submit!' : 'Please fill in all required fields correctly'}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`relative px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform ${isSubmitting || !isValid
                    ? 'bg-gray-300 cursor-not-allowed text-gray-500 scale-95'
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl scale-100 hover:scale-105'
                  }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Updating Task...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <div className="w-5 h-5 bg-white rounded-full mr-3 flex items-center justify-center">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    </div>
                    Update Task
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Make your updates count! 🚀</p>
        </div>
      </div>
    </div>
  );
}