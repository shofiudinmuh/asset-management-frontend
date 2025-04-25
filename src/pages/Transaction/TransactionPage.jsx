import { useState } from 'react';
import { useModal } from '../../hooks/useModal';
import PageMeta from '../../components/common/PageMeta';
import TransactionTable from '../../components/tables/TransactionTable';
import InputField from '../../components/form/input/InputField';
import Label from '../../components/form/Label';
import Modal from '../../components/ui/Modal';
import ComponentCard from '../../components/common/ComponentCard';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';

export default function TransactionPage() {
    const [transaction, setTransaction] = useState([]);
    const [transactionName, setTransactionName] = useState('');
    const [transactionUser, setTransactionUser] = useState('');
    const [transactionLocation, setTransactionLocation] = useState('');
    const [transactionDate, setTransactionDate] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const resetForm = () => {
        setTransaction('');
        setTransactionName('');
        setTransactionUser('');
        setTransactionLocation('');
        setSelectedTransaction('');
        setTransactionDate('');
    };

    const handleAddOrUpdateTransaction = () => {
        if (selectedTransaction) {
            //
            setTransaction((prevTransaction) => {
                prevTransaction.map((transaction) =>
                    transaction.id === selectedTransaction.id
                        ? {
                              ...transaction,
                              asset: transactionName,
                              user: transactionUser,
                              location: transactionLocation,
                              transaction_date: transactionDate,
                          }
                        : transaction
                );
            });
        } else {
            // create new transaction
            const newTransaction = {
                asset: transactionName,
                user: transactionName,
                location: transactionLocation,
                transaction_date: transactionDate,
            };
            setTransaction([...transaction, { ...newTransaction }]);
        }

        closeModal();
        resetForm();
    };

    const handleEditTransaction = (transaction) => {
        setSelectedTransaction(transaction);
        setTransactionName(transaction.asset.name);
        setTransactionUser(transaction.user.name);
        setTransactionLocation(transaction.location.name);
        setTransactionDate(transaction.transaction_date);
        openModal();
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

                    <TransactionTable onEditTransaction={handleEditTransaction} />
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
                <form action=''>
                    <div>
                        <Label>
                            Name <span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='asset'
                            name='asset'
                            value={transactionName}
                            placeholder='Enter asset name'
                            onChange={(e) => transactionName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            User<span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='user'
                            name='user'
                            value={transactionUser}
                            placeholder='Enter user'
                            onChange={(e) => transactionUser(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label>
                            Location<span className='text-error-500'>*</span>
                        </Label>
                        <InputField
                            type='text'
                            id='location'
                            name='location'
                            value={transactionLocation}
                            placeholder='Enter location'
                            onChange={(e) => transactionLocation(e.target.value)}
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
                            value={setTransactionDate}
                            placeholder='Choose date'
                            onChange={(e) => transactionDate(e.target.value)}
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
                        <button className='px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-700'>
                            {selectedTransaction ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
