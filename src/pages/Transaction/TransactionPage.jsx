import { useEffect, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import PageMeta from '../../components/common/PageMeta';
import TransactionTable from '../../components/tables/TransactionTable';
import InputField from '../../components/form/input/InputField';
import Label from '../../components/form/Label';
import Modal from '../../components/ui/Modal';
import ComponentCard from '../../components/common/ComponentCard';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import { createTransaction, deleteTransaction, updateTransaction } from '../../api/transactionApi';
import { getAssetSearch } from '../../api/assetApi';
import { getLocationSearch } from '../../api/locationApi';
import AsyncSelect from 'react-select/async';
import { getUserSearch } from '../../api/usersApi';
import Select from '../../components/form/Select';

export default function TransactionPage() {
    const [transaction, setTransaction] = useState([]);
    const [transactionName, setTransactionName] = useState('');
    const [transactionUser, setTransactionUser] = useState('');
    const [transactionLocation, setTransactionLocation] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    const [transactionType, setTransactionType] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const loadPersons = async (inputValue) => {
        try {
            const response = await getUserSearch(inputValue);
            return response.data.data.map((user) => ({
                value: user.id,
                label: user.name,
            }));
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    };

    const loadAssets = async (inputValue) => {
        try {
            const response = await getAssetSearch(inputValue);
            return response.data.data.map((asset) => ({
                value: asset.id,
                label: asset.name,
            }));
        } catch (error) {
            console.error('Error fetching assets:', error);
            return [];
        }
    };

    const loadLocations = async (inputValue) => {
        try {
            const response = await getLocationSearch(inputValue);
            return response.data.data.map((location) => ({
                value: location.id,
                label: location.name,
            }));
        } catch (error) {
            console.error('Error fetching locations:', error);
            return [];
        }
    };

    const resetForm = () => {
        setTransactionName('');
        setTransactionUser('');
        setTransactionLocation('');
        setSelectedTransaction('');
        setTransactionDate('');
    };

    const handleAddOrUpdateTransaction = async () => {
        const transactionData = {
            asset_id: transactionName?.value ?? transactionName,
            user_id: transactionUser?.value ?? transactionUser,
            transaction_type: transactionType,
            transaction_date: transactionDate,
            location_id: transactionLocation?.value ?? transactionLocation,
        };

        try {
            if (selectedTransaction) {
                await updateTransaction(selectedTransaction.id, transactionData);
            } else {
                await createTransaction(transactionData);
            }

            closeModal();
            resetForm();
        } catch (error) {
            console.error('Error adding/updating transaction:', error);
        }
    };

    const handleEditTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setTransactionName({ value: transaction.asset.id, label: transaction.asset.name });
        setTransactionUser({ value: transaction.user_id, label: transaction.user.name });
        setTransactionType(transaction.transaction_type);
        setTransactionLocation({
            value: transaction.location_id,
            label: transaction.location.name,
        });
        setTransactionDate(transaction.transaction_date);
        openModal();
    };

    const handleDeleteTransaction = async (id) => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            try {
                await deleteTransaction(id);
            } catch (error) {
                console.log('Failed to delete transaction', error);
            }
        }
    };

    return (
        <>
            <PageMeta title='Transactions | Asset & Resource Management System' />

            <PageBreadCrumb pageTitle='Transactions' />

            <div className='space-y-2 px-2 mx-2 dark:bg-gray-800'>
                <ComponentCard>
                    <button
                        className='px-4 py-2 bg-brand-500 text-white hover:bg-brand-700 rounded-md transition-colors'
                        onClick={() => {
                            resetForm();
                            openModal();
                        }}>
                        Add New Transaction
                    </button>

                    <TransactionTable
                        onEditTransaction={handleEditTransaction}
                        onDeleteTransaction={handleDeleteTransaction}
                    />
                </ComponentCard>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    closeModal();
                    resetForm();
                }}
                className='max-w-xl p-6'>
                <div className='flex flex-col gap-4'>
                    <h3 className='text-lg font-semibold text-gray-800 dark:text-white'>
                        {selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
                    </h3>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddOrUpdateTransaction();
                    }}>
                    <div>
                        <Label>
                            Name <span className='text-error-500'>*</span>
                        </Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={loadAssets}
                            defaultOptions
                            value={transactionName}
                            onChange={(value) => setTransactionName(value)}
                            placeholder='Select asset'
                        />
                    </div>
                    <div>
                        <Label>
                            User<span className='text-error-500'>*</span>
                        </Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={loadPersons}
                            defaultOptions
                            value={transactionUser}
                            onChange={(value) => setTransactionUser(value)}
                            placeholder='Select user'
                        />
                    </div>
                    <div>
                        <Label>
                            Location<span className='text-error-500'>*</span>
                        </Label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={loadLocations}
                            defaultOptions
                            value={transactionLocation}
                            onChange={(value) => setTransactionLocation(value)}
                            placeholder='Select location'
                        />
                    </div>
                    <div>
                        <Label>
                            Type<span className='text-error-500'>*</span>
                        </Label>
                        <Select
                            options={[
                                { value: 'Pinjam', label: 'Pinjam' },
                                { value: 'Kembalikan', label: 'Kembalikan' },
                                { value: 'Transfer', label: 'Transfer' },
                            ]}
                            placeholder='Select type'
                            defaultValue={transactionType}
                            onChange={(value) => setTransactionType(value)}
                        />
                    </div>

                    <div>
                        <Label>
                            Transaction Date<span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='date'
                            id='transaction_date'
                            name='transaction_date'
                            value={transactionDate}
                            placeholder='Choose date'
                            onChange={(e) => setTransactionDate(e.target.value)}
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
                            {selectedTransaction ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
