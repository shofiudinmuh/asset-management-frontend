import flatpickr from 'flatpickr';
import { useEffect } from 'react';
import Label from './Label';
import { BiCalendar } from 'react-icons/bi';
import PropTypes from 'prop-types';

export default function DatePicker({ id, mode, onChange, label, defaultDate, placeholder }) {
    useEffect(() => {
        const flatPickr = flatpickr(`#${id}`, {
            mode: mode || 'single',
            static: true,
            monthSelectorType: 'static',
            dateFormat: 'Y-m-d',
            defaultDate,
            onChange,
        });

        return () => {
            if (!Array.isArray(flatPickr)) {
                flatPickr.destroy();
            }
        };
    }, [mode, onChange, id, defaultDate]);

    return (
        <div>
            {label && <Label htmlFor={id}>{label}</Label>}

            <div className='relative'>
                <input
                    id={id}
                    placeholder={placeholder}
                    className='h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs
                placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-900 dar:text-white/90 dark:placeholder:text-white/30
                bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:focus:border-brand-800'
                />
                <span className='absolute text-gray-500 -translate-y-1/2 pointer-event-none top-1/2 dark:text-gray-400'>
                    <BiCalendar className='size-6' />
                </span>
            </div>
        </div>
    );
}

DatePicker.propTypes = {
    id: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['single', 'multiple', 'range', 'time']),
    onChange: PropTypes.func,
    label: PropTypes.string,
    defaultDate: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
        PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])),
    ]),
    placeholder: PropTypes.string,
};
