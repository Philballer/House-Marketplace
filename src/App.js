import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './Pages/Explore';
import Profile from './Pages/Profile';
import Offers from './Pages/Offers';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ForgotPassword from './Pages/ForgotPassword';
import Navbar from './Components/Navbar/Navbar';

function App() {
  // profile leads to signin because its supposed to be a private page

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/profile' element={<SignIn />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Routes>
        <Navbar />
      </Router>
    </Fragment>
  );
}

export default App;
