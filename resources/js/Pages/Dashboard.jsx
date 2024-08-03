import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head, Link } from "@inertiajs/react";
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register the components needed for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

export default function Dashboard({
    auth,
    totalPendingTasks,
    myPendingTasks,
    totalProgressTasks,
    myProgressTasks,
    totalCompletedTasks,
    myCompletedTasks,
    activeTasks,
}) {
    // Data for the bar chart
    const barData = {
        labels: ['Pending', 'In Progress', 'Completed'],
        datasets: [
            {
                label: 'My Tasks',
                data: [myPendingTasks, myProgressTasks, myCompletedTasks],
                backgroundColor: ['#f59e0b', '#3b82f6', '#10b981'],
                borderColor: ['#f59e0b', '#3b82f6', '#10b981'],
                borderWidth: 1,
            },
            {
                label: 'Total Tasks',
                data: [totalPendingTasks, totalProgressTasks, totalCompletedTasks],
                backgroundColor: ['#fef3c7', '#bfdbfe', '#d1fae5'],
                borderColor: ['#fef3c7', '#bfdbfe', '#d1fae5'],
                borderWidth: 1,
            }
        ],
    };

    // Options for the bar chart
    const barOptions = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Tasks Overview',
            },
        },
    };

    // Data for the doughnut chart
    const doughnutData = {
        labels: ['Pending', 'In Progress', 'Completed'],
        datasets: [
            {
                data: [myPendingTasks, myProgressTasks, myCompletedTasks],
                backgroundColor: ['#f59e0b', '#3b82f6', '#10b981'],
                borderColor: ['#ffffff'],
                borderWidth: 1,
            }
        ],
    };

    // Options for the doughnut chart
    const doughnutOptions = {
        plugins: {
            legend: {
                position: 'right',
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const label = tooltipItem.label || '';
                        const value = tooltipItem.raw || 0;
                        return `${label}: ${value}`;
                    }
                }
            }
        },
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-amber-500 text-2xl font-semibold">
                                Pending Tasks
                            </h3>
                            <p className="text-xl mt-4">
                                <span className="mr-2">{myPendingTasks}</span>/
                                <span className="ml-2">{totalPendingTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-blue-500 text-2xl font-semibold">
                                In Progress Tasks
                            </h3>
                            <p className="text-xl mt-4">
                                <span className="mr-2">{myProgressTasks}</span>/
                                <span className="ml-2">{totalProgressTasks}</span>
                            </p>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-green-500 text-2xl font-semibold">
                                Completed Tasks
                            </h3>
                            <p className="text-xl mt-4">
                                <span className="mr-2">{myCompletedTasks}</span>/
                                <span className="ml-2">{totalCompletedTasks}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-gray-900 dark:text-gray-100 text-xl font-semibold mb-4">
                            Tasks Overview
                        </h3>
                        <div style={{ width: '100%', maxWidth: '600px', height: '350px' }}>
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-gray-900 dark:text-gray-100 text-xl font-semibold mb-4">
                            Task Distribution
                        </h3>
                        <div style={{ width: '100%', maxWidth: '500px', height: '350px' }}>
                            <Doughnut data={doughnutData} options={doughnutOptions} />
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3 className="text-gray-200 text-xl font-semibold">
                                My Active Tasks
                            </h3>
                            <table className="mt-3 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr>
                                        <th className="px-3 py-3">ID</th>
                                        <th className="px-3 py-3">Project Name</th>
                                        <th className="px-3 py-3">Name</th>
                                        <th className="px-3 py-3">Status</th>
                                        <th className="px-3 py-3">Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activeTasks.data.map((task) => (
                                        <tr key={task.id}>
                                            <td className="px-3 py-2">{task.id}</td>
                                            <td className="px-3 py-2 text-white hover:underline">
                                                <Link href={route("project.show", task.project.id)}>
                                                    {task.project.name}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-2 text-white hover:underline">
                                                <Link href={route("task.show", task.id)}>
                                                    {task.name}
                                                </Link>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span
                                                    className={
                                                        "px-2 py-1 rounded text-nowrap text-white " +
                                                        TASK_STATUS_CLASS_MAP[task.status]
                                                    }
                                                >
                                                    {TASK_STATUS_TEXT_MAP[task.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2 text-nowrap">
                                                {task.due_date}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
