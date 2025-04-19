import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '../pages/Auth/SignUp';
import SignIn from '../pages/Auth/SignIn';
import AppLayout from '../components/layout/AppLayout';
import UserPage from '../pages/Users/UserPage';
import LocationPage from '../pages/Locations/LocationPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<SignIn />} />
                <Route path='/register' element={<SignUp />} />

                <Route path='/' element={<AppLayout />}>
                    <Route path='users' element={<UserPage />} />
                    <Route path='locations' element={<LocationPage />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
