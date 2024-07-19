import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import './css/Layout.css';
import { useAuth } from './AuthContext';

import AuthService from '../Services/AuthService'
import ToastErrorPopup from './ToasterComponent/ToastErrorPopupComponent'; // Adjust path as necessary
import ToastSuccessPopup from './ToasterComponent/ToastSuccessPopupComponent'; // Adjust path as necessary
import 'react-toastify/dist/ReactToastify.css';
import Link from '@mui/material/Link';
import EmployeeRegistrationService from '../Services/EmployeeRegistrationService';

function SignUpComponent() {
  const [isOpened, setIsOpened] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [formData, setFormData] = useState({
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
  });  

  const handleSubmit = async (event) => {
    event.preventDefault();
    debugger;
    // Check for required fields
    if (!formData.empName) {
      <ToastErrorPopup message="Employee Name is required" />;
      return;
    }
    if (!formData.empEmailId) {
      <ToastErrorPopup message="Email is required" />;
      return;
    }
    if (!formData.empId) {
      <ToastErrorPopup message="Employee ID is required" />;
      return;
    }
    if (!formData.employeeMobileNumber) {
      <ToastErrorPopup message="Employee Mobile Number is required" />;
      return;
    }
    if (!formData.dob) {
      <ToastErrorPopup message="Date of Birth is required" />;
      return;
    }
    if (!formData.gender) {
      <ToastErrorPopup message="Gender is required" />;
      return;
    }
    if (!formData.salary) {
      <ToastErrorPopup message="Salary is required" />;
      return;
    }
    if (!formData.department) {
      <ToastErrorPopup message="Department is required" />;
      return;
    }
    if (!formData.streetAddress) {
      <ToastErrorPopup message="Street Address is required" />;
      return;
    }
    if (!formData.city) {
      <ToastErrorPopup message="City is required" />;
      return;
    }
    if (!formData.state) {
      <ToastErrorPopup message="State is required" />;
      return;
    }
    if (!formData.postalCode) {
      <ToastErrorPopup message="Postal Code is required" />;
      return;
    }
    if (!formData.country) {
      <ToastErrorPopup message="Country is required" />;
      return;
    }
    if (!formData.jobTitle) {
      <ToastErrorPopup message="Job Title is required" />;
      return;
    }
    if (!formData.manager) {
      <ToastErrorPopup message="Manager is required" />;
      return;
    }
    if (!formData.startDate) {
      <ToastErrorPopup message="Start Date is required" />;
      return;
    }
    if (!formData.employmentStatus) {
      <ToastErrorPopup message="Employment Status is required" />;
      return;
    }
  
    // Example of additional validation, e.g., salary should be positive
    if (formData.salary <= 0) {
      <ToastErrorPopup message="Salary should be a positive number" />;
      return;
    }
  
    // Example of additional validation for phone number (if necessary)
    if (!/^\d{10}$/.test(formData.employeeMobileNumber)) {
      <ToastErrorPopup message="Employee Mobile Number should be 10 digits" />;
      return;
    }
  
    try {
      // Call the register function from AuthService
      const userData = await EmployeeRegistrationService.register(formData);
      debugger;
      if (userData.data == true) {
        <ToastSuccessPopup message="User Registered successfully" />;
        navigate('/layout'); // Navigate to another route upon success
      } else {
        <ToastErrorPopup message="Registration failed. Please try again." />;
      }
    } catch (error) {
      console.error('Registration error:', error);
      <ToastErrorPopup message="An error occurred. Please try again." />;
    } finally {
      setLoading(false); // Stop loading state
    }
  };
  
  const handleInputChange = (event) => {
    debugger;
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const navigateToEmployeeRegistration = () => {
    navigate('/signupemployee');}

    const navigateToEmployeeDashboard = () => {
      navigate('/layout');}

    const navigateLogout = async () => {
      debugger;
      await logout();
      navigate('/');
    }

  const defaultTheme = createTheme();
  return (
    <>
    <div className="Layout">
      <div className="header">
    <div className="icon" onClick={() => setIsOpened(!isOpened)}>
        {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
    </div>
    <div className="header-title">Employee Registration</div>
    </div>
      <div className="container">
        <aside className={`${isOpened ? "opened" : ""} drawer`}>
        <Grid item xs={12}>
        <Paper style={{ padding: '1rem', textAlign: 'center', background: '#adaaaa' }}>
          <Typography variant="h12" color='#090305' fontFamily=' "Playwrite CU", cursive;'>Menu</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
      <Paper style={{ padding: '1rem', textAlign: 'center', background: '#adaaaa', cursor: 'pointer' }} onClick={navigateToEmployeeDashboard}>
          <Typography variant="h14" color='#090305' fontFamily=' "Playwrite CU", cursive;'>Employee Dashboard</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
      <Paper style={{ padding: '1rem', textAlign: 'center', background: '#adaaaa', cursor: 'pointer' }} onClick={navigateToEmployeeRegistration}>
          <Typography variant="h14" color='#090305' fontFamily=' "Playwrite CU", cursive;'>Employee Registration</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
      <Paper style={{ padding: '1rem', textAlign: 'center', background: '#adaaaa', cursor: 'pointer' }} onClick={navigateLogout}>
          <Typography variant="h14" color='#090305' fontFamily=' "Playwrite CU", cursive;'>Logout</Typography>
        </Paper>
      </Grid>
        </aside>
        <main className="main">
        <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate 
          //onSubmit={handleSubmit} 
          sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="empName"
                  required
                  fullWidth
                  id="empName"
                  value={formData.employeeName}
                  onChange={handleInputChange}
                  label="Employee Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="empId"
                  value={formData.empId}
                  onChange={handleInputChange}
                  label="Employee Id"
                  name="empId"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="empEmailId"
                  value={formData.empEmailId}
                  onChange={handleInputChange}
                  label="Email Address"
                  name="empEmailId"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
              <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Personal Information
                  </AccordionSummary>
                  <AccordionDetails>
                  <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="employeeMobileNumber"
                  label="Mobile Number"
                  name="employeeMobileNumber"
                  value={formData.employeeMobileNumber}
                  onChange={handleInputChange}
                  autoComplete="tel"
                  type="tel"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="dob"
                  //label="Date of Birth"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  autoComplete="bday"
                  type="date"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  autoComplete="sex"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="salary"
                  label="Salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  type="number"
                  InputProps={{
                    inputProps: { min: 0 } 
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="department"
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  autoComplete="organization"
                />
              </Grid>
              </Grid>
              </AccordionDetails>
              </Accordion>
              </Grid>
              <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Address
                  </AccordionSummary>
                  <AccordionDetails>
                  <Grid container spacing={2}> {/* Adjust spacing as needed */}
                    <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="streetAddress"
                  label="Street Address"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  autoComplete="street-address"
                />
                </Grid>
                <br/>
                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  autoComplete="address-level2"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  autoComplete="address-level1"
                />
                </Grid>

                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  autoComplete="postal-code"
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  autoComplete="country"
                /> 
                </Grid>
                </Grid>     
                  </AccordionDetails>
                </Accordion>

                </Grid>
                <Grid item xs={12}>
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Employement Details
                    
                  </AccordionSummary>
                  <AccordionDetails>
                  <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    {/* <Grid item xs={12}> */}
                    <TextField
                      required
                      fullWidth
                      id="jobTitle"
                      label="Job Title"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      autoComplete="organization-title"
                    />
                    </Grid>
                    <br/>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="department"
                        label="Department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        autoComplete="organization"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="manager"
                        label="Manager"
                        name="manager"
                        value={formData.manager}
                        onChange={handleInputChange}
                        autoComplete="organization"
                      />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="startDate"
                        label="Start Date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="employmentStatus"
                        label="Employment Status"
                        name="employmentStatus"
                        value={formData.employmentStatus}
                         onChange={handleInputChange}
                        autoComplete="organization-role"
                      />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                </Grid>
                </Grid>
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
        </main>
      </div>
      <div className="footer">Footer</div>
    </div>
    </>
    
  );
}

export default SignUpComponent;