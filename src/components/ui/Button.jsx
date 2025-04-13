const Button = ({
    children,
    size = 'md',
    variant = 'primary',
    startIcon,
    endIcon,
    onClick,
    className = '',
    disabled = false,
}) => {
    // Size class
    const sizeClasses = {
        sm: 'px-4 py-3 text-sm',
        md: 'px-5 py-3.5 text-sm',
    };

    // variant class
    const variantClasses = {
        primary: 'bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300',
        outline:
            'bg-white tex-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300',
    };

    return (
        <button
            className={`button inline-flex items-center justify-center
        gap-2 rounded-lg transition ${className} ${sizeClasses[size]}
        ${variantClasses[variant]} ${disabled} ? 'cursor-not-allowed opacity-50' : ''`}
            onClick={onClick}
            disabled={disabled}>
            {startIcon && <span className='button-icon-start'>{startIcon} </span>}
            <span className='button-content'>{children}</span>
            {endIcon && <span className='button-icon-end'>{endIcon}</span>}
        </button>
    );
};

export default Button;
