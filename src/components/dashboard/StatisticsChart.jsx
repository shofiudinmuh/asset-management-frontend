import ChartTab from '../common/ChartTab';
import Chart from 'react-apexcharts';

export default function StatisticsChart() {
    const options = {
        legend: {
            show: false,
            position: 'top',
            horizontalAlign: 'left',
        },
        colors: ['#465fff', '#9cb9ff'],
        chart: {
            fontFamily: 'Poppins, sans-serif',
            height: 310,
            type: 'line',
            toolbar: {
                show: false,
            },
        },
        stroke: {
            curve: 'straight',
            width: [2, 2],
        },
        fill: {
            type: 'gradient',
            gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
            },
        },
        markers: {
            size: 0,
            strokeColors: '#fff',
            strokeWidth: 2,
            hover: {
                size: 6,
            },
        },
        grid: {
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            enabled: true,
            x: {
                format: 'dd MM yyy',
            },
        },
        xaxis: {
            type: 'category',
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
            tooltip: {
                enabled: false,
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px',
                    colors: ['#6b7280'],
                },
            },
            title: {
                text: '',
                style: {
                    fontSize: '0px',
                },
            },
        },
    };

    const series = [
        {
            name: 'In',
            data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235],
        },
        {
            name: 'Out',
            data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140],
        },
        {
            name: 'Repair',
            data: [20, 15, 24, 35, 25, 30, 18, 29, 30, 40, 25, 20],
        },
    ];

    return (
        <div className='rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6'>
            <div className='flex flex-cols gap-5 mb-6 sm:flex-row sm:justify-between'>
                <div className='w-full'>
                    <h3 className='text-lg font-semibold text-gray-800 dark:text-white/90'>
                        Statistics
                    </h3>
                    <p className='mt-1 text-gray-500 text-theme-sm dark:text-gray-400'>
                        Statistics for all progress
                    </p>
                </div>
                <div className='flex items-start w-full gap-3 sm:justify-end'>
                    <ChartTab />
                </div>
            </div>

            <div className='max-w-full overflow-x-auto customm-scrollbar'>
                <div className='min-w-[1000px] xl:min-w-full'>
                    <Chart options={options} series={series} type='area' height={310} />
                </div>
            </div>
        </div>
    );
}
