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

  const UserService = {
    fetchUser,
    fetchRole,
  }

export default UserService;    