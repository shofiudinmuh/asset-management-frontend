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
        password: 'password1',
    },
    {
        id: 2,
        name: 'User Tes 2',
        email: 'user-test2@am.test',
        created_at: '2025-03-29 07:32:04',
        password: 'password2',
    },
    {
        id: 3,
        name: 'User Test 3',
        email: 'user-test3@am.test',
        created_at: '2025-03-29 14:08:22',
        password: 'password3',
    },
    {
        id: 4,
        name: 'User Test 4',
        email: 'user-test4@am.test',
        created_at: '2025-03-29 14:21:50',
        password: 'password4',
    },
    {
        id: 5,
        name: 'Muhammad Shofiudin',
        email: 'shofiudin@am.test',
        created_at: '2025-03-30 11:34:05',
        password: 'password5',
    },
    {
        id: 6,
        name: 'User Test 1',
        email: 'user-test1@am.test',
        created_at: '2025-03-29 07:24:17',
        password: 'password6',
    },
    {
        id: 7,
        name: 'User Tes 2',
        email: 'user-test2@am.test',
        created_at: '2025-03-29 07:32:04',
        password: 'password7',
    },
    {
        id: 8,
        name: 'User Test 3',
        email: 'user-test3@am.test',
        created_at: '2025-03-29 14:08:22',
        password: 'password8',
    },
    {
        id: 9,
        name: 'User Test 4',
        email: 'user-test4@am.test',
        created_at: '2025-03-29 14:21:50',
        password: 'password9',
    },
    {
        id: 10,
        name: 'Muhammad Shofiudin',
        email: 'shofiudin@am.test',
        created_at: '2025-03-30 11:34:05',
        password: 'password10',
    },
    {
        id: 11,
        name: 'User Test 1',
        email: 'user-test1@am.test',
        created_at: '2025-03-29 07:24:17',
        password: 'password11',
    },
    {
        id: 12,
        name: 'User Tes 2',
        email: 'user-test2@am.test',
        created_at: '2025-03-29 07:32:04',
        password: 'password12',
    },
    {
        id: 13,
        name: 'User Test 3',
        email: 'user-test3@am.test',
        created_at: '2025-03-29 14:08:22',
        password: 'password13',
    },
    {
        id: 14,
        name: 'User Test 4',
        email: 'user-test4@am.test',
        created_at: '2025-03-29 14:21:50',
        password: 'password14',
    },
    {
        id: 15,
        name: 'Muhammad Shofiudin',
        email: 'shofiudin@am.test',
        created_at: '2025-03-30 11:34:05',
        password: 'password15',
    },
];

export default function UserTable({ onEditUser, data }) {
    const tableRef = useRef(null);
    // const selectedUser = data.find((user) => user.id === userId);

    useEffect(() => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }

        const $table = $(tableRef.current).DataTable({
            data: userData,
            columns: [
                { title: 'ID', data: 'id', className: 'text-start', width: '5%' },
                {
                    title: 'Name',
                    data: 'name',
                    width: '20%',
                    render: (data) =>
                        `<div class="text-sm font-medium text-gray-700 dark:text-white/90">${data}</div>`,
                },
                {
                    title: 'Email',
                    data: 'email',
                    width: '20%',
                    render: (data) =>
                        `<a href="mailto:${data}" class="text-sm text-brand-500 dark:text-blue-400 hover:underline">${data}</a>`,
                },
                {
                    title: 'Join Date',
                    data: 'created_at',
                    width: '20%',
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
                    title: 'Password',
                    data: 'password',
                    width: '20%',
                    render: (data) =>
                        `<div class="text-sm font-medium text-gray-700 dark:text-white/90">${data}</div>`,
                },
                {
                    title: 'Action',
                    data: 'id',
                    width: '15%',
                    orderable: false,
                    render: (data, type, row) => `
                        <div class="flex space-x-2">
                            <button data-id="${row.id}" class="action-edit text-sm font-medium px-3 py-1 bg-brand-500 text-white rounded hover:bg-brand-700">Edit</button>
                            <button data-id="${row.id}" class="action-delete text-sm font-medium px-3 py-1 bg-error-500 text-white rounded hover:bg-error-700">Delete</button>
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
            dom: `<"flex justify-between items-center mb-4"<"flex-1"f><"flex-none"l>>rt<"flex justify-between items-center mt-4"<"flex-1"i><"flex-none"p>>`,
            // dom: `<"flex justify-between items-center mb-4"<"flex-1"f><"flex-none"l>>rt<"flex justify-between items-center mt-4"<"flex-1"i><"flex-none"p>>`,

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
                const $table = $(tableRef.current);

                // Tabel dasar
                $table.addClass('min-w-full text-sm text-left');

                $table.find('thead').addClass('bg-gray-50 dark:bg-white/[0.03]');
                $table
                    .find('thead th')
                    .addClass('px-5 py-3 font-medium text-gray-500 text-xs dark:text-gray-400');
                $table
                    .find('tbody td')
                    .addClass('px-5 py-4 text-sm text-gray-700 dark:text-gray-300');
                $table.find('tbody tr').addClass('hover:bg-gray-100 dark:hover:bg-white/[0.05]');

                // ✅ Search input
                $('.dataTables_filter input')
                    .addClass(
                        'px-3 py-2 border rounded-md bg-white text-sm shadow-theme-xs text-gray-800 ' +
                            'placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden ' +
                            'focus:ring-3 focus:ring-brand-500/10 ' +
                            'dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 ' +
                            'dark:placeholder:text-white/30 dark:focus:border-brand-800'
                    )
                    .css('width', '250px');

                // ✅ Length select
                $('.dataTables_length select').addClass(
                    'px-2 py-1 border rounded-md text-sm text-gray-700 dark:text-gray-400 dark:bg-gray-800'
                );

                // ✅ Info text
                $('.dataTables_info').addClass('text-sm text-gray-500 dark:text-gray-400');

                // ✅ Pagination
                const $paginate = $('.dataTables_paginate');
                $paginate.addClass('text-sm dark:text-gray-300');

                $paginate
                    .find('a')
                    .addClass('px-3 py-1 rounded hover:bg-brand-500/10 transition-colors');
            },
        });

        $(tableRef.current).on('click', '.action-delete', function () {
            const userId = $(this).data('id');
            console.log('Delete user : ', userId);
        });
        $(tableRef.current).on('click', '.action-edit', function () {
            const userId = $(this).data('id');
            const selectedUser = userData.find((user) => user.id === userId);
            if (selectedUser) {
                onEditUser(selectedUser);
            }
        });

        return () => {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $table.destroy();
            }
        };
    }, []);

    return (
        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-gray-800'>
            <div className='max-w-full overflow-x-auto px-2 py-2'>
                <table className='display w-full' ref={tableRef}>
                    {/* DataTables will inject content here */}
                </table>
            </div>
        </div>
    );
}
