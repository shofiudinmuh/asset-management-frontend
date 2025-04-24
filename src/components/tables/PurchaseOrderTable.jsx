import { useEffect, useRef } from 'react';
import $ from 'jquery';

const purchaseOrderData = [
    {
        id: 1,
        order_date: '2025-04-01T00:00:00.000000Z',
        total_soct: '250000.00',
        status: 'completed',
        created_at: '2025-04-01T08:00:00.000000Z',
        updated_at: '2025-04-01T08:15:00.000000Z',
        supplier: {
            id: 1,
            name: 'Alexander Arnold',
            contact_person: 'Roberto Manchini',
            phone: '09871243627',
            email: 'trent-arnold@am.test',
            address: 'Surabaya Timur',
            created_at: '2025-03-29T14:37:40.000000Z',
            updated_at: '2025-03-29T14:37:40.000000Z',
        },
    },
    {
        id: 2,
        order_date: '2025-04-02T00:00:00.000000Z',
        total_soct: '145000.00',
        status: 'pending',
        created_at: '2025-04-02T09:00:00.000000Z',
        updated_at: '2025-04-02T09:30:00.000000Z',
        supplier: {
            id: 2,
            name: 'Kevin De Bruyne',
            contact_person: 'Vincent Kompany',
            phone: '08123456789',
            email: 'kevin@kdb.test',
            address: 'Jakarta Barat',
            created_at: '2025-03-30T10:00:00.000000Z',
            updated_at: '2025-03-30T10:00:00.000000Z',
        },
    },
    {
        id: 3,
        order_date: '2025-04-03T00:00:00.000000Z',
        total_soct: '175500.00',
        status: 'cancelled',
        created_at: '2025-04-03T11:10:00.000000Z',
        updated_at: '2025-04-03T11:40:00.000000Z',
        supplier: {
            id: 3,
            name: 'Lionel Messi',
            contact_person: 'Luis Enrique',
            phone: '08211223344',
            email: 'leo@messi.test',
            address: 'Bandung',
            created_at: '2025-03-28T09:00:00.000000Z',
            updated_at: '2025-03-28T09:00:00.000000Z',
        },
    },
    {
        id: 4,
        order_date: '2025-04-04T00:00:00.000000Z',
        total_soct: '360000.00',
        status: 'completed',
        created_at: '2025-04-04T10:00:00.000000Z',
        updated_at: '2025-04-04T10:15:00.000000Z',
        supplier: {
            id: 4,
            name: 'Cristiano Ronaldo',
            contact_person: 'Zinedine Zidane',
            phone: '0833557799',
            email: 'ronaldo@cr7.test',
            address: 'Yogyakarta',
            created_at: '2025-03-27T08:00:00.000000Z',
            updated_at: '2025-03-27T08:00:00.000000Z',
        },
    },
    {
        id: 5,
        order_date: '2025-04-05T00:00:00.000000Z',
        total_soct: '195000.00',
        status: 'pending',
        created_at: '2025-04-05T12:00:00.000000Z',
        updated_at: '2025-04-05T12:00:00.000000Z',
        supplier: {
            id: 5,
            name: 'Neymar Jr',
            contact_person: 'Tite',
            phone: '08441231234',
            email: 'neymar@brazil.test',
            address: 'Surabaya',
            created_at: '2025-03-26T13:00:00.000000Z',
            updated_at: '2025-03-26T13:00:00.000000Z',
        },
    },
    {
        id: 6,
        order_date: '2025-04-06T00:00:00.000000Z',
        total_soct: '275000.00',
        status: 'completed',
        created_at: '2025-04-06T09:00:00.000000Z',
        updated_at: '2025-04-06T09:10:00.000000Z',
        supplier: {
            id: 6,
            name: 'Kylian Mbappe',
            contact_person: 'Didier Deschamps',
            phone: '0898777666',
            email: 'mbappe@psg.test',
            address: 'Malang',
            created_at: '2025-03-25T12:00:00.000000Z',
            updated_at: '2025-03-25T12:00:00.000000Z',
        },
    },
    {
        id: 7,
        order_date: '2025-04-07T00:00:00.000000Z',
        total_soct: '310000.00',
        status: 'pending',
        created_at: '2025-04-07T08:00:00.000000Z',
        updated_at: '2025-04-07T08:30:00.000000Z',
        supplier: {
            id: 7,
            name: 'Erling Haaland',
            contact_person: 'Pep Guardiola',
            phone: '08213131313',
            email: 'haaland@mcfc.test',
            address: 'Denpasar',
            created_at: '2025-03-24T10:00:00.000000Z',
            updated_at: '2025-03-24T10:00:00.000000Z',
        },
    },
    {
        id: 8,
        order_date: '2025-04-08T00:00:00.000000Z',
        total_soct: '130000.00',
        status: 'cancelled',
        created_at: '2025-04-08T14:00:00.000000Z',
        updated_at: '2025-04-08T14:15:00.000000Z',
        supplier: {
            id: 8,
            name: 'Harry Kane',
            contact_person: 'Ange Postecoglou',
            phone: '08778888999',
            email: 'hkane@munich.test',
            address: 'Semarang',
            created_at: '2025-03-23T09:00:00.000000Z',
            updated_at: '2025-03-23T09:00:00.000000Z',
        },
    },
    {
        id: 9,
        order_date: '2025-04-09T00:00:00.000000Z',
        total_soct: '225000.00',
        status: 'completed',
        created_at: '2025-04-09T11:30:00.000000Z',
        updated_at: '2025-04-09T11:45:00.000000Z',
        supplier: {
            id: 9,
            name: 'Sadio Mane',
            contact_person: 'Aliou Cissé',
            phone: '08110000001',
            email: 'mane@senegal.test',
            address: 'Makassar',
            created_at: '2025-03-22T08:00:00.000000Z',
            updated_at: '2025-03-22T08:00:00.000000Z',
        },
    },
    {
        id: 10,
        order_date: '2025-04-10T00:00:00.000000Z',
        total_soct: '180000.00',
        status: 'pending',
        created_at: '2025-04-10T15:00:00.000000Z',
        updated_at: '2025-04-10T15:00:00.000000Z',
        supplier: {
            id: 10,
            name: 'Luka Modric',
            contact_person: 'Zlatko Dalić',
            phone: '08133445566',
            email: 'modric@rm.test',
            address: 'Bekasi',
            created_at: '2025-03-21T10:00:00.000000Z',
            updated_at: '2025-03-21T10:00:00.000000Z',
        },
    },
];

