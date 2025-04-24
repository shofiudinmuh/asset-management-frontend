import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import PurchaseOrderTable from '../../components/tables/PurchaseOrderTable';
import Modal from '../../components/ui/Modal';
import Label from '../../components/form/Label';
import InputField from '../../components/form/input/InputField';

export default function PuchaseOrderPage() {
    const [purchaseOrder, setPurchaseOrder] = useState([]);
    const [purchaseOrderDate, setPurchaseOrderDate] = useState('');
    const [purchaseOrderCost, setPurchaseOrderCost] = useState('');
    const [purchaseOrderSupplier, setPurchaseOrderSupplier] = useState('');
    const [purchaseOrderStatus, setPurchaseOrderStatus] = useState('');
    const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const resetForm = () => {
        setPurchaseOrder('');
        setPurchaseOrderDate('');
        setPurchaseOrderCost('');
        setPurchaseOrderSupplier('');
        setPurchaseOrderStatus('');
        setSelectedPurchaseOrder('');
    };

    const handleAddOrUpdatePurchaseOrder = () => {
        if (selectedPurchaseOrder) {
            // edit
            setPurchaseOrder((prevPurchaseOrder) => {
                prevPurchaseOrder.map((purchaseOrder) =>
                    purchaseOrder.id === selectedPurchaseOrder.id
                        ? {
                              ...purchaseOrder,
                              order_date: purchaseOrderDate,
                              total_soct: purchaseOrderCost,
                              supplier: purchaseOrderSupplier,
                              status: purchaseOrderStatus,
                          }
                        : purchaseOrder
                );
            });
        } else {
            // create new purchase order
            const newPurchaseOrder = {
                order_date: purchaseOrderDate,
                total_soct: purchaseOrderCost,
                supplier: purchaseOrderSupplier,
                status: purchaseOrderStatus,
            };

            setPurchaseOrder([...purchaseOrder, { ...newPurchaseOrder }]);
        }
        closeModal();
        resetForm();
    };

    const handleEditPurchaseOrder = (purchaseOrder) => {
        setSelectedPurchaseOrder(purchaseOrder);
        setPurchaseOrderDate(purchaseOrder.order_date);
        setPurchaseOrderCost(purchaseOrder.total_soct);
        setPurchaseOrderSupplier(purchaseOrder.supplier.name);
        setPurchaseOrderStatus(purchaseOrder.status);
        openModal();
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

                    <PurchaseOrderTable onEditPurchaseOrder={handleEditPurchaseOrder} />
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
                <form action=''>
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
                            onChange={(e) => purchaseOrderDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Total Cost<span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='numeric'
                            id='total_soct'
                            name='total_soct'
                            value={purchaseOrderCost}
                            placeholder='Enter total cost'
                            onChange={(e) => purchaseOrderCost(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Supplier<span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='supplier'
                            name='supplier'
                            value={purchaseOrderSupplier}
                            placeholder='Enter supplier'
                            onChange={(e) => setPurchaseOrderSupplier(e.target.value)}
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
                            onChange={(e) => purchaseOrderStatus(e.target.value)}
                        />
                    </div>
                </form>
            </Modal>
        </>
    );
}
