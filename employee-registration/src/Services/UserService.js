import axios from "axios";

const API_URL = "https://localhost:44301/api/";

const fetchUser = async (token) => {
    try {
        debugger;
        
      const response = await axios.get(`${API_URL}User`, {
        headers: {
            Authorization: `Bearer ${token}`
          }
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error fetching User:', error);
      throw error; // Optionally rethrow or handle as needed
    }
  };

  const fetchRole = async (token) => {
    try {
        debugger;
        
      const response = await axios.get(`${API_URL}User/GetAllRoles`, {
        headers: {
            Authorization: `Bearer ${token}`
          }
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error fetching Role:', error);
      throw error; // Optionally rethrow or handle as needed
    }
  };

  const deleteUser = (id) => {
    debugger;
return axios
    .post(`${API_URL}User/Delete?id=${id}`)
};

const deleteRole = (id) => {
    debugger;
return axios
    .post(`${API_URL}User/DeleteRole?id=${id}`)
};

const fetchUserById = async (id) => {
    try {
        debugger;
      const response = await axios.get(`${API_URL}User/GetById?id=${id}`, {
        
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error fetching employee registration:', error);
      throw error; // Optionally rethrow or handle as needed
    }
  };

  const UserService = {
    fetchUser,
    fetchRole,
    deleteUser,
    fetchUserById,
    deleteRole,
  }

export default UserService;    