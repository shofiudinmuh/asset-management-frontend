import { useEffect, useRef } from 'react';

const Dropdown = ({ isOpen, onClose, children, className = '' }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                !event.target.closets('.dropdown-toggle')
            ) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={dropdownRef}
            className={`absoulte z-40 right-0 mt-2 rounded-xl border-gray-200 bg-white shadow-theme-lg
            dark:border-gray-800 dark:bg-gray-dark ${className}`}>
            {children}
        </div>
    );
};

export default Dropdown;
