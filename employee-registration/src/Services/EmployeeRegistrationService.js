import axios from "axios";
import { useAuth } from "../Component/AuthContext";

const API_URL = "https://localhost:44301/api/";

const requestData = {
  employeeRegistrationID: 0,
  empName: '',
  empId: '',
  empEmailId: '',
  employeeMobileNumber: 0,
  isDeleted: false,
  dob: '',
  gender: '',
  salary: 0.0,
  department: '',
  addressId: 0,
  streetAddress: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  employmentDetailsId: 0,
  jobTitle: '',
  manager: '',
  startDate: null,
  employmentStatus: ''
};



const register = async (formData) => {
  debugger;

  // Populate requestData with formData fields
  requestData.employeeRegistrationID = formData.employeeRegistrationID;
  requestData.empName = formData.empName;
  requestData.empId = formData.empId;
  requestData.empEmailId = formData.empEmailId;
  requestData.employeeMobileNumber = formData.employeeMobileNumber;
  requestData.isDeleted = formData.isDeleted;
  requestData.dob = formData.dob;
  requestData.gender = formData.gender;
  requestData.salary = formData.salary;
  requestData.department = formData.department;
  requestData.addressId = formData.addressId;
  requestData.streetAddress = formData.streetAddress;
  requestData.city = formData.city;
  requestData.state = formData.state;
  requestData.postalCode = formData.postalCode;
  requestData.country = formData.country;
  requestData.employmentDetailsId = formData.employmentDetailsId;
  requestData.jobTitle = formData.jobTitle;
  requestData.manager = formData.manager;
  requestData.startDate = formData.startDate;
  requestData.employmentStatus = formData.employmentStatus;

  // Make the POST request
  return await axios.post(API_URL + "EmployeeRegistration", requestData);
};


const fetchEmployeeRegistration = async (searchKeyword, token) => {
    try {
        debugger;
        
      const response = await axios.get(`${API_URL}EmployeeRegistration`, {
        params: {
          pageSize: 100,
          pageNumber: 1,
          searchKeyword: searchKeyword
        },
        headers: {
            Authorization: `Bearer ${token}`
          }
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error fetching employee registration:', error);
      throw error; // Optionally rethrow or handle as needed
    }
  };

  const fetchEmployeeRegistrationById = async (id) => {
    try {
        debugger;
      const response = await axios.get(`${API_URL}EmployeeRegistration/GetById?id=${id}`, {
        
      });
      return response.data;
    } catch (error) {
      // Handle error
      console.error('Error fetching employee registration:', error);
      throw error; // Optionally rethrow or handle as needed
    }
  };

const deleteEmployee = (id) => {
    debugger;
return axios
    .post(`${API_URL}EmployeeRegistration/Delete?id=${id}`)
};



  const EmployeeRegistrationService = {
    fetchEmployeeRegistration,
    deleteEmployee,
    register,
    fetchEmployeeRegistrationById,
  }

export default EmployeeRegistrationService;    