import { useForm } from 'react-hook-form';
import type { Filter } from '../types';

// Filter form data interface
interface FormData {
  status: string;
  priority: string;
}

// Filter criteria interface for parent component

type Props = {
  onSearch: (filters: Filter) => void;
};

export default function TaskFilterForm({ onSearch }: Props) {
  const {
    register,
    formState: { errors, isSubmitting },

    handleSubmit,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      status: '',
      priority: '',
    },
  });

  // Handle form submission to apply filters
  const onSubmit = async (data: FormData) => {
    // Convert form data to filter criteria
    const filters: Filter = {};

    if (data.status && data.status !== '') {
      filters.status = data.status;
    }

    if (data.priority && data.priority !== '') {
      filters.priority = data.priority;
    }

    onSearch(filters);
  };

  return (
    <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 p-8 rounded-3xl shadow-lg border border-white/50 backdrop-blur-xl">
      <div className="mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Filter Tasks
        </h2>
        <p className="text-gray-600 mt-2">Refine your search to find the perfect tasks</p>
      </div>
      
      <div className="transition-all duration-300 ease-in-out">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Horizontal Filter Form */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-6 space-y-6 lg:space-y-0">
            {/* Status Filter */}
            <div className="flex-1 min-w-0">
              <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-3">
                Status
              </label>
              <div className="relative">
                <select
                  id="status"
                  {...register('status')}
                  className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm appearance-none cursor-pointer"
                >
                  <option value="">All Statuses</option>
                  <option value="to_do">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
                </div>
              </div>
              {errors.status && <p className="text-red-500 text-sm mt-2 font-medium">{errors.status.message}</p>}
            </div>

            {/* Priority Filter */}
            <div className="flex-1 min-w-0">
              <label htmlFor="priority" className="block text-sm font-semibold text-gray-700 mb-3">
                Priority
              </label>
              <div className="relative">
                <select
                  id="priority"
                  {...register('priority')}
                  className="w-full px-4 py-3 bg-white/80 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md backdrop-blur-sm appearance-none cursor-pointer"
                >
                  <option value="">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-600"></div>
                </div>
              </div>
              {errors.priority && <p className="text-red-500 text-sm mt-2 font-medium">{errors.priority.message}</p>}
            </div>

            {/* Action Buttons */}
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="w-full lg:w-auto px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 border-2 border-transparent rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Searching...
                  </span>
                ) : (
                  'Search Tasks'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}