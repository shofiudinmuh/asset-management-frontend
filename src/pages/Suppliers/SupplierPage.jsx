import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import SupplierTable from '../../components/tables/SupplierTable';
import Modal from '../../components/ui/Modal';
import Label from '../../components/form/Label';
import InputField from '../../components/form/input/InputField';

export default function SupplierPage() {
    const [suppliers, setSuppliers] = useState([]);
    const [supplierName, setSupplierName] = useState('');
    const [supplierContact, setSupplierContact] = useState('');
    const [supplierEmail, setSupplierEmail] = useState('');
    const [supplierAddress, setSupplierAddress] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const resetForm = () => {
        setSupplierName('');
        setSupplierContact('');
        setSupplierEmail('');
        setSupplierAddress('');
        setSelectedSupplier('');
    };

    const handleAddOrUpdateSupplier = () => {
        if (selectedSupplier) {
            // edit supplier
            setSuppliers((prevSuppliers) => {
                prevSuppliers.map((supplier) =>
                    supplier.id === selectedSupplier.id
                        ? {
                              ...supplier,
                              name: supplierName,
                              contact_person: supplierContact,
                              email: supplierEmail,
                              address: supplierAddress,
                          }
                        : supplier
                );
            });
        } else {
            // add new supplier
            const newSupplier = {
                name: supplierName,
                contact_person: supplierContact,
                email: supplierEmail,
                address: supplierAddress,
            };

            setSuppliers([...suppliers, { ...newSupplier }]);
        }
        closeModal();
        resetForm();
    };

    const handleEditSupplier = (supplier) => {
        setSelectedSupplier(supplier);
        setSupplierName(supplier.name);
        setSupplierContact(supplier.contact_person);
        setSupplierEmail(supplier.email);
        setSupplierAddress(supplier.address);
        openModal();
    };

    return (
        <>
            <PageMeta
                title='Suppliers | Asset & Resource Management System'
                description='Suppliers'
            />

            <PageBreadCrumb pageTitle='Suppliers' />

            <div className='space-y-2 px-2 mx-2 dark:bg-gray-800'>
                <ComponentCard>
                    <button
                        className='px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-brand-700 transition-colors'
                        onClick={() => {
                            resetForm();
                            openModal();
                        }}>
                        Add New Supplier
                    </button>
                    <SupplierTable onEditSupplier={handleEditSupplier} />
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
                        {selectedSupplier ? 'Edit Supplier' : 'Add New Supplier'}
                    </h3>
                </div>
                <form action=''>
                    <div>
                        <Label>
                            Name <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='name'
                            name='name'
                            value={supplierName}
                            placeholder='Enter supplier name'
                            onChange={(e) => setSupplierName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Contact Person <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='contact_person'
                            name='contact_person'
                            value={supplierContact}
                            placeholder='Enter supplier contact person'
                            onChange={(e) => setSupplierContact(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Email <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='email'
                            id='email'
                            name='email'
                            value={supplierEmail}
                            placeholder='Enter supplier email'
                            onChange={(e) => setSupplierEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Address <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='address'
                            name='address'
                            value={supplierAddress}
                            placeholder='Enter supplier address'
                            onChange={(e) => setSupplierAddress(e.target.value)}
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
                        <button className='px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600'>
                            {selectedSupplier ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
