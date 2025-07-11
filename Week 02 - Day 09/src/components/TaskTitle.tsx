type Props = {
  task: {
    title: string;
    description?: string;
  };
};

export default function TaskTitle({ task }: Props) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="text-lg font-bold text-gray-900 leading-tight hover:text-blue-600 transition-colors duration-200">
        {task.title}
      </div>
      {task.description && (
        <div className="text-sm text-gray-600 leading-relaxed line-clamp-2 max-w-md">
          <span className="inline-block w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
          {task.description}
        </div>
      )}
    </div>
  );
}