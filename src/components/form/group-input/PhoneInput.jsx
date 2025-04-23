import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

const PhoneInput = ({
    countries,
    placeholder = '+62 123457890',
    onChange,
    selectPosition = 'start', //default position i 'start'
}) => {
    const [selectedCountry, setSelectedCountry] = useState('IDN');
    const [phoneNumber, setPhoneNumber] = useState('+62');

    const countryCode = countries.reduce((acc, { code, label }) => ({ ...acc, [code]: label }), {});

    const handleCountryChange = (e) => {
        const newCountry = e.target.value;
        setSelectedCountry(newCountry);
        setPhoneNumber(countryCode[newCountry]);
        if (onChange) {
            onChange(countryCode[newCountry]);
        }
    };

    const handlePhoneNumberChange = (e) => {
        const newPhoneNumber = e.target.value;
        setPhoneNumber(newPhoneNumber);
        if (onChange) {
            onChange(newPhoneNumber);
        }
    };

    return (
        <div className='relative flex'>
            {/* dropdown position: start */}
            {selectPosition === 'start' && (
                <div className='absolute'>
                    <select
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className='appearance-none bg-none rounded-l-lg border-0 border-r border-gray-200 bg-transparent py-2 pl-3.5 pr-8 
                        leading-tight text-gray-700 focus:border-brand-300 focud:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400'>
                        {countries.map((country) => (
                            <option
                                key={country.code}
                                value={country.code}
                                className='text-gray-700 dark:bg-gray-900 dark:text-gray-400'>
                                {country.code}
                            </option>
                        ))}
                    </select>

                    <div className='absolute inset-y-0 flex items-center text-gray-700 pointer-events-none bg-none right-3 dark:text-gray-400'>
                        <FiChevronDown className='text-current' size={20} />
                    </div>
                </div>
            )}

            {/* input field */}
            <input
                type='tel'
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder={placeholder}
                className={`dark:bg-dark-900 h-11 w-full ${
                    selectPosition === 'start' ? 'pl-[84px' : 'pr-[84px]'
                }
                rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400
                focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:bg-gray-900 dark:text-white/90 <dark:placeholder:text-white/30
                dark:focus:border-brand-800`}
            />

            {/* dropdown position: end */}
            {selectPosition === 'end' && (
                <div className='absoulte right-0'>
                    <select
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        className='appearance-none bg-none rounded-r-lg border-0 border-l border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight
                        text-gray-700 focus:border-brand-300 focus:outline-hidden focus-ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400'>
                        {countries.map((country) => (
                            <option
                                value={country.code}
                                key={country.code}
                                className='text-gray-700 dark:text-gray-900 dark:text-gray-400'>
                                {country.code}
                            </option>
                        ))}
                    </select>
                    <div className='absolute inset-y-0 flex items-center text-gray-700 pointer-events-none bg-none right-3 dark:text-gray-400'>
                        <FiChevronUp className='text-current' size={20} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhoneInput;
