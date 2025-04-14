import { useSidebar } from '../../contexts/SidebarContext';

const Backdrop = () => {
    const { isMobileOpen, toggleMobileSidebar } = useSidebar;

    if (!isMobileOpen) return null;

    return (
        <div
            className='fixed inset-0 z-40 bg-gray-900/50 lg:hidden'
            onClick={toggleMobileSidebar}></div>
    );
};

export default Backdrop;
