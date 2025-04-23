import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggleButton = () => {
    const { toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className='relative flex items-center justify-center text-gray-500 transition-colors bg-white border
        border-gray-200 rounded-full hover:text-dark-900 h-11 w-11 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-800
        dark:bg-gray-900 dark:text-gray-400 dark:bg-gray-800 dark:hover:text-white'>
            {/* moon icon */}
            <FiMoon className='hidden dark:block' size={20} />
            {/* sun icon */}
            <FiSun className='dark:hidden' size={20} />
        </button>
    );
};
