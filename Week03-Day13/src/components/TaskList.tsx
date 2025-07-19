import type { Task } from '../types';
import TaskDate from './TaskDate';
import TaskPriority from './TaskPriority';
import TaskStatus from './TaskStatus';
import TaskTitle from './TaskTitle';
import ButtonWithPermissions from './ButtonWithPermissions';

type Props = {
  tasks: Task[];
  onEdit?: (taskId: string | number | undefined) => void;
  onCreate?: () => void;
  onDelete?: (taskId: string | number | undefined) => void;
};

export default function TaskList({ tasks, onEdit, onCreate, onDelete }: Props) {
  return (
    <div className="overflow-hidden">
      {/* Simple table layout */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table header */}
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="grid grid-cols-12 gap-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
            <div className="col-span-4">Task</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-2">Due Date</div>
            <div className="col-span-1">Assignee</div>
            <div className="col-span-1">Actions</div>
          </div>
        </div>

        {/* Table body */}
        <div className="divide-y divide-gray-200">
          {tasks?.map((task: Task) => (
            <div
              key={task.id}
              className="px-6 py-4 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 border-l-4 border-transparent hover:border-blue-400"
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Task title and description */}
                <div className="col-span-4">
                  <TaskTitle task={{ title: task.title, description: task.description }} />
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <TaskStatus task={task} />
                </div>

                {/* Priority */}
                <div className="col-span-2">
                  <TaskPriority priority={task.priority} />
                </div>

                {/* Due date */}
                <div className="col-span-2">
                  <TaskDate date={task.due_date} format="short" />
                </div>

                {/* Assignee */}
                <div className="col-span-1">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">
                        {/* {task.assignee_id ? task.assignee_id.charAt(0).toUpperCase() : 'U'} */}
                      </span>
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-gray-800">
                        {task.assignee_id || 'Unassigned'}
                      </span>
                      {/* <div className="text-xs text-gray-500">Team Member</div> */}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="col-span-1">
                  <div className="flex space-x-2">
                    <ButtonWithPermissions
                      permissions={['Administrator']}
                      onClick={() => onEdit?.(task.id)}
                      className="inline-flex items-center px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </ButtonWithPermissions>
                    
                    <ButtonWithPermissions
                      permissions={['Administrator']}
                      onClick={() => onDelete?.(task.id)}
                      className="inline-flex items-center px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-red-700 rounded-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </ButtonWithPermissions>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty state */}
      {tasks?.length === 0 && (
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
            <ButtonWithPermissions
              permissions={['Administrator']}
              onClick={onCreate}
              className="inline-flex items-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create New Task
            </ButtonWithPermissions>
          </div>
        </div>
      )}
    </div>
  );
}