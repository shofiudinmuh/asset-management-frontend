import { useState } from 'react';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import AssetReportTable from '../../components/tables/AssetReportTable';

export default function AssetReportPage() {
    const [assetsReport, setAssetReport] = useState([]);

    return (
        <>
            <PageMeta title='Assets Report | Asset & Resource Management System' />

            <PageBreadCrumb pageTitle='Assets Report' />

            <div className='space-x-2 px-2 mx-2 dark:bg-gray-800'>
                <ComponentCard>
                    <AssetReportTable />
                </ComponentCard>
            </div>
        </>
    );
}
