import type { Task } from '../types';
import TaskDate from './TaskDate';
import TaskPriority from './TaskPriority';
import TaskStatus from './TaskStatus';
import TaskTitle from './TaskTitle';

type Props = {
  tasks: Task[];
  onEdit?: (taskId: string | number | undefined) => void;
};

export default function TaskList({ tasks, onEdit }: Props) {
  return (
    <div className="overflow-hidden">
      {/* Modern card-based layout instead of table */}
      <div className="grid gap-6 md:gap-8">
        {tasks.map((task: Task, index: number) => (
          <div
            key={task.id}
            className="group relative bg-gradient-to-br from-white/90 via-white/70 to-blue-50/30 backdrop-blur-xl border-2 border-white/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out transform hover:-translate-y-2 hover:scale-[1.02]"
            style={{
              animationDelay: `${index * 0.1}s`,
              animation: 'slideInUp 0.6s ease-out forwards'
            }}
          >
            {/* Enhanced gradient overlay for visual depth */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-indigo-50/20 to-purple-50/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Subtle border glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

            <div className="relative p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1 min-w-0">
                  <TaskTitle task={{ title: task.title, description: task.description }} />
                </div>
                <div className="flex items-center space-x-4 ml-6">
                  <TaskStatus task={task} />
                  <TaskPriority priority={task.priority} />
                </div>
              </div>

              {/* Enhanced date information grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Start Date</label>
                  <TaskDate date={task.start_date} format="short" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Due Date</label>
                  <TaskDate date={task.due_date} format="short" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Completed</label>
                  <TaskDate date={task.completed_date} format="short" />
                </div>
              </div>

              {/* Enhanced bottom row with assignee and actions */}
              <div className="flex items-center justify-between p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-white/80">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">
                      {/* {task.assignee_id ? task.assignee_id.charAt(0).toUpperCase() : 'U'} */}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-800">
                      {task.assignee_id || 'Unassigned'}
                    </span>
                    <div className="text-xs text-gray-500">Team Member</div>
                  </div>
                </div>

                <button
                  onClick={() => onEdit?.(task.id)}
                  className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  <div className="w-4 h-4 mr-2 bg-white/30 rounded-sm flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                  Edit Task
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced empty state */}
      {tasks.length === 0 && (
        <div className="text-center py-20">
          <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">No tasks found</h3>
          <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
            Try adjusting your filters or create a new task to get started on your productivity journey.
          </p>
          <div className="mt-8">
            <button className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Create New Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
}