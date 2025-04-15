import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '../pages/Auth/SignUp';
import SignIn from '../pages/Auth/SignIn';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path='/login' element={<SignIn />} />
                <Route path='/register' element={<SignUp />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
