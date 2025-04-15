import { useState } from 'react';
import { Link } from 'react-router-dom';
import Label from '../form/Label';
import InputField from '../form/input/InputField';
import { FaEye, FaGoogle } from 'react-icons/fa';
import { PiEyeClosed } from 'react-icons/pi';
import Checkbox from '../form/input/Checkbox';
import { FaXTwitter } from 'react-icons/fa6';

export default function SignUpForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div className='flex flex-col justify-center flex-1 w-full max-w-md mx-auto'>
            <div>
                <div className='mb-5 sm:mb-8'>
                    <h1 className='mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md'>
                        Sign Up
                    </h1>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                        Enter your email and password to sign up!
                    </p>
                </div>

                <div>
                    <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5'>
                        <button
                            className='inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transitions-colors bg-gray-100 
                                                rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10'>
                            <FaGoogle style={{ color: '#4285F4' }} size={20} />
                            Sign in with Google
                        </button>
                        <button
                            className='inline-flex items-center justify-center gap-3
                                                py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7
                                                hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10'>
                            <FaXTwitter style={{ color: '#4285F4' }} size={20} />
                            Sign in with Twitter
                        </button>
                    </div>
                    <div className='relative py-3 sm:py-5'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-gray-200 dark:border-gray-800'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2'>
                                Or
                            </span>
                        </div>
                    </div>

                    {/* form */}
                    <form>
                        <div className='space-y-5'>
                            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                                {/* first name */}
                                <div className='sm:col-span-1'>
                                    <Label>
                                        First Name <span className='text-error-500'>*</span>
                                    </Label>
                                    <InputField
                                        type='text'
                                        id='first_name'
                                        name='first_name'
                                        placeholder='Enter your first name'
                                    />
                                </div>
                                {/* last name */}
                                <div className='sm:col-span-1'>
                                    <Label>
                                        Last Name <span className='text-error-500'>*</span>
                                    </Label>
                                    <InputField
                                        type='text'
                                        id='last_name'
                                        name='last_name'
                                        placeholder='Enter your last name'
                                    />
                                </div>
                            </div>
                            {/* email */}
                            <div>
                                <Label>
                                    Email <span className='text-error-500'>*</span>
                                </Label>
                                <InputField
                                    type='email'
                                    id='email'
                                    name='email'
                                    placeholder='Enter your email'
                                />
                            </div>

                            {/* password */}
                            <div>
                                <Label>
                                    Password <span className='text-error-500'>*</span>
                                </Label>
                                <div className='relative'>
                                    <InputField
                                        placeholder='Enter your password'
                                        type={showPassword ? 'text' : 'password'}
                                    />
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className='absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2'>
                                        {showPassword ? (
                                            <FaEye className='fill-gray-500 dark:fill-gray-400 size-5' />
                                        ) : (
                                            <PiEyeClosed className='fill-gray-500 dark:fill-gray-400 size-5' />
                                        )}
                                    </span>
                                </div>
                            </div>

                            {/* checkbox */}
                            <div className='flex items-center gap-3'>
                                <Checkbox
                                    className='w-5 h-5'
                                    checked={isChecked}
                                    onChange={setIsChecked}
                                />
                                <p className='inline-block font-normal text-gray-500 dark:gray-400'>
                                    By creating an account means you agree to the{' '}
                                    <span className='text-gray-800 dark:text-white/90' />
                                    Terms and Conditions,
                                    <span>
                                        {' '}
                                        and out{' '}
                                        <span className='text-gray-800 dark:text-white'>
                                            Privacy Policy
                                        </span>
                                    </span>
                                </p>
                            </div>

                            {/* button */}
                            <div>
                                <button className='flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600'>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </form>
                    <div className='mt-5'>
                        <p className='text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start'>
                            Already have an account?{' '}
                            <Link
                                to={'/login'}
                                className='text-brand-500 hover:text-brand-600 dark:text-brand-400'>
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
