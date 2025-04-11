const RadioSm = ({ id, name, value, checked, label, onChange, className = '' }) => {
    return (
        <label
            htmlFor={id}
            className={`radio-sm-label flex cursor-pointer select-none items-center text-sm text-gray-500 dark:text-gray-400 ${className}`}>
            <span className='radio-sm-container relative'>
                {/* hidden relative radio input */}
                <input
                    type='radio'
                    id={id}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={() => onChange(value)}
                    className='sr-only'
                    aria-checked={checked}
                />
                {/* custom radio circle */}
                <span
                    className={`radio-sm-dot h-1.5 w-1.5 rounded-full transition-colors ${
                        checked ? 'bg-white' : 'bg-white dark:bg-gray-800'
                    }`}></span>
            </span>

            {/* label */}

            <span className='radio-sm-text'>{label}</span>
        </label>
    );
};

export default RadioSm;
