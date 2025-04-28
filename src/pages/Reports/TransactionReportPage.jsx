import { useState } from 'react';
import PageMeta from '../../components/common/PageMeta';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import ComponentCard from '../../components/common/ComponentCard';
import TransactionReportTable from '../../components/tables/TransactionReportTable';

export default function TransactionReportPage() {
    const [transaction, setTransaction] = useState([]);

    return (
        <>
            <PageMeta title='Transactions Report | Asset & Resource Management System' />

            <PageBreadCrumb pageTitle='Transactions Report' />

            <div className='space-x-2 px-2 mx-2 dark:bg-gray-800'>
                <ComponentCard>
                    <TransactionReportTable />
                </ComponentCard>
            </div>
        </>
    );
}
