import { useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
import { FaEye, FaXTwitter } from 'react-icons/fa6';
import Label from '../form/Label';
import InputField from '../form/input/InputField';
import { PiEyeClosed } from 'react-icons/pi';
import Checkbox from '../form/input/Checkbox';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/auth';

export default function SignInForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    // const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError({});

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError('Email atau password salah.');
        }
    };

    return (
        <div className='flex flex-col flex-1'>
            <div className='flex flex-col justify-center flex-1 w-full max-w-md mx-auto'>
                <div>
                    <div className='mb-5 sm:mb-8'>
                        <h1 className='mb-2 font-semibold text-gray-800 text-title-white/90 sm:text-title-md'>
                            Sign In
                        </h1>
                        <p className='text-sm text-gray-500 dark:text-gray-400'>
                            Enter your email and password to sign in!
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

                        <form onSubmit={handleSubmit}>
                            <div className='space-y-6'>
                                <div>
                                    <Label>
                                        Email
                                        <span className='text-error-500'>*</span>{' '}
                                    </Label>
                                    <InputField
                                        type='email'
                                        id='email'
                                        name='email'
                                        // value={formData.email}
                                        value={email}
                                        // onChange={handleChange}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='info@mail.com'
                                        required
                                    />
                                </div>

                                <div>
                                    <Label>
                                        Password
                                        <span className='text-error-500'></span>
                                    </Label>
                                    <div className='relative'>
                                        <InputField
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder='Enter your password'
                                            name='password'
                                            id='password'
                                            // value={formData.password}
                                            value={password}
                                            // onChange={handleChange}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className='absolute z-30 -translate-y-1/2 cursor -pointer right-4 top-1/2'>
                                            {showPassword ? (
                                                <FaEye className='fill-gray-500 dark:fill-gray-400 size-5' />
                                            ) : (
                                                <PiEyeClosed className='fill-gray-500 dark:fill-gray-400 size-5' />
                                            )}
                                        </span>
                                    </div>
                                </div>

                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-3'>
                                        <Checkbox checked={isChecked} onChange={setIsChecked} />
                                        <span className='block font-normal text-gray-700 text-theme-sm dark:text-gray-400'>
                                            Keep me loged in
                                        </span>
                                    </div>
                                    <Link
                                        to='/reset-password'
                                        className='text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400'>
                                        Forgot password?
                                    </Link>
                                </div>

                                <div>
                                    <button
                                        type='submit'
                                        disabled={isLoading}
                                        className='flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600'>
                                        {isLoading ? 'Signing in...' : 'Sign In'}
                                    </button>
                                </div>
                            </div>
                        </form>

                        <div className='mt-5'>
                            <p className='text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start'>
                                Don&apos;t have account? {''}
                                <Link
                                    to='/register'
                                    className='text-brand-500 hover:text-brand-600 dark:text-brand-400'>
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
