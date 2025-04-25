import $ from 'jquery';
import { useEffect, useRef } from 'react';

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

export default function TransactionTable({ onEditTransaction, data }) {
    const tableRef = useRef(null);

    useEffect(() => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }

        const $table = $(tableRef.current).DataTable({
            data: transactionData,
            columns: [
                { title: 'No', data: 'id', width: '5%', className: 'text-start text-sm' },
                {
                    title: 'Name',
                    data: 'asset',
                    width: '15%',
                    render: (asset) =>
                        `<div class='text-sm font-medium text-gray-700 dark:text-white/90'>${asset.name}</div>`,
                },
                {
                    title: 'Serial Number',
                    data: 'asset',
                    width: '15%',
                    render: (asset) =>
                        `<div class='test-sm font-medium text-gray-700 dark:text-white/90'>${asset.serial_number}</div>`,
                },
                {
                    title: 'User',
                    data: 'user',
                    width: '15%',
                    render: (user) =>
                        `<div class='text-sm font-medium text-gray-700 dark:text-white/90'>${user.name}</div>`,
                },
                {
                    title: 'Location',
                    data: 'location',
                    width: '15%',
                    render: (location) =>
                        `<div class='text-sm font-medium text-gray-700 dark:text-white/90'>${location.name}</div>`,
                },
                {
                    title: 'Transaction Type',
                    data: 'transaction_type',
                    width: '10%',
                    render: (data) =>
                        `<div class='text-sm font-medium text-gray-700 dark:text-white/90'>${data}</div>`,
                },
                {
                    title: 'Transaction Date',
                    data: 'transaction_date',
                    width: '10%',
                    render: (data) => {
                        const transactionDate = new Date(data);
                        const formattedDate = transactionDate.toDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minutes: '2-digit',
                        });
                        return `<div class='text-sm font-medium text-gray-700 dark:text-white/90'>${formattedDate}</div>`;
                    },
                },
                {
                    title: 'Action',
                    data: 'id',
                    width: '10%',
                    render: (data, type, row) =>
                        `<div className='flex space-x-2'>
                            <button data-id='${row.id}' class='action-edit text-sm font-medium px-3 py-1 bg-brand-500 text-white hover:bg-brand-700 rounded'>Edit</button>
                            <button data-id='${row.id}' class='action-delete text-sm font-medium px-3 py-1 bg-error-500 text-white hover:bg-error-700 rounded'>Delete</button>
                        </div>`,
                },
            ],
            responsive: true,
            paging: true,
            pageLength: 10,
            lengthMenu: [5, 10, 25, 100],
            searching: true,
            ordering: true,
            info: true,
            autoWidth: false,
            dom: `<"flex justify-between items-center mb-4"<"flex-1"f><"flex-none"l>>rt<"flex justify-between items-center mt-4"<"flex-1"i><"flex-none"p>>`,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search transactions...',
                langthMenu: 'Show _MENU_ transactions',
                info: 'Showing _START_ to _END_ of _TOTAL_ transactions',
                infoEmpty: 'No transactions found',
                paginate: {
                    firts: 'First',
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

                $('.dataTables_filter input').addClass(
                    'px-3 py-2 border rounded-md bg-white text-sm shadow-theme-xs text-gray-800 ' +
                        'placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden ' +
                        'focus:ring-3 focus:ring-brand-500/10 hover:border-brand-700 ' +
                        'dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 ' +
                        'dark:placeholder:text-white/30 dark:focus:border-brand-800 dark:hover:border-brand-700 !important'
                );

                $('.dataTables_length select').addClass(
                    'px-2 py-1 border rounded-md text-sm text-gray-700 dark:text-gray-400 dark:bg-gray-800'
                );
                $('.dataTables_info').addClass('text-sm text-gray-500 dark:text-gray-400');

                const $paginate = $('.dataTables_paginate');
                $paginate.addClass('text-sm dark:text-gray-300');

                $paginate
                    .find('a')
                    .addClass(
                        'px-3 py-1 rounded hover:bg-brand-500/10 hover:text-brand-700 transition-colors'
                    );

                $paginate.find('.current').addClass('bg-brand-500 text-white rounded');
            },
        });

        $(tableRef.current).on('click', '.action-delete', function () {
            const transactionId = $(this).data('id');
            console.log('Delete transactions : ', transactionId);
        });

        $(tableRef.current).on('click', '.action-edit', function () {
            const transactionId = $(this).data('id');
            const selectedTransaction = transactionData.find(
                (transaction) => transaction.id === transactionId
            );
            if (selectedTransaction) {
                onEditTransaction(selectedTransaction);
            }
        });

        return () => {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $table.destroy();
            }
        };
    }, []);

    return (
        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white/[0.05]'>
            <div className='max-w-full overflow-x-auto px-2 py-2'>
                <table className='display w-full' ref={tableRef}></table>
            </div>
        </div>
    );
}
