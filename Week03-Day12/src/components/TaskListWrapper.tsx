'use client';
import React from 'react';
// import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskList from '@/components/TaskList';
// import TaskFilterForm from '@/components/TaskFilterForm';
// import { searchTasks } from '@/utils';
// import { getTasks } from '@/services';
import type { Task } from '@/types';
// import Loading from '@/app/loading';
// import Error from '@/app/error';

interface TaskListWrapperProps {
    tasks: Task[];
}

export default function TaskListWrapper({ tasks }: TaskListWrapperProps) {
    const router = useRouter();
    // const [filters, setFilters] = useState<Filter>({});
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    // const handleSearch = (newFilters: Filter) => {
    //     setFilters(newFilters);
    // };

    const handleEdit = (taskId: string | number | undefined) => {
        router.push(`/update/${taskId}`);
    };

    // if (loading) {
    //     return (
    //         <Loading />
    //     );
    // }

    // if (error) {
    //     return (
    //         <Error
    //             error={error}
    //             reset={() => router.refresh()} />
    //     );
    // }
    return (
        <TaskList
            tasks={tasks}
            onEdit={handleEdit}
        />
    );
}
