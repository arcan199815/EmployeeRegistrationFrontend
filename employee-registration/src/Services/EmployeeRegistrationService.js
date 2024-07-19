import axios from "axios";

const API_URL = "https://localhost:44301/api/";

const fetchEmployeeRegistration = async (searchKeyword) => {
    try {
        debugger;
      const response = await axios.get(`${API_URL}EmployeeRegistration`, {
        params: {
          pageSize: 10,
          pageNumber: 1,
          searchKeyword: searchKeyword
        }
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error fetching employee registration:', error);
      throw error; // Optionally rethrow or handle as needed
    }
  };

  const EmployeeRegistrationService = {
    fetchEmployeeRegistration,
  }

export default EmployeeRegistrationService;    