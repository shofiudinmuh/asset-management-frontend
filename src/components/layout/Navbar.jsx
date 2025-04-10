import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { FiBell, FiChevronDown, FiLogOut, FiSettings, FiUser } from 'react-icons/fi';

const Navbar = ({ toggleSidebar }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const { user, logout } = useAuth();

    const notifications = [
        { id: 1, title: 'Maintenance Scheculed', message: 'Server maintenance scheduled', time: '2h ago', read: false },
        { id: 2, title: 'New Asset Added', message: 'New laptop added', time: '1d ago', read: true },
    ];

    const unreadCount = notifications.filter((n) => !n.read).length;

    return (
        <header className='bg-white shadow-sm z-10'>
            <div className='flex items-center justify-between px-6 py-4'>
                <div className='flex items-center'>
                    <button onClick={toggleSidebar} className='mr-4 text-gray-500 hover:text-gray-700 lg:hidden'>
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 6h16M4 12h16M4 18h16' />
                        </svg>
                    </button>
                    <h2 className='text-lg font-semibold text-gray-800'>Dashboard</h2>
                </div>

                <div className='flex items-center space-x-4'>
                    {/* Notifications toggle */}
                    <div className='relative'>
                        <button
                            onClick={() => setNotificationsOpen(!notificationsOpen)}
                            className='p-1 text-gray-500 hover:text-gray-700 relative'>
                            <FiBell size={20} />
                            {unreadCount > 0 && (
                                <span className='absoulte -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justufy-center'>
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        {notificationsOpen && (
                            <div className='absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20'>
                                <div className='py-1'>
                                    <div px-4 py-2 border-b bg-gray-50>
                                        <p className='text-sm font-medium text-gray-700'>Notifications</p>
                                    </div>
                                    {notifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                                                !notification.read ? 'bg-blue-50' : ''
                                            }`}>
                                            <p className='text-sm font-medium'>{notification.title}</p>
                                            <p className='text-xs text-gray-500'>{notification.message}</p>
                                            <p className='text-xs text-gray-400 mt-1'>{notification.time}</p>
                                        </div>
                                    ))}
                                    <div className='px-4 py-2 border-t bg-gray-50 text-center'>
                                        <button className='text-sm tex-blue-600 hover:text-blue-800'>
                                            View All Notifications
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* profile button */}
                    <div className='relative'>
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className='flex items-center space-x-2 focus:outline-none'>
                            <div className='h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white'>
                                {user?.name?.charAt(0)}
                            </div>
                            <span className='text-sm font-medium hidden md:inline'>{user?.name}</span>
                            <FiChevronDown size={16} className='hidden md:inline' />
                        </button>

                        {profileOpen && (
                            <div className='absolute riht-0 mt-2 w-48 bg-white rounded-m shadow-lg z-20'>
                                <div className='py-1'>
                                    <a href='#' className='flex items-center px-4 py2 text-sm text-gray-700 hover:bg-gray-100'>
                                        <FiUser className='mr-2' />
                                        Profile
                                    </a>
                                    <a href='#' className='flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                        <FiSettings className='mr-2' />
                                        Settings
                                    </a>
                                    <div className='border-t border-gray-100'></div>
                                    <button
                                        onClick={logout}
                                        className='w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
                                        <FiLogOut className='mr-2' />
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
