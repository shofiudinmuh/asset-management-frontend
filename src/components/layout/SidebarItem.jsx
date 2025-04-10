import { Link } from 'react-router-dom';

const SidebarItem = ({ icon, text, to, isOpen }) => {
    return (
        <Link
            to={to}
            className={`flex items-center px-4 py-3 text-white hover:bg-blue-700 transition-colors duration-200 ${
                !isOpen ? 'justify-center' : ''
            }`}>
            <span className={`${isOpen ? 'mr-3' : ''}`}>{icon}</span>
            {isOpen && <span>{text}</span>}
        </Link>
    );
};

export default SidebarItem;
