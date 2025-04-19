import { useEffect, useRef } from 'react';
import { FiX } from 'react-icons/fi';

const Modal = ({
    isOpen,
    onClose,
    children,
    className,
    showCloseButton = true,
    isFullScreen = false,
}) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const contentClasses = isFullScreen
        ? 'w-full h-full'
        : 'relative w-full rounded-3xl bg-white dark:bg-gray-900';

    return (
        <div className='fixed inset-0 flex items-center justify-center overflow-y-auto modal z-99999'>
            {!isFullScreen && (
                <div
                    className='fixed inset-0 h-full bg-gray-400/50 backdrop-blur-[32px]'
                    onClick={onClose}></div>
            )}
            <div
                ref={modalRef}
                className={`${contentClasses} ${className}`}
                onClick={(e) => e.stopPropagation()}>
                {showCloseButton && (
                    <button
                        onClick={onClose}
                        className='absoulte right-3 top-3 z-999 flex h-9.5 w-9.5 items-center justify-center rounded-full 
                    bg-gray-100 text-gray-400 transitoin-colors hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-400
                    dark:hover:bg-gray-700 dark:text-white sm:right-6 sm:top-6 sm:h-11 sm:w-11'>
                        <FiX className='text-xl' />
                    </button>
                )}
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
