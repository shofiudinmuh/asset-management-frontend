import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiInfo } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Alert = ({
    variant = 'info',
    title,
    message,
    showLink = false,
    linkHref = '#',
    linkText = 'Learn more',
}) => {
    // tailwind classes for each variant
    const variantClasses = {
        success: {
            container: 'border-green-500 bg-green-50 dark:border-green-500/30 dark:bg-green-500/15',
            icon: 'text-green-500',
        },
        error: {
            container: 'border-red-500 bg-red-50 dark:border-red-500/30 dark:bg-red-500/15',
            icon: 'text-red-500',
        },
        warning: {
            container:
                'border-yellow-500 bg-yellow-50 dark:border-yellow-500/30 dark:bg-yellow-500/15',
            icon: 'text-yellow-500',
        },
        info: {
            container: 'border-blue-500 bg-blue-50 dark:border-bluer-500/30 dark:bg-blue-500/15',
            icon: 'text-blue-500',
        },
    };

    // icon component
    const icons = {
        success: <FiCheckCircle className='text-current' size={20} />,
        error: <FiAlertCircle className='text-current' size={20} />,
        warning: <FiAlertTriangle className='text-current' size={20} />,
        info: <FiInfo className='text-current' size={20} />,
    };

    return (
        <div className={`rounded-xl border p-4 ${variantClasses[variant].container}`}>
            <div className='flex items-start gap-3'>
                <div className={`mt-0.5 ${variantClasses[variant].icon}`}>{icons[variant]}</div>

                <div className='flex-1'>
                    <h4 className='mb-1 text-sm font-semibold text-gray-800 dark:text-white/90'>
                        {title}
                    </h4>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>{message}</p>

                    {showLink && (
                        <Link
                            to={linkHref}
                            className='inline-block mt-2 text-sm font-medium text-gray-500 underline dark:text-gray-400'>
                            {linkText}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Alert;
