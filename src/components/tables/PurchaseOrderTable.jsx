import { useEffect, useRef } from 'react';
import $ from 'jquery';

export default function PurchaseOrder({ onEditPurchaseOrder, onDeletePurchaseOrder }) {
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
                url: '/api/purchase-orders',
                type: 'GET',
                dataSrc: function (json) {
                    console.log('Data JSON: ', json);
                    return json.data;
                },
                error: function (xhr, error, thrown) {
                    console.error('AJAX Error: ', error, thrown);
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
                    title: 'Order Date',
                    data: 'order_date',
                    width: '15%',
                    render: (data) => {
                        const orderDate = new Date(data);
                        const formattedDate = orderDate.toDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                        });
                        return `<div class='text-sm font-medium text-gray-700 dark:text-white/90'>${formattedDate}</div>`;
                    },
                },
                {
                    title: 'Total Cost',
                    data: 'total_soct',
                    width: '15%',
                    render: (data) => {
                        const formattedCost = new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                            minimumFractionDigits: 0,
                        }).format(data);
                        return `<div class='text-sm font-medium text-gray-700 dark:text-white/90'>${formattedCost}</div>`;
                    },
                },
                {
                    title: 'Supplier',
                    data: 'supplier_name',
                    width: '15%',
                    render: (data) =>
                        `<div class='text-sm font-medium text-gray-700 dark:text-white/90'>${data}</div>`,
                },
                {
                    title: 'Status',
                    data: 'status',
                    width: '15%',
                    render: (data) =>
                        `<div class='text-sm font-medium text-gray-700 dark:text-white/90'>${data}</div>`,
                },
                {
                    title: 'Action',
                    data: 'id',
                    width: '15%',
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
            lengthMenu: [5, 10, 25, 50],
            searching: true,
            ordering: true,
            info: true,
            autoWith: false,
            dom: `<"flex justify-between items-center mb-4"<"flex-1"f><"flex-none"l>>rt<"flex justify-between items-center mt-4"<"flex-1"i><"flex-none"p>>`,
            language: {
                search: '_INPUT_',
                searchPlaceholder: 'Search purchase orders...',
                lengthMenu: 'Show _MENU_ purchase orders',
                info: 'Showing _START_ to _END_ of _TOTAL_ purchase order',
                infoEmpty: 'No purchase orders found',
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
            const purchaseOrderId = $(this).data('id');
            if (onDeletePurchaseOrder) onDeletePurchaseOrder(purchaseOrderId);
        });

        $(tableRef.current).on('click', '.action-edit', function () {
            const purchaseOrderId = $(this).data('id');
            const rowData = dataTable.row($(this).parents('tr')).data();
            if (onEditPurchaseOrder) onEditPurchaseOrder(rowData);
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
