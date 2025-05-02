import { useState } from 'react';
import { MdMoreVert } from 'react-icons/md';
import DropdownItem from '../ui/DropdownItem';
import Dropdown from '../ui/Dropdown';
import Chart from 'react-apexcharts';

export default function AssetTransactionChart() {
    const options = {
        colors: ['#465fff'],
        chart: {
            fontFamily: 'Poppins, sans-serif',
            type: 'bar',
            height: 180,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '39%',
                borderRadius: 5,
                borderRadiusApplication: 'end',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 4,
            colors: ['transparent'],
        },
        xaxis: {
            categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
            fontFamily: 'Poppins',
        },
        yaxis: {
            title: {
                text: undefined,
            },
        },
        grid: {
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        fill: {
            opacity: 1,
        },

        tooltip: {
            x: {
                show: false,
            },
            y: {
                formatter: () => `${val}`,
            },
        },
    };

    const series = [
        {
            name: 'Transaction',
            data: [168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112],
        },
    ];

    const [isOpen, setIsOpen] = useState(false);

    function toggleDropDown() {
        setIsOpen(!isOpen);
    }

    function closeDropDown() {
        setIsOpen(false);
    }

    return (
        <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:pt-6'>
            <div className='flex items-center justify-between'>
                <h3 className='text-lg font-semibold text-gray-800 dark:text-white/90'>
                    Monthly Transactions
                </h3>

                <div className='relative inline-block'>
                    <button onClick={toggleDropDown} className='dropdown-toggle'>
                        <MdMoreVert className='text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 size-6' />
                    </button>
                    <Dropdown isOpen={isOpen} onClose={closeDropDown} className='w-40 p-2'>
                        <DropdownItem
                            onItemClick={closeDropDown}
                            className='flex w-full font-normal text-left text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'>
                            View More
                        </DropdownItem>
                        <DropdownItem
                            onItemClick={closeDropDown}
                            className='flex w-full font-normal text-left text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300'>
                            Delete
                        </DropdownItem>
                    </Dropdown>
                </div>
            </div>

            <div className='max-w-full overflow-x-auto custom-scrollbar'>
                <div className='-ml-5 min-w-[650px] xl:min-w-full pl-2'>
                    <Chart options={options} series={series} type='bar' height={180} />
                </div>
            </div>
        </div>
    );
}
