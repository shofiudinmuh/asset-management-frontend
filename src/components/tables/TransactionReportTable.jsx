import $ from 'jquery';
import { useEffect, useState, useRef } from 'react';
import 'datatables.net-buttons';
import 'datatables.net-buttons/js/buttons.print.min';
import DatePicker from '../form/date-picker';

const transactionData = [
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
        user: {
            id: 2,
            name: 'User Baru',
            email: 'user2@am.test',
            created_at: '2025-03-29 07:32:04',
        },
        transaction_type: 'Pinjam',
        transaction_date: '2025-03-06T00:00:00.000000Z',
        location: {
            id: 4,
            name: 'Surabaya 4',
            address: 'Jalan Ir Soekarno No 19',
            created_at: '2025-03-30T05:02:08.000000Z',
            update_at: '2025-03-30T05:02:08.000000Z',
        },
        created_at: '2025-04-06T07:50:18.000000Z',
        updated_at: '2025-04-06T07:50:18.000000Z',
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
        user: {
            id: 2,
            name: 'User Baru',
            email: 'user2@am.test',
            created_at: '2025-03-29 07:32:04',
        },
        transaction_type: 'Pinjam',
        transaction_date: '2025-03-06T00:00:00.000000Z',
        location: {
            id: 4,
            name: 'Surabaya 4',
            address: 'Jalan Ir Soekarno No 19',
            created_at: '2025-03-30T05:02:08.000000Z',
            update_at: '2025-03-30T05:02:08.000000Z',
        },
        created_at: '2025-04-06T07:50:53.000000Z',
        updated_at: '2025-04-06T07:50:53.000000Z',
    },
    {
        id: 3,
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
        user: {
            id: 4,
            name: 'User Test 4',
            email: 'user-test4@am.test',
            created_at: '2025-03-29 14:21:50',
        },
        transaction_type: 'Pinjam',
        transaction_date: '2025-03-06T00:00:00.000000Z',
        location: {
            id: 4,
            name: 'Surabaya 4',
            address: 'Jalan Ir Soekarno No 19',
            created_at: '2025-03-30T05:02:08.000000Z',
            update_at: '2025-03-30T05:02:08.000000Z',
        },
        created_at: '2025-04-06T07:51:40.000000Z',
        updated_at: '2025-04-06T07:51:40.000000Z',
    },
];

export default function TransactionReportTable() {
    const tableRef = useRef(null);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    useEffect(() => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }

        const $table = $(tableRef.current).DataTable({
            data: transactionData,
            columns: [
                {
                    title: 'No',
                    data: 'id',
                    className: 'text-start',
                    width: '5%',
                },
                {
                    title: 'Asset Name',
                    data: 'asset',
                    width: '20%',
                    render: (data) => `
                        <div class='text-sm font-medium text-gray-700 dark:text-white/90'>
                            ${data?.name || '-'}
                        </div>`,
                },
                {
                    title: 'Location',
                    data: 'location',
                    width: '20%',
                    render: (data) => `
                        <div class='text-sm font-medium text-gray-700 dark:text-white/90'>
                            ${data?.name || '-'}
                        </div>`,
                },
                {
                    title: 'User',
                    data: 'user',
                    width: '20%',
                    render: (data) => `
                        <div class='text-sm font-medium text-gray-700 dark:text-white/90'>
                            ${data?.name || '-'}
                        </div>`,
                },
                {
                    title: 'Transaction Type',
                    data: 'transaction_type',
                    width: '20%',
                    render: (data) => `
                        <div class='text-sm font-medium text-gray-700 dark:text-white/90'>
                            ${data || '-'}
                        </div>`,
                },
                {
                    title: 'Transaction Date',
                    data: 'transaction_date',
                    width: '15%',
                    render: (data) => `
                        <div class='text-sm font-medium text-gray-700 dark:text-white/90'>
                            ${data || '-'}
                        </div>`,
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
            const transactionDate = new Date(data[5]); // index ke 5 (mulai dari 0)
            const start = fromDate ? new Date(fromDate) : null;
            const end = toDate ? new Date(toDate) : null;

            if ((!start || transactionDate >= start) && (!end || transactionDate <= end)) {
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
