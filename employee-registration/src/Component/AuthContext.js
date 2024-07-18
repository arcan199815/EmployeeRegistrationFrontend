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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //setIsLoggedIn(isLoggedInUser);
  const [user, setUser] = useState(null);

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
          setIsLoggedIn(true);
          setUser(response.data);
        }
  
        return response.data;
      });
  };

  const logout = () => {
    // Implement your logout logic here
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    setUser(null);
    // return axios.post(API_URL + "signout").then((response) => {
    //   return response.data;
    // });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};