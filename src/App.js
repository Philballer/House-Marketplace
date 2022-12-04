import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './Pages/Explore';
import Profile from './Pages/Profile';
import Offers from './Pages/Offers';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import Navbar from './Components/Navbar/Navbar';
import PrivateRoute from './Components/PrivateRoutes/PrivateRoute';

function App() {
  // profile leads to signin because its supposed to be a private page

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer
        newestOnTop={true}
        hideProgressBar={true}
        autoClose={2500}
      />
    </Fragment>
  );
}

export default App;
