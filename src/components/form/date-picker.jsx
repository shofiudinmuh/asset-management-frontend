import flatpickr from 'flatpickr';
import { useEffect, useRef } from 'react';
import Label from './Label';
import { BiCalendar } from 'react-icons/bi';
import PropTypes from 'prop-types';

export default function DatePicker({
    id,
    mode = 'single',
    onChange,
    label,
    defaultDate,
    placeholder,
}) {
    const inputRef = useRef(null);

    useEffect(() => {
        if (!inputRef.current) return;

        const flatPickr = flatpickr(inputRef.current, {
            mode,
            static: true,
            monthSelectorType: 'static',
            dateFormat: 'Y-m-d',
            defaultDate,
            onChange,
            responsive: true, // Enable responsive mode
        });

        return () => {
            flatPickr.destroy();
        };
    }, [mode, onChange, id, defaultDate]);

    return (
        <div className='w-full'>
            {label && <Label htmlFor={id}>{label}</Label>}

            <div className='relative'>
                <input
                    ref={inputRef}
                    id={id}
                    placeholder={placeholder || 'Select date'}
                    className='h-11 w-full rounded-md border border-gray-300 bg-white px-10 pr-4 py-2 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-400'
                    autoComplete='off'
                    data-input // Required for flatpickr
                />
                <span className='absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400 dark:text-gray-500'>
                    <BiCalendar className='w-5 h-5' />
                </span>
            </div>
        </div>
    );
}
