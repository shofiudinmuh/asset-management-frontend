import { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';

export default function MaintenanceTable({ onEditMaintenance, onDeleteMaintenance, data }) {
    const tableRef = useRef(null);

    useEffect(() => {
        // if (!data || data.length === 0) return;
        if (!tableRef.current || !data || data.length === 0) return;

        // if ($.fn.DataTable.isDataTable(tableRef.current)) {
        //     $(tableRef.current).DataTable().clear().rows.add(data).draw();
        // }
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }

        $(tableRef.current).DataTable({
            data: data,
            columns: [
                {
                    title: 'No',
                    data: null,
                    className: 'text-start',
                    width: '5%',
                    render: (data, type, row, meta) => {
                        return `<div class='text-sm font-semibold text-gray-700 dark:text-white/90'>${
                            meta.row + 1
                        }</div>`;
                    },
                },
                {
                    title: 'Name',
                    data: 'asset',
                    width: '15%',
                    render: (asset) =>
                        `<div class='text-sm font-semibold text-gray-700 dark:text-white/90'>${
                            asset?.name || ''
                        }</div>`,
                },
                {
                    title: 'Category',
                    data: 'asset',
                    width: '10%',
                    render: (asset) =>
                        `<div class='text-sm font-semibold text-gray-700 dark:text-white/90'>${asset?.category}</div>`,
                },
                {
                    title: 'Date',
                    data: 'maintenance_date',
                    width: '15%',
                    render: (data) => {
                        const date = new Date(data);
                        const formatted = date.toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        });
                        return `<div class='text-sm font-semibold text-gray-700 dark:text-white/90'>${formatted}</div>`;
                    },
                },
                {
                    title: 'Description',
                    data: 'description',
                    width: '15%',
                    render: (data) =>
                        `<div class='text-sm font-semibold text-gray-700 dark:text-white/90'>${data}</div>`,
                },
                {
                    title: 'Cost',
                    data: 'cost',
                    width: '15%',
                    render: (data) =>
                        `<div class='text-sm font-semibold text-gray-700 dark:text-white/90'>${data}</div>`,
                },
                {
                    title: 'PIC',
                    data: 'technician',
                    width: '15%',
                    render: (technician) =>
                        `<div class='text-sm font-semibold text-gray-700 dark:text-white/90'>${technician?.name}</div>`,
                },
                {
                    title: 'Action',
                    data: 'id',
                    width: '10%',
                    render: (data, type, row) =>
                        `<div class='flex space-x-2'>
                            <button data-id='${row.id}' class='action-edit text-sm font-medium px-3 py-1 bg-brand-500 hover:bg-brand-700 text-white rounded'>Edit</button>
                            <button data-id='${row.id}' class='action-delete text-sm font-medium px-3 py-1 bg-error-500 hover:bg-error-700 text-white rounded'>Delete</button>
                            </div>
                            `,
                },
            ],
            responsive: true,
            paging: true,
            pageLenght: 10,
            lenghtMenu: [5, 10, 25, 50],
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            dom: `<"flex justify-between items-center mb-4"<"flex-1"f><"flex-none"l>>rt<"flex justify-between items-center mt-4"<"flex-1"i><"flex-none"p>>`,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search maintenances...',
                lengthMenu: 'Show _MENU_ assets',
                info: 'Showing _START_ to _END_ of _TOTAL_ maintenances',
                infoEmpty: 'No maintenances found',
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

        $(tableRef.current).on('click', '.action-delete', function () {
            const maintenanceId = $(this).data('id');
            console.log('Delete maintenance data : ', maintenanceId);
            onDeleteMaintenance(maintenanceId);
        });
        $(tableRef.current).on('click', '.action-edit', function () {
            const maintenanceId = $(this).data('id');
            const selectedMaintenance = data.find(
                (maintenance) => maintenance.id === maintenanceId
            );
            if (selectedMaintenance) onEditMaintenance(selectedMaintenance);
        });

        return () => {
            $(tableRef.current).off('click');
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $(tableRef.current).DataTable().destroy();
            }
        };
    }, [data]);

    return (
        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white/[0.05] dark:bg-gray-800'>
            <div className='max-w-full overflow-x-auto px-2 py-2'>
                <table className='display w-full' ref={tableRef}></table>
            </div>
        </div>
    );
}
