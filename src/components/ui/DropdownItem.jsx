import { Link } from 'react-router-dom';

const DropdownItem = ({
    tag = 'button',
    to,
    onClick,
    onItemClick,
    baseClassName = 'block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900',
    className = '',
    children,
}) => {
    const combinedClassess = `${baseClassName} ${className}`.trim();

    const handleClick = (event) => {
        if (tag === 'button') {
            event.preventDefault();
        }
        if (onClick) onClick();
        if (onItemClick) onItemClick();
    };

    if (tag === 'a' && to) {
        return (
            <Link to={to} className={combinedClassess} onClick={handleClick}>
                {children}
            </Link>
        );
    }
    return (
        <button onClick={handleClick} className={combinedClassess}>
            {children}
        </button>
    );
};

export default DropdownItem;
