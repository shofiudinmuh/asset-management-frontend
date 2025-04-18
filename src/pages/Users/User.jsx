import { useState } from 'react';
import ComponentCard from '../../components/common/ComponentCard';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import UserTable from '../../components/tables/UserTable';
import Modal from '../../components/ui/Modal';
import Label from '../../components/form/Label';
import InputField from '../../components/form/input/InputField';
import { useModal } from '../../hooks/useModal';
import { PiEyeClosed } from 'react-icons/pi';
import { FaEye } from 'react-icons/fa';

export default function User() {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    const resetForm = () => {
        setUserName('');
        setUserEmail('');
        setUserPassword('');
        setSelectedUser('');
    };

    const handleAddOrUpdateUser = () => {
        if (selectedUser) {
            // edit user
            setUsers((prevUsers) => {
                prevUsers.map((user) =>
                    user.id === selectedUser.id
                        ? { ...user, name: userName, email: userEmail }
                        : user
                );
            });
        } else {
            // add new user
            const newUser = {
                name: userName,
                email: userEmail,
                password: userPassword,
            };

            setUsers([...users, { ...newUser }]);
        }
        closeModal();
        resetForm();
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setUserName(user.name);
        setUserEmail(user.email);
        setUserPassword(user.password);
        openModal();
    };

    return (
        <>
            <PageMeta
                title='Users | Asset & Resource Management System'
                description='Daftar user'
            />

            <PageBreadCrumb pageTitle='Users' />

            <div className='space-y-2 px-2 mx-2 dark:bg-gray-800'>
                <ComponentCard>
                    <button
                        className='px-4 py-2 bg-brand-500 text-white rounded-md hover:bg-blue-700 transition-colors'
                        onClick={() => {
                            resetForm();
                            openModal();
                        }}>
                        Add New User
                    </button>
                    <UserTable onEditUser={handleEditUser} />
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
                        {selectedUser ? 'Edit User' : 'Add New User'}
                    </h3>
                </div>
                <div>
                    <Label>
                        Name <span className='text-error-500'>*</span>
                    </Label>
                    <InputField
                        type='text'
                        id='name'
                        name='name'
                        value={userName}
                        placeholder='Enter user name'
                        onChange={(e) => setUserName(e.target.value)}
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
                        value={userEmail}
                        placeholder='Enter your email'
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                </div>
                {/* {!selectedUser && ( */}
                <div>
                    <Label>
                        Password <span className='text-error-500'>*</span>
                    </Label>
                    <div className='relative'>
                        <InputField
                            type={showPassword ? 'text' : 'password'}
                            placeholder='password'
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2'>
                            {showPassword ? (
                                <FaEye className='fill-gray-500 dark:fill-gray-400 size-5' />
                            ) : (
                                <PiEyeClosed className='fill-gray-500 dark:fill-gray-400 size-5' />
                            )}
                        </span>
                    </div>
                </div>
                {/* )} */}

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
                        onClick={handleAddOrUpdateUser}
                        className='px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600'>
                        {selectedUser ? 'Update' : 'Add'}
                    </button>
                </div>
            </Modal>
        </>
    );
}
