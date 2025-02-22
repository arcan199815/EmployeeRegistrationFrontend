import React, { useEffect, useState } from "react";
import SignInComponent from "./Component/SignInComponent";
import SignUpComponent from "./Component/SignUpComponent";
import Layout_User from "./Component/Layout_User";
import Layout_Role from "./Component/Layout_Role";
import Layout from "./Component/Layout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./Component/PrivateRoute";
import { AuthProvider, useAuth } from "./Component/AuthContext";
import SignUpUserComponent from "./Component/SignUpUserComponent";
import SignUpPdfComponent from "./Component/SignUpPdfComponent";
import NotFoundPage from "./Component/NotFoundPage ";
import { ToastContainer } from "react-toastify";
import CreateUserComponent from "./Component/CreateUserComponent";
import TimeSheetComponent from "./Component/TimeSheetComponent";
import AddTimesheetComponent from "./Component/AddTimesheetComponent";

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
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<SignInComponent />} />
          <Route
            path="/signupemployee"
            element={
              isLoggedIn ? (
                <SignUpComponent />
              ) : (
                <Navigate to="/notfoundpage" replace />
              )
            }
          />
          <Route
            path="/signuppdfemployee"
            element={
              isLoggedIn ? (
                <SignUpPdfComponent />
              ) : (
                <Navigate to="/notfoundpage" replace />
              )
            }
          />
          <Route path="/signupuser" element={<SignUpUserComponent />} />
          <Route path="/createuser" element={<CreateUserComponent />} />
          <Route path="/timesheet" element={<TimeSheetComponent />} />
          <Route path="/add-timesheet" element={<AddTimesheetComponent />} />
          <Route path="/edit-timesheet" element={<AddTimesheetComponent />} />
          {/* <Route
            path="/timesheet"
            element={
              isLoggedIn ? <TimeSheetComponent /> : <Navigate to="/notfoundpage" replace />
            }
          /> */}

          <Route
            path="/layout"
            element={
              isLoggedIn ? <Layout /> : <Navigate to="/notfoundpage" replace />
            }
          />

          <Route
            path="/layoutuser"
            element={
              isLoggedIn ? (
                <Layout_User />
              ) : (
                <Navigate to="/notfoundpage" replace />
              )
            }
          />
          <Route
            path="/layoutrole"
            element={
              isLoggedIn ? (
                <Layout_Role />
              ) : (
                <Navigate to="/notfoundpage" replace />
              )
            }
          />
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
