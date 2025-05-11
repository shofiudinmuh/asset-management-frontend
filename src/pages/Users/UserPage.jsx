import { useEffect, useState } from 'react';
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
import { deleteuser, getUsers } from '../../api/usersApi';

export default function UserPage() {
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };
    const resetForm = () => {
        setUserName('');
        setUserEmail('');
        setUserPassword('');
        setSelectedUser('');
    };

    const handleAddOrUpdateUser = async () => {
        const userData = {
            name: userName,
            email: userEmail,
            password: userPassword,
        };

        try {
            if (selectedUser) {
                await updateUser(selectedUser.id, userData);
            } else {
                await createUser(userData);
            }

            await fetchUser();
            closeModal();
            resetForm();
        } catch (error) {
            console.error('Error adding/updating user:', error);
        }
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setUserName(user.name);
        setUserEmail(user.email);
        openModal();
    };

    const handleDeleteUser = async (id) => {
        if (confirm('Are you sure want to delete this asset?')) {
            try {
                await deleteuser(id);
                await fetchUser();
            } catch (error) {
                console.log('Failed to delete user', error);
            }
        }
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
                    <UserTable
                        data={users}
                        onDeleteUser={handleDeleteUser}
                        onEditUser={handleEditUser}
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
                        {selectedUser ? 'Edit User' : 'Add New User'}
                    </h3>
                </div>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddOrUpdateUser();
                    }}>
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
                            type='submit'
                            className='px-4 py-2 bg-brand-500 text-white rounded hover:bg-brand-600'>
                            {selectedUser ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}
