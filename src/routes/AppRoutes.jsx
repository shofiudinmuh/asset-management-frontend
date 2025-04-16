import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '../pages/Auth/SignUp';
import SignIn from '../pages/Auth/SignIn';
import User from '../pages/Users/User';
import AppLayout from '../components/layout/AppLayout';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<SignIn />} />
                <Route path='/register' element={<SignUp />} />

                <Route path='/' element={<AppLayout />}>
                    <Route path='users' element={<User />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default AppRoutes;
