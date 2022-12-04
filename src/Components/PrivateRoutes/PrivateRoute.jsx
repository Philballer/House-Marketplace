import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const loggedIn = true;

  //Outlet is for the child component passes into the private Route in App.js
  return loggedIn ? <Outlet /> : <Navigate to='/sign-in' />;
};

export default PrivateRoute;
