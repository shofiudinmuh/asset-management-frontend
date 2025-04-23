import { FiFileText, FiHome, FiPackage, FiSettings, FiTool, FiUsers } from 'react-icons/fi';
import SidebarItem from './SidebarItem';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    return (
        <div className={`${isOpen ? 'w-64' : 'w-20'} bg-blue-800 text-white fixed h-full transition-all duration-300`}>
            <div className='p-4 flex items-center justify-between'>
                {isOpen ? <h1 className='text-xl font-bold'>Asset Management</h1> : <h1 className='tex-xl font-bold'>AM</h1>}
                <button onClick={toggleSidebar} className='text-white hover:text-blue-200'>
                    {isOpen ? (
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                        </svg>
                    ) : (
                        <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                        </svg>
                    )}
                </button>
            </div>

            <nav className='mt-8'>
                <SidebarItem icon={<FiHome />} text='Dashboard' to='/dashboard' isOpen={isOpen} />
                <SidebarItem icon={<FiPackage />} text='Assets' to='/assets' isOpen={isOpen} />
                <SidebarItem icon={<FiTool />} text='Maintenance' to='/maintenance' isOpen={isOpen} />
                <SidebarItem icon={<FiUsers />} text='Users' to='/users' isOpen={isOpen} />
                <SidebarItem icon={<FiFileText />} text='Reports' to='/reports' isOpen={isOpen} />
                <SidebarItem icon={<FiSettings />} text='Setting' to='/setting' isOpen={isOpen} />
            </nav>
        </div>
    );
};

export default Sidebar;
