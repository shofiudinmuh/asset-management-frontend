import { FaUserCog } from 'react-icons/fa';
import { FaMapLocation, FaOpensuse, FaPersonCircleCheck } from 'react-icons/fa6';
import { FiChevronDown, FiDatabase, FiGrid } from 'react-icons/fi';
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
    const [subMenuHeight, setSubMenuHeight] = useState(null);
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
        <ul className='flex flex-col gap-4'>
            {items.map((nav, index) => {
                <li key={nav.name}>
                    {nav.subItems ? (
                        <button
                            onClick={() => handleSubmenuToggle(index, menuType)}
                            className={`menu-item group ${
                                openSubMenu?.type === menuType && openSubMenu?.index === index
                                    ? 'menu-item-active'
                                    : 'menu-item-inactive'
                            }
                                cursor-pointer ${
                                    !isExpanded && !isHovered
                                        ? 'lg:justify-center'
                                        : 'lg:justify-start'
                                }
                            `}>
                            <span
                                className={`menu-item-icon-size ${
                                    openSubMenu?.type === menuType && openSubMenu?.index === index
                                        ? 'menu-item-icon-active'
                                        : 'menu-item-icon-inactive'
                                }`}>
                                {nav.icon}
                            </span>
                            {(isExpanded || isHovered || isMobileOpen) && (
                                <FiChevronDown
                                    className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                                        openSubMenu?.type === menuType &&
                                        openSubMenu?.index === index
                                            ? 'rotate-180 text-brand-500'
                                            : ''
                                    }`}
                                />
                            )}
                        </button>
                    ) : (
                        nav.path && (
                            <Link
                                to={nav.path}
                                className={`menu-item group ${
                                    isActive(nav.path) ? 'menu-item-active' : 'menu-item-inactive'
                                }`}>
                                <span
                                    className={`menu-item-icon-size ${
                                        isActive(nav.path)
                                            ? 'menu-item-icon-active'
                                            : 'menu-item-icon-inactive'
                                    }`}>
                                    {nav.icon}
                                </span>
                                {(isExpanded || isHovered || isMobileOpen) && (
                                    <span className='menu-item-text'>{nav.name}</span>
                                )}
                            </Link>
                        )
                    )}
                    {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
                        <div
                            ref={(el) => {
                                subMenuRefs.current[`${menuType}-${index}`] = el;
                            }}
                            className='overflow-hidden transition-all duration-300'
                            style={{
                                heigh:
                                    openSubMenu?.type === menuType && openSubMenu?.index === index
                                        ? `${subMenuHeight[`${menuType}-${index}`]}px`
                                        : '0px',
                            }}>
                            <ul className='mt-2 space-y-1 ml-9'>
                                {nav.subItems.map((subItem) => (
                                    <li key={subItem.name}>
                                        <Link
                                            to={subItem.path}
                                            className={`menu-dropdown-item ${
                                                isActive(subItem.path)
                                                    ? 'menu-dropdown-item-active'
                                                    : 'menu-dropdown-item-inactive'
                                            }`}>
                                            {subItem.name}
                                            <span className='flex items-center gap-1 ml-auto'>
                                                {subItem.new && (
                                                    <span
                                                        className={`mml-auto ${
                                                            isActive(subItem.path)
                                                                ? 'menu-dropdown-badge-active'
                                                                : 'menu-dropdown-bagde-inactive'
                                                        }menu-dropdown-badge`}>
                                                        new
                                                    </span>
                                                )}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </li>;
            })}
        </ul>;
    };

    return (
        <aside
            className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            <div
                className={`py-8 flex ${
                    !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                }`}>
                <Link to='/'>
                    {isExpanded || isHovered || isMobileOpen ? (
                        <>
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
                        </>
                    ) : (
                        <img src='/images/logo/logo-icon.svg' alt='Logo' width={32} height={32} />
                    )}
                </Link>
            </div>
            <div className='flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar'>
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
                        <div className=''>
                            <h2
                                className={`mb-4 text-xs uppercase flex leading-[20px] text-gray-400 ${
                                    !isExpanded && !isHovered
                                        ? 'lg:justify-center'
                                        : 'justify-start'
                                }`}>
                                {isExpanded || isHovered || isMobileOpen ? (
                                    'Others'
                                ) : (
                                    <FiMoreHorizontal />
                                )}
                            </h2>
                            {renderMenuItems(othersItems, 'others')}
                        </div>
                    </div>
                </nav>
                {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null}
            </div>
        </aside>
    );
};

export default AppSidebar;
