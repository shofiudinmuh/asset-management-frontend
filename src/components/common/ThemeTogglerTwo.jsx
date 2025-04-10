import { FiMoon, FiSun } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';

export default function ThemeTogglerTwo() {
    const { toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className='inline-flex items-center justify-center text-white transition-colors rounded-full size-14 bg-brand-500 hover:bg-brand-600'
            aria-label='Toggle dark mode'>
            <FiMoon className='hidden dark:block' size={20} />
            <FiSun className='dark:hidden' size={20} />
        </button>
    );
}
