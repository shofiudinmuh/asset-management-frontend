import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import PurchaseOrderTable from '../../components/tables/PurchaseOrderTable';
import Modal from '../../components/ui/Modal';
import Label from '../../components/form/Label';
import InputField from '../../components/form/input/InputField';
import {
    createPurchaseOrder,
    deletePurchaseOrder,
    updatePurchaseOrder,
} from '../../api/purchaseOrderApi';
import { get } from 'jquery';
import { getSupplierSearch } from '../../api/supplierApi';
import AsyncSelect from 'react-select/async';

export default function PuchaseOrderPage() {
    const [purchaseOrderDate, setPurchaseOrderDate] = useState('');
    const [purchaseOrderCost, setPurchaseOrderCost] = useState('');
    const [purchaseOrderSupplier, setPurchaseOrderSupplier] = useState('');
    const [purchaseOrderStatus, setPurchaseOrderStatus] = useState('');
    const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const loadSupplier = async (inputValue) => {
        try {
            const suppliers = await getSupplierSearch(inputValue);
            return suppliers.data.data.map((supplier) => ({
                label: supplier.name,
                value: supplier.id,
            }));
        } catch (error) {
            console.error('Error fetching suppliers:', error);
            return [];
        }
    };
    const resetForm = () => {
        setPurchaseOrderDate('');
        setPurchaseOrderCost('');
        setPurchaseOrderSupplier('');
        setPurchaseOrderStatus('');
        setSelectedPurchaseOrder('');
    };

    const handleAddOrUpdatePurchaseOrder = async () => {
        const purchaseOrderData = {
            order_date: purchaseOrderDate,
            total_soct: purchaseOrderCost,
            supplier_id: purchaseOrderSupplier?.value ?? purchaseOrderSupplier,
            status: purchaseOrderStatus,
        };

        try {
            if (selectedPurchaseOrder) {
                await updatePurchaseOrder(selectedPurchaseOrder.id, purchaseOrderData);
            } else {
                await createPurchaseOrder(purchaseOrderData);
            }

            closeModal();
            resetForm();
        } catch (error) {
            console.error('Error adding/updating purchase order:', error);
        }
    };

    const handleEditPurchaseOrder = (purchaseOrder) => {
        setSelectedPurchaseOrder(purchaseOrder);
        setPurchaseOrderDate(purchaseOrder.order_date);
        setPurchaseOrderCost(purchaseOrder.total_soct);
        setPurchaseOrderSupplier(purchaseOrder.supplier.name);
        setPurchaseOrderStatus(purchaseOrder.status);
        openModal();
    };

    const handleDeletePurchaseOrder = async (id) => {
        if (confirm('Are you sure you want to delete this purchase order?')) {
            try {
                await deletePurchaseOrder(id);
            } catch (error) {
                console.log('Error deleting purchase order:', error);
            }
        }
    };

    return (
        <>
            <PageMeta title='Purchase Orders | Asset & Resource Management System' />

            <PageBreadCrumb pageTitle='Purchase Orders' />

            <div className='space-y-2 px-2 mx-2 dark:bg-gray-800'>
                <ComponentCard>
                    <button
                        className='px-4 py-2 bg-brand-500 text-white hover:bg-brand-700 rounded-md transition-colors'
                        onClick={() => {
                            resetForm();
                            openModal();
                        }}>
                        Add New Purchase Order
                    </button>

                    <PurchaseOrderTable
                        onEditPurchaseOrder={handleEditPurchaseOrder}
                        onDeletePurchaseOrder={handleDeletePurchaseOrder}
                    />
                </ComponentCard>
            </div>

            {/* modal */}

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    closeModal();
                    resetForm();
                }}
                className='max-w-xl p-6'>
                <div className='flex flex-col gap-4'>
                    <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                        {selectedPurchaseOrder ? 'Edit Purchase Order' : 'Add Purchase Order'}
                    </h3>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddOrUpdatePurchaseOrder();
                    }}>
                    <div>
                        <Label>
                            Order Date <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='date'
                            id='order_date'
                            name='order_date'
                            value={purchaseOrderDate}
                            placeholder='Choose date'
                            onChange={(e) => setPurchaseOrderDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Total Cost<span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='number'
                            id='total_soct'
                            name='total_soct'
                            value={purchaseOrderCost}
                            placeholder='Enter total cost'
                            onChange={(e) => setPurchaseOrderCost(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Supplier<span className='text-error-500'>*</span>
                        </Label>
                        {/* <InputField
                            type='text'
                            id='supplier'
                            name='supplier'
                            value={purchaseOrderSupplier}
                            placeholder='Enter supplier'
                            onChange={(e) => setPurchaseOrderSupplier(e.target.value)}
                        /> */}

                        <AsyncSelect
                            cacheOptions
                            loadOptions={loadSupplier}
                            defaultOptions
                            value={purchaseOrderSupplier}
                            onChange={(value) => setPurchaseOrderSupplier(value)}
                            placeholder='Select supplier'
                        />
                    </div>
                    <div>
                        <Label>
                            Status<span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='status'
                            name='status'
                            value={purchaseOrderStatus}
                            placeholder='Choose status'
                            onChange={(e) => setPurchaseOrderStatus(e.target.value)}
                        />
                    </div>

                    <div className='flex justify-end gap-2 mt-4'>
                        <button
                            onClick={() => {
                                closeModal();
                                resetForm();
                            }}
                            className='px-4 py-2 border rounded text-gray-700'>
                            Cancel
                        </button>
                        <button
                            type='submit'
                            className='px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-700'>
                            {selectedPurchaseOrder ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
