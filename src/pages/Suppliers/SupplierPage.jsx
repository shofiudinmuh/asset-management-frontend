import { useEffect, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import SupplierTable from '../../components/tables/SupplierTable';
import Modal from '../../components/ui/Modal';
import Label from '../../components/form/Label';
import InputField from '../../components/form/input/InputField';
import {
    createSupplier,
    deleteSupplier,
    getSuppliers,
    updateSupplier,
} from '../../api/supplierApi';

export default function SupplierPage() {
    const [suppliers, setSuppliers] = useState([]);
    const [supplierName, setSupplierName] = useState('');
    const [supplierContact, setSupplierContact] = useState('');
    const [supplierEmail, setSupplierEmail] = useState('');
    const [supplierPhone, setSupplierPhone] = useState('');
    const [supplierAddress, setSupplierAddress] = useState('');
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        fetchSuppliers();
    }, []);

    const fetchSuppliers = async () => {
        try {
            const supplier = await getSuppliers();
            setSuppliers(supplier.data.data.data);
        } catch (error) {
            console.log('Failed to fetch suppliers', error);
        }
    };
    const resetForm = () => {
        setSupplierName('');
        setSupplierContact('');
        setSupplierEmail('');
        setSupplierAddress('');
        setSupplierPhone('');
        setSelectedSupplier('');
    };

    const handleAddOrUpdateSupplier = async () => {
        const supplierData = {
            name: supplierName,
            contact_person: supplierContact,
            email: supplierEmail,
            address: supplierAddress,
            phone: supplierPhone,
        };

        try {
            if (selectedSupplier) {
                await updateSupplier(selectedSupplier.id, supplierData);
            } else {
                await createSupplier(supplierData);
            }

            await fetchSuppliers();
            closeModal();
            resetForm();
        } catch (error) {
            console.log('Failed to create supplier', error);
        }
    };

    const handleEditSupplier = (supplier) => {
        setSelectedSupplier(supplier);
        setSupplierName(supplier.name);
        setSupplierContact(supplier.contact_person);
        setSupplierEmail(supplier.email);
        setSupplierPhone(supplier.phone);

        setSupplierAddress(supplier.address);
        openModal();
    };

    const handleDeleteSupplier = async (id) => {
        if (confirm('Are you sure want to delete this supplier?')) {
            try {
                await deleteSupplier(id);
                await fetchSuppliers();
            } catch (error) {
                console.error('Failed to delete supplier', error);
            }
        }
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
                    <SupplierTable
                        data={suppliers}
                        onDeleteSupplier={handleDeleteSupplier}
                        onEditSupplier={handleEditSupplier}
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
                        {selectedSupplier ? 'Edit Supplier' : 'Add New Supplier'}
                    </h3>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddOrUpdateSupplier();
                    }}>
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
                            Phone<span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='phone'
                            name='phone'
                            value={supplierPhone}
                            placeholder='Enter supplier phone contact'
                            onChange={(e) => setSupplierPhone(e.target.value)}
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
                        <button
                            type='submit'
                            className='px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600'>
                            {selectedSupplier ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
