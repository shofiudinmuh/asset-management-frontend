import { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';

const locationData = [
    {
        id: 1,
        name: 'Surabaya Selatan',
        address: 'Jalan Achmad Yani',
        created_at: '2025-03-30T05:00:08.000000Z',
        update_at: '2025-03-30T13:37:39.000000Z',
    },
    {
        id: 2,
        name: 'Surabaya 3',
        address: 'Jalan Ir Soekarno No 19',
        created_at: '2025-03-30T05:00:26.000000Z',
        update_at: '2025-03-30T05:00:26.000000Z',
    },
    {
        id: 3,
        name: 'Surabaya 4',
        address: 'Jalan Ir Soekarno No 19',
        created_at: '2025-03-30T05:02:08.000000Z',
        update_at: '2025-03-30T05:02:08.000000Z',
    },
    {
        id: 4,
        name: 'Surabaya Selatan',
        address: 'Jalan Achmad Yani',
        created_at: '2025-03-30T05:00:08.000000Z',
        update_at: '2025-03-30T13:37:39.000000Z',
    },
    {
        id: 5,
        name: 'Surabaya 3',
        address: 'Jalan Ir Soekarno No 19',
        created_at: '2025-03-30T05:00:26.000000Z',
        update_at: '2025-03-30T05:00:26.000000Z',
    },
    {
        id: 6,
        name: 'Surabaya 4',
        address: 'Jalan Ir Soekarno No 19',
        created_at: '2025-03-30T05:02:08.000000Z',
        update_at: '2025-03-30T05:02:08.000000Z',
    },
    {
        id: 7,
        name: 'Surabaya Selatan',
        address: 'Jalan Achmad Yani',
        created_at: '2025-03-30T05:00:08.000000Z',
        update_at: '2025-03-30T13:37:39.000000Z',
    },
    {
        id: 8,
        name: 'Surabaya 3',
        address: 'Jalan Ir Soekarno No 19',
        created_at: '2025-03-30T05:00:26.000000Z',
        update_at: '2025-03-30T05:00:26.000000Z',
    },
    {
        id: 9,
        name: 'Surabaya 4',
        address: 'Jalan Ir Soekarno No 19',
        created_at: '2025-03-30T05:02:08.000000Z',
        update_at: '2025-03-30T05:02:08.000000Z',
    },
    {
        id: 10,
        name: 'Surabaya 4',
        address: 'Jalan Ir Soekarno No 19',
        created_at: '2025-03-30T05:02:08.000000Z',
        update_at: '2025-03-30T05:02:08.000000Z',
    },
    {
        id: 11,
        name: 'Surabaya Selatan',
        address: 'Jalan Achmad Yani',
        created_at: '2025-03-30T05:00:08.000000Z',
        update_at: '2025-03-30T13:37:39.000000Z',
    },
    {
        id: 12,
        name: 'Surabaya 3',
        address: 'Jalan Ir Soekarno No 19',
        created_at: '2025-03-30T05:00:26.000000Z',
        update_at: '2025-03-30T05:00:26.000000Z',
    },
    {
        id: 13,
        name: 'Surabaya 4',
        address: 'Jalan Ir Soekarno No 19',
        created_at: '2025-03-30T05:02:08.000000Z',
        update_at: '2025-03-30T05:02:08.000000Z',
    },
    {
        id: 14,
        name: 'Surabaya Selatan',
        address: 'Jalan Achmad Yani',
        created_at: '2025-03-30T05:00:08.000000Z',
        update_at: '2025-03-30T13:37:39.000000Z',
    },
    {
        id: 15,
        name: 'Surabaya 3',
        address: 'Jalan Ir Soekarno No 19',
        created_at: '2025-03-30T05:00:26.000000Z',
        update_at: '2025-03-30T05:00:26.000000Z',
    },
    {
        id: 16,
        name: 'Surabaya 4',
        address: 'Jalan Ir Soekarno No 19',
        created_at: '2025-03-30T05:02:08.000000Z',
        update_at: '2025-03-30T05:02:08.000000Z',
    },
    {
        id: 17,
        name: 'Surabaya Selatan',
        address: 'Jalan Achmad Yani',
        created_at: '2025-03-30T05:00:08.000000Z',
        update_at: '2025-03-30T13:37:39.000000Z',
    },
    {
        id: 18,
        name: 'Surabaya 3',
        address: 'Jalan Ir Soekarno No 19',
        created_at: '2025-03-30T05:00:26.000000Z',
        update_at: '2025-03-30T05:00:26.000000Z',
    },
    {
        id: 19,
        name: 'Surabaya 4',
        address: 'Jalan Ir Soekarno No 19',
        created_at: '2025-03-30T05:02:08.000000Z',
        update_at: '2025-03-30T05:02:08.000000Z',
    },
];

export default function LocationTable({ onEditLocation, data }) {
    const tableRef = useRef(null);

    useEffect(() => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }

        const $table = $(tableRef.current).DataTable({
            data: locationData,
            columns: [
                { title: 'No', data: 'id', className: 'text-start', width: '5%' },
                {
                    title: 'Name',
                    data: 'name',
                    width: '35%',
                    render: (data) =>
                        `<div class= "text-sm font-medium text-gray-700 dark:text-white/90">${data}</div>`,
                },
                {
                    title: 'Address',
                    data: 'address',
                    width: '40%',
                    render: (data) =>
                        `<div class= "text-sm font-medium text-gray-700 dark:text-white/90">${data}</div>`,
                },
                {
                    title: 'Action',
                    data: 'id',
                    width: '20%',
                    render: (data, type, row) =>
                        `
                    <div class='flex space-x-2'>
                        <button data-id="${row.id}" class="action-edit text-sm font-medium px-3 py-1 bg-brand-500 text-white rounded hover:bg-brand-700">Edit</button>
                        <button data-id="${row.id}" class="action-delete text-sm font-medium px-3 py-1 bg-error-500 text-white rounded hover:bg-error-700">Delete</button>
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
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search locations...',
                lengthMenu: 'Show _MENU_ locations',
                info: 'Showing _START_ to _END_ of _TOTAL_ locations',
                infoEmpty: 'No locations found',
                paginate: {
                    first: 'First',
                    last: 'Last',
                    next: 'Next',
                    previous: 'Previous',
                },
            },
            initComplete: function () {
                const $table = $(tableRef.current);

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
            const locationId = $(this).data('id');
            console.log('Delete location : ', locationId);
        });
        $(tableRef.current).on('click', '.action-edit', function () {
            const locationId = $(this).data('id');
            const selectedLocation = locationData.find((location) => location.id === locationId);
            if (selectedLocation) {
                onEditLocation(selectedLocation);
            }
        });

        return () => {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $table.destroy();
            }
        };
    }, []);

    return (
        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white/[0.05] dark:bg-gray-800'>
            <div className='max-w-full overflow-x-auto px-2 py-2'>
                <table className='display w-full' ref={tableRef}></table>
            </div>
        </div>
    );
}
