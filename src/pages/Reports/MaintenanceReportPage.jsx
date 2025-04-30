import { useState } from 'react';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import MainteananceReportTable from '../../components/tables/MaintenanceReportTable';
export default function MaintenanceReportPage() {
    const [maintenancesReport, setMaintenanceReport] = useState([]);

    return (
        <>
            <PageMeta title='Maintenances Report | Asset & Resource Management System' />

            <PageBreadCrumb pageTitle='Maintenanes Report' />
            <div className='space-x-2 px-2 mx-2 dark:bg-gray-800'>
                <ComponentCard>
                    <MainteananceReportTable />
                </ComponentCard>
            </div>
        </>
    );
}
