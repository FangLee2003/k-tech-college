type Props = {
  date?: Date | string;
  format?: 'short' | 'long';
};

// date = '2025-07-09T19:28:30.380Z'

export default function TaskDate({ date, format = 'long' }: Props) {
  const formatDate = (date: Date | string, format: 'short' | 'long' | undefined) => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    if (format === 'long') {
      return parsedDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    }
    return parsedDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  const formattedDate = date ? formatDate(date, format) : '';
  return (
    <div className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-slate-50 to-gray-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:shadow-md transition-all duration-200 backdrop-blur-sm">
      {formattedDate || 'Not set'}
    </div>
  );
}