import { FiCheck } from 'react-icons/fi';

const Checkbox = ({ label, checked, id, onChange, className = '', disabled = false }) => {
    return (
        <label
            className={`flex items-center space-x-3 group cursor-pointer ${
                disabled ? 'cursor-not-allowed opacity-60' : ''
            }`}>
            <div className='relative w-5 h-5'>
                <input
                    id={id}
                    type='checkbox'
                    className={`w-5 h-5 appearance-none cursor-pointer dark:border-gray-700 border
                border-gray-300 checked:border-transparent rounded-md checked:bg-brand-500 disabled:opacity-60 ${className}`}
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    disabled={disabled}
                />
                {checked && (
                    <FiCheck
                        className='absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2 text-white'
                        size={14}
                    />
                )}
                {disabled && checked && (
                    <FiCheck
                        className='absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none top-1/2 left-1/2 text-gray-300'
                        size={14}
                    />
                )}
            </div>

            {label && (
                <span className='text-sm font-medium text-gray-800 dark:text-gray-200'>
                    {label}
                </span>
            )}
        </label>
    );
};

export default Checkbox;
