import { FaUserCog } from 'react-icons/fa';
import { FaMapLocation, FaOpensuse, FaPersonCircleCheck } from 'react-icons/fa6';
import { FiChevronDown, FiDatabase, FiGrid, FiMoreHorizontal } from 'react-icons/fi';
import { GrDocumentStore, GrHostMaintenance, GrTransaction } from 'react-icons/gr';
import { HiDocumentReport } from 'react-icons/hi';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { useSidebar } from '../../contexts/SidebarContext';
import { Link, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from 'react';

const navItems = [
    {
        icon: <FiGrid />,
        name: 'Dashboard',
        path: '/',
    },
    {
        icon: <FiDatabase />,
        name: 'Assets',
        path: '/assets',
    },
    {
        icon: <GrTransaction />,
        name: 'Asset Monitoring',
        subItems: [
            { name: 'Transactions', path: '/transactions', pro: false },
            { name: 'Purchase Orders', path: '/purchase-orders', pro: false },
        ],
    },
    {
        icon: <FaMapLocation />,
        name: 'Locations',
        path: '/locations',
    },
    {
        icon: <FaPersonCircleCheck />,
        name: 'Suppliers',
        path: '/suppliers',
    },
    {
        icon: <GrHostMaintenance />,
        name: 'Maintenances',
        path: '/maintenances',
    },
    {
        icon: <GrDocumentStore />,
        name: 'Document Management',
        path: '/documents',
    },
    {
        icon: <HiDocumentReport />,
        name: 'Reports',
        subItems: [
            { name: 'Assets Report', path: '/report/asset', pro: false },
            { name: 'Transactions Report', path: '/report/transaction', pro: false },
            { name: 'Maintenances Report', path: '/report/maintenance', pro: false },
        ],
    },
];

const otherItems = [
    {
        icon: <FaUserCog />,
        name: 'Account Management',
        subItems: [
            { name: 'Users', path: '/users', pro: false },
            { name: 'Profile', path: '/profile', pro: false },
        ],
    },
    {
        icon: <RiLogoutBoxLine />,
        name: 'Logout',
        path: '/logout',
    },
];

const AppSidebar = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const location = useLocation();

    const [openSubMenu, setOpenSubMenu] = useState(null);
    const [subMenuHeight, setSubMenuHeight] = useState({});
    const subMenuRefs = useRef({});

    const isActive = useCallback((path) => location.pathname === path, [location.pathname]);

    useEffect(() => {
        let submenuMatched = false;
        ['main', 'other'].forEach((menuType) => {
            const items = menuType === 'main' ? navItems : otherItems;
            items.forEach((nav, index) => {
                if (nav.subItems) {
                    nav.subItems.forEach((subItem) => {
                        if (isActive(subItem.path)) {
                            setOpenSubMenu({
                                type: menuType,
                                index,
                            });
                            submenuMatched = true;
                        }
                    });
                }
            });
        });

        if (!submenuMatched) {
            setOpenSubMenu(null);
        }
    }, [location, isActive]);

    useEffect(() => {
        if (openSubMenu !== null) {
            const key = `${openSubMenu.type}-${openSubMenu.index}`;
            if (subMenuRefs.current[key]) {
                setSubMenuHeight((prevHeights) => ({
                    ...prevHeights,
                    [key]: subMenuRefs.current[key]?.scrollHeight || 0,
                }));
            }
        }
    }, [openSubMenu]);

    const handleSubmenuToggle = (index, menuType) => {
        setOpenSubMenu((prevOpenSubmenu) => {
            if (
                prevOpenSubmenu &&
                prevOpenSubmenu.type === menuType &&
                prevOpenSubmenu.index === index
            ) {
                return null;
            }
            return { type: menuType, index };
        });
    };

    const renderMenuItems = (items, menuType) => {
        return (
            <ul className='flex flex-col gap-4'>
                {items.map((nav, index) => (
                    <li key={`${menuType}-${index}`}>
                        {nav.subItems ? (
                            <>
                                <button
                                    onClick={() => handleSubmenuToggle(index, menuType)}
                                    className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                                        openSubMenu?.type === menuType &&
                                        openSubMenu?.index === index
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'hover:bg-gray-100'
                                    } ${
                                        !isExpanded && !isHovered
                                            ? 'justify-center'
                                            : 'justify-between'
                                    }`}>
                                    <div className='flex items-center'>
                                        <span
                                            className={`text-lg ${
                                                openSubMenu?.type === menuType &&
                                                openSubMenu?.index === index
                                                    ? 'text-blue-600'
                                                    : 'text-gray-600'
                                            }`}>
                                            {nav.icon}
                                        </span>
                                        {(isExpanded || isHovered || isMobileOpen) && (
                                            <span className='ml-3'>{nav.name}</span>
                                        )}
                                    </div>
                                    {(isExpanded || isHovered || isMobileOpen) && (
                                        <FiChevronDown
                                            className={`transition-transform duration-200 ${
                                                openSubMenu?.type === menuType &&
                                                openSubMenu?.index === index
                                                    ? 'rotate-180 text-blue-600'
                                                    : 'text-gray-400'
                                            }`}
                                        />
                                    )}
                                </button>

                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <div
                                        ref={(el) =>
                                            (subMenuRefs.current[`${menuType}-${index}`] = el)
                                        }
                                        className='overflow-hidden transition-all duration-300'
                                        style={{
                                            height:
                                                openSubMenu?.type === menuType &&
                                                openSubMenu?.index === index
                                                    ? `${
                                                          subMenuHeight[`${menuType}-${index}`] || 0
                                                      }px`
                                                    : '0px',
                                        }}>
                                        <ul className='pl-12 py-2 space-y-2'>
                                            {nav.subItems.map((subItem) => (
                                                <li key={subItem.name}>
                                                    <Link
                                                        to={subItem.path}
                                                        className={`block px-3 py-2 rounded-lg text-sm ${
                                                            isActive(subItem.path)
                                                                ? 'bg-blue-50 text-blue-600'
                                                                : 'hover:bg-gray-100 text-gray-600'
                                                        }`}>
                                                        {subItem.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                to={nav.path}
                                className={`flex items-center p-3 rounded-lg transition-colors ${
                                    isActive(nav.path)
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'hover:bg-gray-100 text-gray-600'
                                } ${!isExpanded && !isHovered ? 'justify-center' : 'pl-3'}`}>
                                <span className='text-lg'>{nav.icon}</span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className='ml-3'>{nav.name}</span>
                                )}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <aside
            className={`fixed  flex flex-col lg:mt-0 top-0 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
                ${isExpanded || isHovered || isMobileOpen ? 'w-[290px]' : 'w-[90px]'}
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {/* Logo Section - Fixed padding regardless of state */}
            <div className='py-8 px-5'>
                <Link to='/'>
                    <div className='flex items-center'>
                        {/* Always show icon version */}
                        <img
                            src='/images/logo/logo-icon.svg'
                            alt='Logo'
                            width={32}
                            height={32}
                            className={`${
                                isExpanded || isHovered || isMobileOpen ? 'hidden' : 'block'
                            }`}
                        />
                        {/* Show full logo when expanded */}
                        <div
                            className={`${
                                isExpanded || isHovered || isMobileOpen ? 'block' : 'hidden'
                            }`}>
                            <img
                                className='dark:hidden'
                                src='/images/logo/logo.svg'
                                alt='Logo'
                                width={150}
                                height={40}
                            />
                            <img
                                className='hidden dark:block'
                                src='/images/logo/logo-dark.svg'
                                alt='Logo'
                                width={150}
                                height={40}
                            />
                        </div>
                    </div>
                </Link>
            </div>

            {/* Menu Content - with consistent padding */}
            <div className='flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar px-5'>
                <nav className='mb-6'>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <h2
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded && !isHovered
                                        ? 'lg:justify-center'
                                        : 'justify-start'
                                }`}>
                                {isExpanded || isHovered || isMobileOpen ? (
                                    'Menu'
                                ) : (
                                    <FiMoreHorizontal className='size-6' />
                                )}
                            </h2>
                            {renderMenuItems(navItems, 'main')}
                        </div>
                        <div className='flex flex-col gap-4'>
                            <h2
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded && !isHovered
                                        ? 'lg:justify-center'
                                        : 'justify-start'
                                }`}>
                                {isExpanded || isHovered || isMobileOpen ? (
                                    'Others'
                                ) : (
                                    <FiMoreHorizontal className='size-6' />
                                )}
                            </h2>
                            {renderMenuItems(otherItems, 'other')}
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
