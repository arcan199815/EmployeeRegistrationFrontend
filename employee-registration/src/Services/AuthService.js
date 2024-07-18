import axios from "axios";

const API_URL = "https://localhost:44301/api/Login/";

const requestData = {
  email: '',
  password: '',
  username: '',
  token: '',
};

const register = async (formData) => {
  debugger;
  requestData.username=formData.username;
  requestData.email= formData.email;
  requestData.password= formData.password;
    return await axios.post(API_URL + "Register", requestData);
  };

  const login = (formData) => {
    return axios
      .post(API_URL + "Login", formData)
      .then((response) => {
        if (response.data.username) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
  
        return response.data;
      });
  };

  const logout = () => {
    localStorage.removeItem("user");
    return axios.post(API_URL + "signout").then((response) => {
      return response.data;
    });
  };  

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
  }

  export default AuthService;  