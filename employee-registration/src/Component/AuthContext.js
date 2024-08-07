import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();
debugger;
const API_URL = "https://localhost:44301/api/Login/";

const requestData = {
  email: '',
  password: '',
  username: '',
  token: '',
};
//const [isLoggedInUser, setIsLoggedInUser] = useState(false);

export const AuthProvider = ({ children }) => {
  debugger;
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  //setIsLoggedIn(isLoggedInUser);
  const storedUser = localStorage.getItem('user');
  const [user, setUser] = useState(() => {
    // Parse the user data from localStorage
    return storedUser ?? null;
  });
  const [token, setToken] = useState(() => {
    return localStorage.getItem('token');
  });
  const [role, setRole] = useState(() => {
    return localStorage.getItem('role');
  });
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(() => {
    return localStorage.getItem('email');
  });

  const [loggedInUserName, setLoggedInUserName] = useState(() => {
    return localStorage.getItem('username');
  });

  const [loggedInUserEmpId,setLoggedInUserEmpId] = useState(() => {
    return localStorage.getItem('empId');
  });

  const login = async (formData) => {
    // Implement your login logic here
    debugger;
    if(formData==null||formData==undefined)
    {
      return;
    }
    requestData.email= formData.email;
    requestData.password= formData.password;
    return await axios
      .post(API_URL + "Login", requestData)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token',response.data.token);
          localStorage.setItem('user',response.data);
          debugger;
          localStorage.setItem('role', response.data.roles);
          localStorage.setItem('email', response.data.email);
          localStorage.setItem('username', response.data.username);
          localStorage.setItem('empId', response.data.empId);
          setIsLoggedIn(true);
          setToken(response.data.token);
          setRole(response.data.roles);
          setLoggedInUserEmail(response.data.email);
          setLoggedInUserName(response.data.username);
          setLoggedInUserEmpId(response.data.empId);
          setUser(response.data);
        }
  
        return response.data;
      });
  };

  const logout = () => {
    // Implement your logout logic here
    debugger;
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    localStorage.removeItem('isLoggedIn');
    setUser(null);
    // return axios.post(API_URL + "signout").then((response) => {
    //   return response.data;
    // });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, role, token, loggedInUserEmail, loggedInUserName, loggedInUserEmpId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};