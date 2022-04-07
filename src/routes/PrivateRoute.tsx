import React from 'react';
import {Outlet} from 'react-router-dom';
// import {useSelector} from 'react-redux';

const PrivateRoute = () => {
  // const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  // return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
