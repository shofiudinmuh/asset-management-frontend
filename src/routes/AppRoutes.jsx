import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '../pages/Auth/SignUp';
import SignIn from '../pages/Auth/SignIn';
import AppLayout from '../components/layout/AppLayout';
import UserPage from '../pages/Users/UserPage';
import LocationPage from '../pages/Locations/LocationPage';
import SupplierPage from '../pages/Suppliers/SupplierPage';
import AssetPage from '../pages/Asset/AssetPage';
import MaintenancePage from '../pages/Maintenance/MaintenancePage';
import PuchaseOrderPage from '../pages/PurchaseOrder/PurchaseOrderPage';
import TransactionPage from '../pages/Transaction/TransactionPage';
import DocumentPage from '../pages/Documents/DocumentPage';
import TransactionReportPage from '../pages/Reports/TransactionReportPage';
import AssetReportPage from '../pages/Reports/AssetReportPage';
import MaintenanceReportPage from '../pages/Reports/MaintenanceReportPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path='/login' element={<SignIn />} />
                    <Route path='/register' element={<SignUp />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path='/' element={<AppLayout />}>
                            <Route path='dashboard' element={<DashboardPage />} />
                            <Route path='users' element={<UserPage />} />
                            <Route path='suppliers' element={<SupplierPage />} />
                            <Route path='assets' element={<AssetPage />} />
                            <Route path='maintenances' element={<MaintenancePage />} />
                            <Route path='locations' element={<LocationPage />} />
                            <Route path='transactions' element={<TransactionPage />} />
                            <Route path='purchase-orders' element={<PuchaseOrderPage />} />
                            <Route path='documents' element={<DocumentPage />} />
                            <Route path='report/transaction' element={<TransactionReportPage />} />
                            <Route path='report/asset' element={<AssetReportPage />} />
                            <Route path='report/maintenance' element={<MaintenanceReportPage />} />
                        </Route>
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;
