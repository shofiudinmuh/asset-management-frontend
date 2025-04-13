const Badge = ({
    variant = 'light',
    color = 'primary',
    size = 'md',
    startIcon,
    endIcon,
    children,
}) => {
    // base styling for all badge
    const baseStyles =
        'inline-flex items-center px-2.5 py-0.5 justify-center gap1 rounded-full font-medium';

    // size
    const sizeStyles = {
        sm: 'text-xs',
        md: 'text-sm',
    };

    // color and variant combinations
    const variants = {
        light: {
            primary: 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400',
            success: 'bg-green-50 text-green-600 dark:bg-green-500/15 dark:text-green-500',
            error: 'bg-red-50 text-red-600 dark:bg-red-500/15 dark:text-red-500',
            warning: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-500/15 dark:text-orange-400',
            info: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/15 dark:text-cyan-400',
            light: 'bg-gray-100 text-gray-700 dark:bg-white/5 dark:text-white/80',
            dark: 'bg-gray-800 text-white dark:bg-white/5 dark:text-white',
        },
        solid: {
            primary: 'bg-blue-600 text-white dark:bg-blue-500',
            success: 'bg-green-600 text-white dark:bg-green-500',
            error: 'bg-red-600 text-white dark:bg-red-500',
            warning: 'bg-yellow-500 text-white dark:bg-yellow-400',
            info: 'bg-cyan-600 text-white dark:bg-cyan-500',
            light: 'bg-gray-300 text-gray-800 dark:bg-white/10 dark:text-white',
            dark: 'bg-gray-900 text-white dark:bg-white/10 dark:text-white',
        },
    };

    // combine all classes
    const classes = `${baseStyles} ${sizeStyles[size]} ${variants[variant][color]}`;

    return (
        <span className={classes}>
            {startIcon && <span className='mt-1'>{startIcon}</span>}
            {children}
            <span className='ml-1'>{endIcon}</span>
        </span>
    );
};

export default Badge;
