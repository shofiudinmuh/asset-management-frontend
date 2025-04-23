import { useState } from 'react';
import { FiBell, FiX } from 'react-icons/fi';
import Dropdown from '../ui/Dropdown';
import DropdownItem from '../ui/DropdownItem';
import { Link } from 'react-router-dom';

export default function NotificationDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [notifying, setNotifying] = useState(true);

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }

    const handleClick = () => {
        toggleDropdown();
        setNotifying(false);
    };

    return (
        <div className='relative'>
            <button
                className='relative flex items-center justify-center text-gray-500 transition-colors bg-white border border-gray-200 rounded-full dropdown-toggle hover:text-gray-700 h-11 w-11 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                onClick={handleClick}>
                <span
                    className={`absolute right-0 top-0.5 h-2 w-2 rounded-full bg-orange-400 ${
                        !notifying ? 'hidden' : 'flex'
                    }`}></span>
                <FiBell className='w-5 h-5' />
            </button>

            <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                className='absolute -right-[240px] mt-[17px] flex h-[480px] w-[350px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark sm:w-[361px] lg:right-0'>
                <div className='flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-700'>
                    <h5 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
                        Notification
                    </h5>
                    <button
                        onClick={toggleDropdown}
                        className='text-gray-500 transition dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'>
                        <FiX className='w-5 h-5' />
                    </button>
                </div>

                <ul className='flex flex-col h-auto overflow-y-auto custom-scrollbar'>
                    {/* Example notification */}
                    <li>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            className='flex gap-3 rounded-lg border-b border-gray-100 p-3 px-4.5 py-3 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-white/5'>
                            <span className='relative block w-full h-10 rounded-full z-1 max-w-10'>
                                <img
                                    width={40}
                                    height={40}
                                    src='/images/user/user-02.jpg'
                                    alt='User'
                                    className='w-full overflow-hidden rounded-full'
                                />
                                <span className='absolute bottom-0 right-0 z-10 h-2.5 w-full max-w-2.5 rounded-full border-[1.5px] border-white bg-success-500 dark:border-gray-900'></span>
                            </span>

                            <span className='block'>
                                <span className='mb-1.5 block text-theme-sm text-gray-500 dark:text-gray-400 space-x-1'>
                                    <span className='font-medium text-gray-800 dark:text-white/90'>
                                        User Contoh
                                    </span>
                                    <span>Request permission to change</span>
                                    <span className='font-medium text-gray-800 dark:text-white/90'>
                                        Project - Nganter App
                                    </span>
                                </span>

                                <span>
                                    <span>Project</span>
                                    <span className='w-1 h-1 bg-gray-400 rounded-full'></span>
                                    <span>5 min ago</span>
                                </span>
                            </span>
                        </DropdownItem>
                    </li>
                    {/* more notification items */}
                </ul>
                <Link
                    to='/'
                    className='block px-4 py-2 mt-3 text-sm font-medium text-center text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'>
                    View All Notification
                </Link>
            </Dropdown>
        </div>
    );
}
