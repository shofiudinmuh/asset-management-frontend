import { useState } from 'react';
import ComponentCard from '../../common/ComponentCard';
import Label from '../Label';
import InputField from '../input/InputField';
import Select from '../Select';
import { GoEye, GoEyeClosed } from 'react-icons/go';
import DatePicker from '../date-picker';
import { TiTime } from 'react-icons/ti';
import { FiCreditCard } from 'react-icons/fi';

export default function DefaultInput() {
    const [showPassword, setShowPassword] = useState(false);
    const options = [
        { value: 'marketing', label: 'Marketing' },
        { value: 'template', label: 'Template' },
        { value: 'development', label: 'Development' },
    ];

    const handleSelectChange = (value) => {
        console.log('Selected value: ', value);
    };

    return (
        <ComponentCard title='Default input'>
            <div className='space-y-6'>
                <Label htmlFor='input'>Input</Label>
                <InputField type='text' id='input' />
            </div>
            <div>
                <Label htmlFor='inputTwo'>Input with Placeholder</Label>
                <InputField type='text' id='inputTwo' placeholder='info@mail.com' />
            </div>
            <div>
                <Label>Option</Label>
                <Select
                    options={options}
                    placeholder='Select an option'
                    onChange={handleSelectChange}
                    className='dark:bg-dark-900'
                />
            </div>
            <div>
                <Label>Password Input</Label>
                <div className='relative'>
                    <InputField
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter your password'
                    />
                    <button
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2'>
                        {showPassword ? (
                            <GoEye className='fill-gray-500 dark:fill-gray-400' size={5} />
                        ) : (
                            <GoEyeClosed className='fill-gray-500 dark:fill-gray-400' size={5} />
                        )}
                    </button>
                </div>
            </div>

            <div>
                <DatePicker
                    id='date-picke'
                    label='Date picker input'
                    placeholder='Select a date'
                    onChange={(dates, currentDateString) => {
                        // handle logic here
                        console.log({
                            dates,
                            currentDateString,
                        });
                    }}
                />
            </div>

            <div>
                <Label htmlFor='time'>TIme Picker Input</Label>
                <div className='relative'>
                    <InputField
                        type='time'
                        id='time'
                        className='time'
                        onChange={(e) => console.log(e.target.value)}
                    />
                    <span className='absolute tezt-gray-500 -transalte-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400'>
                        <TiTime size={6} />
                    </span>
                </div>
            </div>

            <div>
                <Label htmlFor='payment'>Input with Payment</Label>
                <div className='relative'>
                    <InputField type='text' placeholder='Card number' className='pl-[62p]x' />
                    <span
                        className='absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200
                    dark:border-gray-800'>
                        <FiCreditCard size={20} />
                    </span>
                </div>
            </div>
        </ComponentCard>
    );
}
