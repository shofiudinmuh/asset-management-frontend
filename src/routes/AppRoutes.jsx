import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/auth/Login';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<Login />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
