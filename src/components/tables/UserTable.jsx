import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';

import { useEffect, useRef } from 'react';

const userData = [
    /* ... data seperti sebelumnya ... */
    {
        id: 1,
        name: 'User Test 1',
        email: 'user-test1@am.test',
        created_at: '2025-03-29 07:24:17',
    },
    {
        id: 2,
        name: 'User Tes 2',
        email: 'user-test2@am.test',
        created_at: '2025-03-29 07:32:04',
    },
    {
        id: 3,
        name: 'User Test 3',
        email: 'user-test3@am.test',
        created_at: '2025-03-29 14:08:22',
    },
    {
        id: 4,
        name: 'User Test 4',
        email: 'user-test4@am.test',
        created_at: '2025-03-29 14:21:50',
    },
    {
        id: 5,
        name: 'Muhammad Shofiudin',
        email: 'shofiudin@am.test',
        created_at: '2025-03-30 11:34:05',
    },
    {
        id: 6,
        name: 'User Test 1',
        email: 'user-test1@am.test',
        created_at: '2025-03-29 07:24:17',
    },
    {
        id: 7,
        name: 'User Tes 2',
        email: 'user-test2@am.test',
        created_at: '2025-03-29 07:32:04',
    },
    {
        id: 8,
        name: 'User Test 3',
        email: 'user-test3@am.test',
        created_at: '2025-03-29 14:08:22',
    },
    {
        id: 9,
        name: 'User Test 4',
        email: 'user-test4@am.test',
        created_at: '2025-03-29 14:21:50',
    },
    {
        id: 10,
        name: 'Muhammad Shofiudin',
        email: 'shofiudin@am.test',
        created_at: '2025-03-30 11:34:05',
    },
    {
        id: 11,
        name: 'User Test 1',
        email: 'user-test1@am.test',
        created_at: '2025-03-29 07:24:17',
    },
    {
        id: 12,
        name: 'User Tes 2',
        email: 'user-test2@am.test',
        created_at: '2025-03-29 07:32:04',
    },
    {
        id: 13,
        name: 'User Test 3',
        email: 'user-test3@am.test',
        created_at: '2025-03-29 14:08:22',
    },
    {
        id: 14,
        name: 'User Test 4',
        email: 'user-test4@am.test',
        created_at: '2025-03-29 14:21:50',
    },
    {
        id: 15,
        name: 'Muhammad Shofiudin',
        email: 'shofiudin@am.test',
        created_at: '2025-03-30 11:34:05',
    },
];

export default function UserTable() {
    const tableRef = useRef(null);

    useEffect(() => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }

        const $table = $(tableRef.current).DataTable({
            data: userData,
            columns: [
                { title: 'ID', data: 'id', className: 'text-start' },
                {
                    title: 'Name',
                    data: 'name',
                    render: (data) =>
                        `<div class="text-sm font-medium text-gray-700 dark:text-white/90">${data}</div>`,
                },
                {
                    title: 'Email',
                    data: 'email',
                    render: (data) =>
                        `<a href="mailto:${data}" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">${data}</a>`,
                },
                {
                    title: 'Join Date',
                    data: 'created_at',
                    render: (data) => {
                        const date = new Date(data);
                        const formatted = date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        });
                        return `<div class="text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">${formatted}</div>`;
                    },
                },
                {
                    title: 'Action',
                    data: 'id',
                    orderable: false,
                    render: (data, type, row) => `
                        <div class="flex space-x-2">
                            <button data-id="${row.id}" class="text-sm font-medium px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Edit</button>
                            <button data-id="${row.id}" class="action-delete text-sm font-medium px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
                        </div>
                        `,
                },
            ],
            responsive: true,
            paging: true,
            pageLength: 10,
            lengthMenu: [5, 10, 25, 50],
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            // dom: `<"flex justify-between items-center mb-4"<"flex-1"f><"flex-none"l>>rt<"flex justify-between items-center mt-4"<"flex-1"i><"flex-none"p>>`,
            dom: `<"flex justify-between items-center mb-4"<"flex-1"f><"flex-none"l>>rt<"flex justify-between items-center mt-4"<"flex-1"i><"flex-none"p>>`,

            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search users...',
                lengthMenu: 'Show _MENU_ users',
                info: 'Showing _START_ to _END_ of _TOTAL_ users',
                infoEmpty: 'No users found',
                paginate: {
                    first: 'First',
                    last: 'Last',
                    next: 'Next',
                    previous: 'Previous',
                },
            },
            initComplete: function () {
                // Apply modern styling
                $(tableRef.current).addClass('min-w-full text-sm text-left');

                $(tableRef.current).find('thead').addClass('bg-gray-50 dark:bg-white/[0.03]');
                $(tableRef.current)
                    .find('thead th')
                    .addClass('px-5 py-3 font-medium text-gray-500 text-xs dark:text-gray-400');

                $(tableRef.current)
                    .find('tbody td')
                    .addClass('px-5 py-4 text-sm text-gray-700 dark:text-gray-300');

                $(tableRef.current)
                    .find('tbody tr')
                    .addClass('hover:bg-gray-100 dark:hover:bg-white/[0.05]');
                $('.dataTables_filter input').addClass(
                    'px-3 py-2 border rounded-md bg-white dark:bg-gray-800 dark:border-white/[0.1] text-sm'
                );
                $('.dataTables_length select').addClass('px-2 py-1 border rounded-md text-sm');
                $('.dataTables_info').addClass('text-sm text-gray-500 dark:text-gray-400');
                $('.dataTables_paginate').addClass('text-sm');
            },
        });

        $(tableRef.current).on('click', '.action-delete', function () {
            const userId = $(this).data('id');
            console.log('Delete user : ', userId);
        });

        return () => {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $table.destroy();
            }
        };
    }, []);

    return (
        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]'>
            <div className='p-4 flex justify-between items-center'>
                <h2 className='text-xl font-bold text-gray-800 dark:text-white'>Users</h2>
                <button
                    className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
                    onClick={() => console.log('Add new user clicked')}>
                    Add New User
                </button>
            </div>

            <div className='max-w-full overflow-x-auto'>
                <table className='display w-full' ref={tableRef}>
                    {/* DataTables will inject content here */}
                </table>
            </div>
        </div>
    );
}
