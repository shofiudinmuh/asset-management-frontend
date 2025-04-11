const Radio = ({ id, name, value, checked, label, onChange, className = '', disabled = false }) => {
    return (
        <label
            htmlFor={id}
            className={`radio-label relative flex-none items-center gap-3 text-sm font-medium ${
                disabled
                    ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                    : 'text-gray-700 dark:text-gray-400'
            } ${className}`}>
            {/* hidden radio input */}
            <input
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={() => !disabled && onChange(value)}
                className='sr-only'
                disabled={disabled}
            />

            {/* custom radio circle */}
            <span
                className={`radio-circle flex h-5 w-5 items-center justify-center rounded-full border-[1.25px]
                ${
                    checked
                        ? 'border-brand-500 bg-brand-500'
                        : 'bg-transparent border-gray-300 dark:border-gray-700'
                } ${
                    disabled
                        ? 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-700'
                        : ''
                } `}>
                <span
                    className={`radio-dot h-2 w-2 rounded-full bg-white ${
                        checked ? 'block' : 'hidden'
                    }`}
                />
            </span>

            {/* label text */}
            <span className='radio-text'>{label}</span>
        </label>
    );
};

export default Radio;
