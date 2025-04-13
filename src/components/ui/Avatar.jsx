const Avatar = ({ src, alt = 'User Avatar', size = 'medium', status = 'none' }) => {
    // size classess for avatar
    const sizeClasses = {
        xsmall: 'h-6 w-6 max-w-6',
        small: 'h-8 w-8 max-w-8',
        medium: 'h-10 w-10 max-w-10',
        large: 'h-12 w-12 max-w-12',
        xlarge: 'h-14 w-14 max-w-12',
        xxlarge: 'h-16 w-16 max-w-16',
    };

    // size classes for status indicator
    const statusSizeClasses = {
        xsmall: 'h-1.5 w-1.5 max-w-1.5',
        small: 'h-2 w-2 max-w-2',
        medium: 'h-2.5 w-2.5 max-w-2.5',
        large: 'h-3 w-3 max-w-3',
        xlarge: 'h-3.5 w-3.5 max-w-3.5',
        xxlarge: 'h-4 w-4 max-w-4',
    };

    // color classes for status indicator
    const statusColorClasses = {
        online: 'bg-green-500',
        offline: 'bg-red-400',
        busy: 'bg-yellow-500',
    };

    return (
        <div className={`avatar relative rounded-full ${sizeClasses[size]}`}>
            <img
                src={src}
                alt={alt}
                className='avatar-image object-cover w-full h-full rounded-full'
            />

            {/* status indicator */}
            {status !== 'none' && (
                <span
                    className={`avatar-status absolute bottom-0 right-0 rounded-fu;; border-[1.5px] border-white dark:border-gray-900
                    ${statusSizeClasses[size]}
                    ${statusColorClasses[status]}`}></span>
            )}
        </div>
    );
};

export default Avatar;
