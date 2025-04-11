const Input = ({
    type = 'text',
    id,
    name,
    placeholder,
    value,
    onChange,
    className = '',
    min,
    max,
    step,
    disabled = false,
    success = false,
    error = false,
    hint,
}) => {
    const baseClasses =
        'h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs pladeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30';

    const stateClasses = disabled
        ? 'text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
        : error
        ? 'border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus-error-800'
        : success
        ? 'border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800'
        : 'bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-band-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800';

    return (
        <div className='relative'>
            <input
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                className={`${baseClasses} ${stateClasses} ${className}`}
            />

            {hint && (
                <p
                    className={`mt-1.5 text-xs ${
                        error ? 'text-error-500' : success ? 'text-success-500' : 'text-gray-500'
                    }`}>
                    {hint}
                </p>
            )}
        </div>
    );
};

export default Input;
