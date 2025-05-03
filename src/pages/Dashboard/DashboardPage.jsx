import PageMeta from '../../components/common/PageMeta';
import AssetManagementMetrics from '../../components/dashboard/AssetManagementMetrics';
import AssetTransactionChart from '../../components/dashboard/AssetTransactionChart';
import MonthlyAsset from '../../components/dashboard/MonthlyAsset';
import StatisticsChart from '../../components/dashboard/StatisticsChart';

export default function DashboardPage() {
    return (
        <>
            <PageMeta title='Dashboard | Asset & Resource Management System' />

            <div className='grid grid-cols-12 gap-4 md:gap-6'>
                <div className='col-span-12 space-y-6 xl:col-span-7'>
                    <AssetManagementMetrics />

                    <AssetTransactionChart />
                </div>

                <div className='col-span-12 xl:col-span-5'>
                    <MonthlyAsset />
                </div>

                <div className='col-span-12'>
                    <StatisticsChart />
                </div>
            </div>
        </>
    );
}
