import React from 'react';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import TaskManagementLayout from '../../layout';
import TaskListWrapper from '@/components/TaskListWrapper';
import { getTaskById } from '@/services';
// import type { Task } from '@/types';
import Loading from '@/app/loading';

// Thời gian revalidate cho ISR (60 giây)
export const revalidate = 60;

// Server Component cho Task Content với ISR
async function TaskContent({ id, lastUpdate }: { id: string; lastUpdate: string }) {
    const task = await getTaskById(id);
    console.log('Task Content:', task);
    if (!task) return notFound();

    return (
        <>
            {/* Header Section */}
            <div className="mb-8">
                <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-xl">🔄</span>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            Incremental Static Regeneration (ISR)
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Task ID: {id}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                            Last updated: {new Date(lastUpdate).toLocaleString()}
                        </p>
                        <p className="text-xs text-teal-600 mt-1">
                            Revalidates every {revalidate} seconds
                        </p>
                    </div>
                </div>
            </div>

            {/* Task Details Section */}
            <section className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <section className="bg-gradient-to-r from-gray-50 to-teal-50 px-6 py-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                                <span className="mr-3">📝</span>
                                Task Details
                            </h2>
                            <p className="text-gray-600 mt-2 flex items-center">
                                <span className="mr-2">📊</span>
                                Incrementally static regenerated task
                            </p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="bg-white rounded-lg px-4 py-2 shadow-md border border-gray-200">
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                                    <span className="text-sm font-medium text-gray-700">
                                        ISR Mode
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="p-6">
                    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                            <span className="mr-2">💡</span>
                            <span>This page revalidates every {revalidate} seconds while keeping the static benefits</span>
                        </div>
                    </div>
                    <TaskListWrapper tasks={[task]} />
                </section>
            </section>
        </>
    );
}

// Main ISR Page Component
export default async function ISRPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const lastUpdate = new Date().toISOString();

    return (
        <TaskManagementLayout>
            <Suspense fallback={<Loading />}>
                <TaskContent id={id} lastUpdate={lastUpdate} />
            </Suspense>
        </TaskManagementLayout>
    );
}