export default function PurchaseOrder({ onEditPurchaseOrder, data }) {
    const tableRef = useRef(null);

    useEffect(() => {
        if ($.fn.DataTable.isDataTable(tableRef.current)) {
            $(tableRef.current).DataTable().destroy();
        }

        const $table = $(tableRef.current).DataTable({
            data: purchaseOrderData,
            columns: [
                { title: 'No', data: 'id', className: 'text-start', width: '5%' },
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
                    data: 'supplier',
                    width: '15%',
                    render: (supplier) =>
                        `<div class='text-sm font-medium text-gray-700 dark:text-white/90'>${supplier.name}</div>`,
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
            console.log('Delete purchase order : ', purchaseOrderId);
        });

        $(tableRef.current).on('click', '.action-edit', function () {
            const purchaseOrderId = $(this).data('id');
            const selectedPurchaseOrder = purchaseOrderData.find(
                (purchaseOrder) => purchaseOrder.id === purchaseOrderId
            );
            if (selectedPurchaseOrder) {
                onEditPurchaseOrder(selectedPurchaseOrder);
            }
        });

        return () => {
            if ($.fn.DataTable.isDataTable(tableRef.current)) {
                $table.destroy();
            }
        };
    }, []);

    return (
        <div className='overflow-hidden rounded-xl border border-gray-200 bg-white/[0.05] dark: bg-gray-800'>
            <div className='max-w-full overflow-x-auto px-2 py-2'>
                <table className='display w-full' ref={tableRef}></table>
            </div>
        </div>
    );
}
