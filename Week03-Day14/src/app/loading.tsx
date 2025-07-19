import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

export default function Loading() {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Skeleton height={48} width={48} style={{ borderRadius: '12px' }} className="mr-4" />
              <div>
                <Skeleton height={32} width={256} className="mb-2" />
                <Skeleton height={16} width={384} />
              </div>
            </div>
          </div>

          {/* Filter Section Skeleton */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <span className="mr-2">🔍</span>
                Filter Tasks
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Skeleton height={40} />
                <Skeleton height={40} />
                <Skeleton height={40} />
              </div>
            </div>
          </section>

          {/* Task List Skeleton */}
          <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <Skeleton height={32} width={192} className="mb-2" />
                  <Skeleton height={16} width={256} />
                </div>
                <Skeleton height={32} width={96} />
              </div>
            </div>

            <div className="p-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
                <Skeleton height={16} width={320} />
              </div>
              
              {/* Task Items Skeleton */}
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <Skeleton height={24} width="75%" className="mb-2" />
                        <Skeleton height={16} width="100%" />
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Skeleton height={32} width={64} />
                        <Skeleton height={32} width={64} />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton height={24} width={96} />
                      <Skeleton height={16} width={128} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </SkeletonTheme>
  );
}
