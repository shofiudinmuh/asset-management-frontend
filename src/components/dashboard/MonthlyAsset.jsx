import { useState } from 'react';
import { MdMoreVert } from 'react-icons/md';
import Dropdown from '../ui/Dropdown';
import DropdownItem from '../ui/DropdownItem';
import Chart from 'react-apexcharts';
import { FiArrowUp, FiChevronUp } from 'react-icons/fi';

export default function MonthlyAsset() {
    const series = [75.23];
    const options = {
        colors: ['#465FFF'],
        chart: {
            fontFamily: 'Poppins, sans-serif',
            type: 'radialBar',
            height: 330,
            sparkline: {
                enabled: true,
            },
        },
        plotOptions: {
            radialBar: {
                startAngle: -85,
                endAngle: 85,
                hollow: {
                    size: '80%',
                },
                track: {
                    background: '#e4e7ec',
                    strokeWidth: '100%',
                    margin: 5,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        fontSize: '36px',
                        fontWeight: '600',
                        offsetY: -40,
                        color: '#1d2939',
                        formatter: function (val) {
                            return `${val}` + '%';
                        },
                    },
                },
            },
        },
        fill: {
            type: 'solid',
            colors: ['#465fff'],
        },
        stroke: {
            lineCap: 'round',
        },
        labels: ['Progress'],
    };

    const [isOpen, setIsOpen] = useState(false);

    function toggleDropDown() {
        setIsOpen(!isOpen);
    }

    function closeDropDown() {
        setIsOpen(false);
    }

    return (
        <div className='rounded-2xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-white/[0.03]'>
            <div className='px-5 pt-5 bg-white shadow-default rounded-2xl pb-11 dark:bg-gray-900 sm:px-6 sm:pt-6'>
                <div className='flex justify-between'>
                    <div>
                        <h3 className='text-lg font-semibold text-gray-800 dark:text-white/90'>
                            Monthly Status
                        </h3>
                        <p className='mt-1 text-gray-500 text-theme-sm dark:text-gray-400'>
                            Status of transaction proses for each month
                        </p>
                    </div>

                    <div className='relative inline-block'>
                        <button onClick={toggleDropDown} className='dropdown-toggle'>
                            <MdMoreVert className='text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6' />
                        </button>
                        <Dropdown isOpen={isOpen} onClose={closeDropDown} className='w-40 p-2'>
                            <DropdownItem
                                onItemClick={closeDropDown}
                                className='flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'>
                                View More
                            </DropdownItem>
                            <DropdownItem
                                onItemClick={closeDropDown}
                                className='flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'>
                                Delete
                            </DropdownItem>
                        </Dropdown>
                    </div>
                </div>

                <div className='relative'>
                    <div className='max-h-[330px]' id='chartDarkStyke'>
                        <Chart options={options} series={series} type='radialBar' height={330} />
                    </div>
                    <span className='absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500'>
                        +10%
                    </span>
                </div>

                <p className='mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base'>
                    You have 10 completed transactions for today. Keep up your work!
                </p>
            </div>

            <div className='flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5 dark:border-gray-800 dark:bg-white/[0.03]'>
                <div>
                    <p className='mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm'>
                        Completed
                    </p>
                    <p className='flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg'>
                        24
                        <FiArrowUp className='text-green-500 dark:text-green-700' />
                    </p>
                </div>

                <div className='w-px bg-gray-200 h-7 dark:bg-gray-800'></div>

                <div>
                    <p className='mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm'>
                        Out
                    </p>
                    <p className='flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg'>
                        29
                        <FiArrowUp className='text-green-500 dark:text-green-700' />
                    </p>
                </div>

                <div className='w-px bg-gray-200 h-7 dark:bg-gray-800'></div>

                <div>
                    <p className='mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm'>
                        Repair
                    </p>
                    <p className='flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg'>
                        15
                        <FiArrowUp className='text-green-500 dark:text-green-700' />
                    </p>
                </div>

                <div className='w-px bg-gray-200 h-7 dark:bg-gray-800'></div>

                <div>
                    <p className='mb-1 text-center text-gray-500 text-theme-xs dark:text-gray-400 sm:text-sm'>
                        Spoiled
                    </p>
                    <p className='flex items-center justify-center gap-1 text-base font-semibold text-gray-800 dark:text-white/90 sm:text-lg'>
                        15
                        <FiArrowUp className='text-green-500 dark:text-green-700' />
                    </p>
                </div>
            </div>
        </div>
    );
}
