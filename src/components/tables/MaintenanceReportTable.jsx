import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons';
import { useEffect, useRef, useState } from 'react';
import 'datatables.net-buttons/js/buttons.print.min';

const maintenancesReportData = [
    {
        id: 1,
        asset: {
            id: 2,
            name: 'Server',
            category: 'Peralatan',
            serial_number: 'JKDNFAOI12335JNAKJDN12',
            purchase_date: '2025-03-30T00:00:00.000000Z',
            warranty_expiry: '2027-03-30T00:00:00.000000Z',
            status: 'Tersedia',
            created_at: '2025-04-06T06:41:17.000000Z',
            updated_at: '2025-04-06T06:41:17.000000Z',
        },
        maintenance_date: '2024-05-06T00:00:00.000000Z',
        description: 'Maintenance rutin',
        cost: '450000.00',
        technician: {
            id: 3,
            name: 'User Test 3',
            email: 'user-test3@am.test',
            created_at: '2025-03-29 14:08:22',
        },
        created_at: '2025-04-06T07:15:38.000000Z',
        updated_at: '2025-04-06T07:15:38.000000Z',
    },
    {
        id: 2,
        asset: {
            id: 2,
            name: 'Server',
            category: 'Peralatan',
            serial_number: 'JKDNFAOI12335JNAKJDN12',
            purchase_date: '2025-03-30T00:00:00.000000Z',
            warranty_expiry: '2027-03-30T00:00:00.000000Z',
            status: 'Tersedia',
            created_at: '2025-04-06T06:41:17.000000Z',
            updated_at: '2025-04-06T06:41:17.000000Z',
        },
        maintenance_date: '2024-05-08T00:00:00.000000Z',
        description: 'Penggantian SSD',
        cost: '650000.00',
        technician: {
            id: 3,
            name: 'User Test 3',
            email: 'user-test3@am.test',
            created_at: '2025-03-29 14:08:22',
        },
        created_at: '2025-04-06T07:16:33.000000Z',
        updated_at: '2025-04-06T07:16:33.000000Z',
    },
];

export default function MainteananceReportTable() {
    const tableRef = useRef(null);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }

        const $table = $(tableRef.current).DataTable({
            data: maintenancesReportData,
            columns: [
                { title: 'No', data: 'id', className: 'text-start', width: '5%' },
                {
                    title: 'Name',
                    data: 'asset',
                    width: '15%',
                    render: (asset) =>
                        `<div class='text-sm font-semibold text-gray-700 dark:text-white/90'>${asset.name}</div>`,
                },
                {
                    title: 'Category',
                    data: 'asset',
                    width: '10%',
                    render: (asset) =>
                        `<div class='text-sm font-semibold text-gray-700 dark:text-white/90'>${asset.category}</div>`,
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
                    width: '20%',
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
                    width: '10%',
                    render: (technician) =>
                        `<div class='text-sm font-semibold text-gray-700 dark:text-white/90'>${technician.name}</div>`,
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
            pageLength: 10,
            lengthMenu: [5, 10, 25, 50, 100],
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            dom: `<"flex flex-col md:flex-row justify-between items-center mb-4 gap-2"<"flex-1"f><"flex-none"B><"flex-none"l>>rt<"flex flex-col md:flex-row justify-between items-center mt-4 gap-2"<"flex-1"i><"flex-none"p>>`,
            buttons: [
                {
                    extend: 'print',
                    text: 'Print Report',
                    className: 'bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-700',
                    exportOptions: {
                        columns: ':visible:not(:last-child)',
                    },
                    title: 'Transaction Report',
                },
            ],
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search transactions...',
                lengthMenu: 'Show _MENU_ transactions',
                info: 'Showing _START_ to _END_ of _TOTAL_ transactions',
                infoEmpty: 'No transactions found',
                paginate: { first: 'First', last: 'Last', next: 'Next', previous: 'Previous' },
            },
        });

        $table.on('init.dt', function () {
            // Style search input
            const searchInput = $('div.dataTables_filter input');
            searchInput.addClass(
                'border border-gray-300 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500'
            );

            // Style length menu select
            const lengthSelect = $('div.dataTables_length select');
            lengthSelect.addClass(
                'border border-gray-300 rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500'
            );

            // Style pagination buttons
            const paginationButtons = $('div.dataTables_paginate a');
            paginationButtons.addClass(
                'px-3 py-1 rounded-md text-sm hover:bg-brand-500 hover:text-white transition'
            );

            // Active pagination button
            $('div.dataTables_paginate .current').addClass('bg-brand-500 text-white');
        });

        // setup filter search function
        $.fn.dataTable.ext.search.push(function (settings, data) {
            const maintenanceDate = new Date(data[5]); // index ke 5 (mulai dari 0)
            const start = fromDate ? new Date(fromDate) : null;
            const end = toDate ? new Date(toDate) : null;

            if ((!start || maintenanceDate >= start) && (!end || maintenanceDate <= end)) {
                return true;
            }
            return false;
        });

        return () => {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $table.destroy();
                $.fn.DataTable.ext.search.pop();
            }
        };
    }, [fromDate, toDate]);

    const handleFilter = () => {
        const table = $(tableRef.current).DataTable();
        table.draw();
    };

    return (
        <div className='space-y-4'>
            {/* Filter Section */}
            <div className='flex items-center space-x-4'>
                <div className='flex flex-col'>
                    <label className='text-sm text-gray-700 dark:text-white/80'>From</label>
                    <input
                        type='date'
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className='border rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700'
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-sm text-gray-700 dark:text-white/80'>To</label>
                    <input
                        type='date'
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className='border rounded-md px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700'
                    />
                </div>
                <button
                    onClick={handleFilter}
                    className='self-end px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-600'>
                    Filter
                </button>
            </div>

            {/* Table Section */}
            <div className='overflow-hidden rounded-xl border border-gray-200 bg-white/[0.05]'>
                <div className='max-w-full overflow-x-auto px-2 py-2'>
                    <table ref={tableRef} className='display w-full'></table>
                </div>
            </div>
        </div>
    );
}
