import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { useEffect, useRef } from 'react';

export default function UserTable({ onEditUser, onDeleteUser }) {
    const tableRef = useRef(null);

    useEffect(() => {
        if (!tableRef.current) return;

        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }

        const dataTable = $(tableRef.current).DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url: '/api/users',
                type: 'GET',
                dataSrc: function (json) {
                    console.log('Data JSON:', json);
                    return json.data;
                },
                error: function (xhr, error, thrown) {
                    console.error('AJAX Error:', error, thrown);
                },
            },
            columns: [
                {
                    data: 'id',
                    render: (data, type, row, meta) => meta.row + meta.settings._iDisplayStart + 1,
                    orderable: false,
                    title: 'No',
                    width: '5%',
                },
                {
                    title: 'Name',
                    data: 'name',
                    width: '25%',
                    render: (data) =>
                        `<div class="text-sm font-medium text-gray-700 dark:text-white/90">${data}</div>`,
                },
                {
                    title: 'Email',
                    data: 'email',
                    width: '25%',
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
                    data: 'id',
                    title: 'Action',
                    orderable: false,
                    width: '15%',
                    render: (data, type, row) => `
                         <div class="flex space-x-2">
                             <button data-id="${row.id}" class="action-edit text-sm font-medium px-3 py-1 bg-brand-500 text-white rounded hover:bg-brand-700">Edit</button>
                             <button data-id="${row.id}" class="action-delete text-sm font-medium px-3 py-1 bg-error-500 text-white rounded hover:bg-error-700">Delete</button>
                         </div>
                         `,
                },
            ],
            initComplete: function () {
                const $table = $(tableRef.current);

                $table.addClass('min-w-full text-sm text-left');

                $table.find('thead').addClass('bg-gray-50 dark:bg-white/[0.03]');
                $table
                    .find('thead th')
                    .addClass(
                        'px-5 py-3 font-medium text-gray-500 text-xs text-center dark:text-gray-400'
                    );
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

        //Event handlers
        $(tableRef.current).on('click', '.action-delete', function () {
            const userId = $(this).data('id');
            if (onDeleteUser) onDeleteUser(userId);
        });

        $(tableRef.current).on('click', '.action-edit', function () {
            const userId = $(this).data('id');
            const rowData = dataTable.row($(this).parents('tr')).data();
            if (onEditUser) onEditUser(rowData);
        });

        return () => {
            $(tableRef.current).off();
            dataTable.destroy();
        };
    }, []);

    return (
        <div>
            <table className='display' ref={tableRef}></table>
        </div>
    );
}
