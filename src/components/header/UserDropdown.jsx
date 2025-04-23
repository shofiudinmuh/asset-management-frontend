import { useState } from 'react';
import { FiChevronDown, FiHelpCircle, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';
import Dropdown from '../ui/Dropdown';
import DropdownItem from '../ui/DropdownItem';
import { Link } from 'react-router-dom';

export default function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleDropdown() {
        setIsOpen(!isOpen);
    }

    function closeDropdown() {
        setIsOpen(false);
    }

    return (
        <div className='realtive'>
            <button
                onClick={toggleDropdown}
                className='flex items-center text-gray-700 dropdown-toggle dark:text-hover-gray-400'>
                <span className='mr-3 overflow-hidden rounded-full h-11 w-11'>
                    <img src='/images/user/owner.jpg' alt='User' />
                </span>
                <span className='block mr-1 font-medium text-theme-sm'>User</span>
                <FiChevronDown
                    className={`stoke-gray-500 dark:stroke-gray-400 transition-transform duration-200 w-4 h-4
                    ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                className='absolute right-0 mt-[17px w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark'>
                <div>
                    <span className='block font-medium text-gray-700 text-theme-sm dark:text-gray-400'>
                        User Name
                    </span>
                    <span className='mt-0.5 block text-theme-xs text-gray-500 dark:text-gray-400'>
                        user-name@mail.test
                    </span>
                </div>

                <ul className='flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800'>
                    <li>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            tag='a'
                            to='/profile'
                            className='flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'>
                            <FiUser className='text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 w-5 h-5' />
                            Edit Profile
                        </DropdownItem>
                    </li>
                    <li>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            tag='a'
                            to='/profile'
                            className='flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'>
                            <FiSettings className='text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 w-5 h-5' />
                            Account settings
                        </DropdownItem>
                    </li>
                    <li>
                        <DropdownItem
                            onItemClick={closeDropdown}
                            tag='a'
                            to='/profile'
                            className='flex items-center gap-3 px-3 py-2 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'>
                            <FiHelpCircle className='text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300 w-5 h-5' />
                            Support
                        </DropdownItem>
                    </li>
                </ul>

                <Link
                    to='/signin'
                    className='flex items-center gap-3 px-3 py-2 mt-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'>
                    <FiLogOut className='text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 w-5 h-5' />
                    Sign out
                </Link>
            </Dropdown>
        </div>
    );
}
