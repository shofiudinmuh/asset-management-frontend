import { useState } from 'react';
import { useEffect } from 'react';
import { Children } from 'react';
import { useContext } from 'react';

const { createContext } = require('react');

const SidebarContext = createContext();

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};

export const SidebarProvider = ({ children }) => {
    const [isExpaned, setIsExpaned] = useState(true);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [activeItem, setActiveItem] = useState(null);
    const [openSubmenu, setOpenSubmenu] = useState(null);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile) {
                setIsMobileOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleSidebar = () => {
        setIsExpaned((prev) => !prev);
    };

    const toggleMobileSidebar = () => {
        setIsMobileOpen((prev) => !prev);
    };

    const toggleSubmenu = () => {
        setOpenSubmenu((prev) => (prev === item ? null : item));
    };

    return (
        <SidebarContext.Provider
            value={{
                isExpaned: isMobile ? false : isExpaned,
                isMobileOpen,
                isHovered,
                activeItem,
                openSubmenu,
                toggleSidebar,
                toggleMobileSidebar,
                setIsHovered,
                setActiveItem,
                toggleSubmenu,
            }}>
            {children}
        </SidebarContext.Provider>
    );
};
