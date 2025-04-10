import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const MainLayout = () => {
    const [sideBarOpen, setSidebarOpen] = useState(true);

    return (
        <div className='flex h-screen bg-gray-50'>
            <Sidebar isOpen={sideBarOpen} toggleSidebar={() => setSidebarOpen(!sideBarOpen)} />
            <div className={`flex-1 flex flex-col ${sideBarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
                <Navbar toggleSidebar={() => setSidebarOpen(!sideBarOpen)} />

                <main className='flex-1 overflow-y-auto p-6 bg-gray-50'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
