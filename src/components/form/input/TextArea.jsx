const TextArea = ({
    placeholder = 'Enter your message',
    rows = 3,
    value = '',
    onChange,
    className = '',
    disabled = false,
    error = false,
    hint = '',
}) => {
    const handleChange = (e) => {
        onChange?.(e.target.value);
    };

    const baseClasses =
        'w-full rounded-lg border px-4 py-2.5 text-sm shadow-theme-xs focus:outline-none';

    const stateClasses = disabled
        ? 'bg-gray-100 text-fray-500 border-gray-300 cursor-not-allowed opacity-50 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
        : error
        ? 'border-error-500 focus:border-error-300 focus:ring-3 focus:ring-error-500/10 dark:border-error-500 dark:bg-gray-900 dark:text-white/90 dark:focus:border-error-800'
        : 'border-error-300 focus:brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-800';

    return (
        <div className='textarea-container relative'>
            <textarea
                placeholder={placeholder}
                rows={rows}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                className={className}
                aria-checked={error}
            />

            {hint && (
                <p
                    className={`hint-text mt-2 text-sm ${
                        error ? 'text-error-500' : 'text-gray-500 dark:text-gray-400'
                    }`}>
                    {hint}
                </p>
            )}
        </div>
    );
};

export default TextArea;
