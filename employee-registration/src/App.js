import React, { useEffect, useState } from 'react';
import SignInComponent from './Component/SignInComponent';
import SignUpComponent from './Component/SignUpComponent';
import Layout from './Component/Layout';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PrivateRoute from './Component/PrivateRoute';
import { AuthProvider, useAuth } from './Component/AuthContext';
import SignUpUserComponent from './Component/SignUpUserComponent';
import NotFoundPage from './Component/NotFoundPage ';
import { ToastContainer } from 'react-toastify';

function App() {
  debugger;
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false); // Set loading to false once initialization is done
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator until initialization completes
  }
  return (
    <>
    {/* <AuthProvider> */}
    <Router>
      <Routes>
        <Route exact path="/" element={<SignInComponent />} />
        <Route path="/signupemployee" element={<SignUpComponent />} />
        <Route path="/signupuser" element={<SignUpUserComponent />} />
        <Route path="/layout" element={isLoggedIn ? <Layout /> : <Navigate to="/notfoundpage" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
     {/* </AuthProvider> */}
     {/* {!isLoggedIn && <Router>
      <Routes>
        <Route path="/notfoundpage" element={<NotFoundPage />}/>
      </Routes>
     </Router>} */}
     </>
  );
}

export default App;