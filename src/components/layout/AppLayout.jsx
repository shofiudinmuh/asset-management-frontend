import { Outlet } from 'react-router-dom';
import { SidebarProvider, useSidebar } from '../../contexts/SidebarContext';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import Backdrop from './Backdrop';

const LayoutContent = () => {
    const { isExpanded, isHovered, isMobileOpen } = useSidebar();

    return (
        <div className='min-h-screen xl:flex dark:bg-gray-300'>
            <div>
                <AppSidebar />
                <Backdrop />
            </div>
            <div
                className={`flex-1 transition-all duration-300 ease-in-out dark:bg-gray-900 ${
                    isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]'
                } ${isMobileOpen ? 'ml-0' : ''}`}>
                <AppHeader />
                <div className='px-4 mx-auto max-w-(--breakpoint-2xl) md:p-6 dark:bg-gray-900'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

const AppLayout = () => {
    return (
        <SidebarProvider>
            <LayoutContent />
        </SidebarProvider>
    );
};

export default AppLayout;
