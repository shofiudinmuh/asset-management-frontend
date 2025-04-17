import ComponentCard from '../../components/common/ComponentCard';
import PageBreadCrumb from '../../components/common/PageBreadCrumb';
import PageMeta from '../../components/common/PageMeta';
import AppLayout from '../../components/layout/AppLayout';
import UserTable from '../../components/tables/UserTable';

export default function User() {
    return (
        <>
            <PageMeta
                title='Users | Asset & Resource Management System'
                description='Daftar user'
            />

            <PageBreadCrumb pageTitle='Users' />

            <div className='space-y-6 px-2 py-2 mx-2 mt-2'>
                {/* <ComponentCard title='Users Table'> */}
                <UserTable />
                {/* </ComponentCard> */}
            </div>
        </>
    );
}
