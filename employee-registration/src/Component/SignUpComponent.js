import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "./css/Layout.css";
import { useAuth } from "./AuthContext";
import { useLocation } from "react-router-dom";
import AuthService from "../Services/AuthService";
import ToastErrorPopup from "./ToasterComponent/ToastErrorPopupComponent"; // Adjust path as necessary
import ToastSuccessPopup from "./ToasterComponent/ToastSuccessPopupComponent"; // Adjust path as necessary
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "@mui/material/Link";
import EmployeeRegistrationService from "../Services/EmployeeRegistrationService";
import LoadingIndicator from "./LoadingIndicator";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import SignUpPdfComponent from "./SignUpPdfComponent";

function SignUpComponent() {
  const [isOpened, setIsOpened] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPdf, setShowPdf] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const { logout, user, role, loggedInUserEmail, loggedInUserName } = useAuth();
  const location = useLocation();
  const { employees } = location.state || {};
  const [address, setAddress] = useState([]);
  const [employmentDetails, setEmploymentDetails] = useState([]);
  const [employee, setEmployee] = useState([]);
  const [edit, setEdit] = useState(false);

  const dateInputRef = useRef(null);
  const dateInputRef1 = useRef(null);
  const contentRef = useRef(null);
  const [disabledForEmployee, setDisabledForEmployee] = useState(false);
  const [disabledForEmployeeId, setDisabledForEmployeeId] = useState(false);
  const [visibleBar, setVisibleBar] = useState(false);
  const [formData, setFormData] = useState({
    employeeRegistrationID: 0,
    empName: "",
    empId: "",
    empEmailId: "",
    employeeMobileNumber: 0,
    isDeleted: false,
    dob: "",
    gender: "",
    salary: 0.0,
    department: "",
    addressId: 0,
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    employmentDetailsId: 0,
    jobTitle: "",
    manager: "",
    startDate: null,
    employmentStatus: "",
  });

  const downloadPDF = () => {
    debugger;
    const input = contentRef.current;

    if (!input) {
      console.error("Cannot find content to convert to PDF");
      return;
    }

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "JPEG", 0, 0, width, height);

      // Example: Add form data to PDF
      const startY = 20; // Adjust as needed for positioning
      // pdf.text(`Employee Name: ${formData.empName}`, 20, startY);
      // pdf.text(`Employee ID: ${formData.empId}`, 20, startY + 10);
      // pdf.text(`Email Address: ${formData.empEmailId}`, 20, startY + 20);

      pdf.save("employee_registration.pdf");
    });
    setShowPdf(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    debugger;
    // Check for required fields
    if (!formData.empName) {
      toast.error("Employee Name is required");
      return;
    }
    if (!formData.empEmailId) {
      toast.error("Email is required");
      return;
    }
    if (!formData.empId) {
      toast.error("Employee ID is required");
      return;
    }
    if (!formData.employeeMobileNumber) {
      toast.error("Employee Mobile Number is required");
      return;
    }
    if (!formData.dob) {
      toast.error("Date of Birth is required");
      return;
    }
    if (!formData.gender) {
      toast.error("Gender is required");
      return;
    }
    if (!formData.salary) {
      toast.error("Salary is required");
      return;
    }
    if (!formData.department) {
      toast.error("Department is required");
      return;
    }
    if (!formData.streetAddress) {
      toast.error("Street Address is required");
      return;
    }
    if (!formData.city) {
      toast.error("City is required");
      return;
    }
    if (!formData.state) {
      toast.error("State is required");
      return;
    }
    if (!formData.postalCode) {
      toast.error("Postal Code is required");
      return;
    }
    if (!formData.country) {
      toast.error("Country is required");
      return;
    }
    if (!formData.jobTitle) {
      toast.error("Job Title is required");
      return;
    }
    if (!formData.manager) {
      toast.error("Manager is required");
      return;
    }
    if (!formData.startDate) {
      toast.error("Start Date is required");
      return;
    }
    if (!formData.employmentStatus) {
      toast.error("Employment Status is required");
      return;
    }

    // Example of additional validation, e.g., salary should be positive
    if (formData.salary <= 0) {
      toast.error("Salary should be a positive number");
      return;
    }

    // Example of additional validation for phone number (if necessary)
    if (!/^\d{10}$/.test(formData.employeeMobileNumber)) {
      toast.error("Employee Mobile Number should be 10 digits");
      return;
    }

    try {
      // Call the register function from AuthService
      setLoading(false);
      const userData = await EmployeeRegistrationService.register(formData);
      debugger;
      setShowPdf(true);
      if (userData.data == true) {
        setShowPdf(true); // Set showPdf to true to trigger PDF download
        setExpandedAccordion(true);
        toast.success("Employee Registered successfully", {
          autoClose: 5000, // 5000 milliseconds = 5 seconds
        });
        if (edit == false) {
          downloadPDF();
        }
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setTimeout(() => {
        navigate("/layout");
      }, 5000); // Navigate to another route upon success
      setLoading(false); // Stop loading state
    }
  };

  const handleDateInputClick = () => {
    dateInputRef.current.showPicker();
  };

  const handleDateInputClick1 = () => {
    dateInputRef1.current.showPicker();
  };

  const fetchDataById = async () => {
    debugger;
    try {
      debugger;
      const data =
        await EmployeeRegistrationService.fetchEmployeeRegistrationById(
          employees.iemployeeRegistrationId
        );
      console.log("Fetched employee registration:", data);
      setAddress(data.address);
      setEmploymentDetails(data.employmentDetails);
      setEmployee(data);
      setFormData(data);
      debugger;
      setFormData({
        employeeRegistrationID: data.employeeRegistrationID,
        empName: data.empName,
        empId: data.empId,
        empEmailId: data.empEmailId,
        employeeMobileNumber: data.employeeMobileNumber,
        dob: data.dob,
        gender: data.gender,
        salary: data.salary,
        department: data.department,
        addressId: data.addressId,
        streetAddress: data.address.vstreetAddress,
        city: data.address.vcity,
        state: data.address.vstate,
        postalCode: data.address.vpostalCode,
        country: data.address.vcountry,
        employmentDetailsId: data.employmentDetailsId,
        jobTitle: data.employmentDetails.vjobTitle,
        manager: data.employmentDetails.vmanager,
        startDate: data.employmentDetails.startDate,
        employmentStatus: data.employmentDetails.vemploymentStatus,
      });
    } catch (error) {
      console.error("Error fetching employee registration:", error);
    }
  };

  const handleInputChange = (event) => {
    debugger;
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const navigateToUser = () => {
    navigate("/layoutuser");
  };

  const navigateToRole = () => {
    navigate("/layoutrole");
  };

  const navigateToEmployeeRegistration = () => {
    navigate("/signupemployee");
  };

  const navigateToEmployeeDashboard = () => {
    navigate("/layout");
  };

  const navigateToTimeSheet = () => {
    navigate("/timesheet");
  };

  const navigateLogout = async () => {
    debugger;
    await logout();
    navigate("/");
  };

  const formatDate = (date) => {
    if (!date) return null;
    return date.toISOString().split("T")[0];
  };

  const handleAccordionToggle = () => {
    setExpandedAccordion(!expandedAccordion); // Toggle accordion state
  };

  useEffect(() => {
    debugger;
    //contentRef.current = document.querySelector('.main');
    setLoading(false);
    if (role == "Employee") {
      setVisibleBar(true);
      setDisabledForEmployee(true);
      console.log(user);
      setFormData({
        empName: loggedInUserName,
        empEmailId: loggedInUserEmail,
      });
    }
    if (employees) {
      setDisabledForEmployeeId(true);
      setEdit(true);
      fetchDataById(); // Set loading to false once initialization is done
    }
  }, [contentRef]);

  if (loading) {
    return <LoadingIndicator />;
  }

  const defaultTheme = createTheme();
  return (
    <>
      <ToastContainer />

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
              <Paper
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  background: "#adaaaa",
                }}
              >
                <Typography
                  variant="h12"
                  color="#090305"
                  fontFamily=' "Playwrite CU", cursive;'
                >
                  Menu
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  background: "#adaaaa",
                  cursor: "pointer",
                }}
                onClick={navigateToEmployeeDashboard}
              >
                <Typography
                  variant="h14"
                  color="#090305"
                  fontFamily=' "Playwrite CU", cursive;'
                >
                  Employee Dashboard
                </Typography>
              </Paper>
            </Grid>
            {visibleBar &&<Grid item xs={12}>
              <Paper
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  background: "#adaaaa",
                  cursor: "pointer",
                }}
                onClick={navigateToTimeSheet}
              >
                <Typography
                  variant="h14"
                  color="#090305"
                  fontFamily=' "Playwrite CU", cursive;'
                >
                  Time Sheet
                </Typography>
              </Paper>
            </Grid>}

            {!visibleBar &&<Grid item xs={12}>
              <Paper
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  background: "#adaaaa",
                  cursor: "pointer",
                }}
                onClick={navigateToEmployeeRegistration}
              >
                <Typography
                  variant="h14"
                  color="#090305"
                  fontFamily=' "Playwrite CU", cursive;'
                >
                  Employee Registration
                </Typography>
              </Paper>
            </Grid>}
            {!visibleBar && (
              <Grid item xs={12}>
                <Paper
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    background: "#adaaaa",
                    cursor: "pointer",
                  }}
                  onClick={navigateToUser}
                >
                  <Typography
                    variant="h14"
                    color="#090305"
                    fontFamily=' "Playwrite CU", cursive;'
                  >
                    User
                  </Typography>
                </Paper>
              </Grid>
            )}
            {!visibleBar && (
              <Grid item xs={12}>
                <Paper
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    background: "#adaaaa",
                    cursor: "pointer",
                  }}
                  onClick={navigateToRole}
                >
                  <Typography
                    variant="h14"
                    color="#090305"
                    fontFamily=' "Playwrite CU", cursive;'
                  >
                    Role
                  </Typography>
                </Paper>
              </Grid>
            )}
            <Grid item xs={12}>
              <Paper
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  background: "#adaaaa",
                  cursor: "pointer",
                }}
                onClick={navigateLogout}
              >
                <Typography
                  variant="h14"
                  color="#090305"
                  fontFamily=' "Playwrite CU", cursive;'
                >
                  Logout
                </Typography>
              </Paper>
            </Grid>
          </aside>
          <main className="main" ref={contentRef}>
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                    <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Sign up
                  </Typography>
                  <Box
                    component="form"
                    noValidate
                    //onSubmit={handleSubmit}
                    sx={{ mt: 3 }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="empName"
                          required
                          fullWidth
                          id="empName"
                          value={formData.empName}
                          onChange={handleInputChange}
                          disabled={disabledForEmployee}
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
                          disabled={disabledForEmployeeId}
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
                          disabled={disabledForEmployee}
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
                                  <Grid item xs={12}>
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
                                      inputProps={{ maxLength: 10 }}
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
                                      inputRef={dateInputRef1}
                                      onClick={handleDateInputClick1}
                                      inputProps={{
                                        max: formatDate(new Date()),
                                      }}
                                    />
                                  </Grid>

                                  <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                      <InputLabel id="gender-label">
                                        Gender
                                      </InputLabel>
                                      <Select
                                        labelId="gender-label"
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        label="Gender"
                                        autoComplete="sex"
                                      >
                                        <MenuItem value="">
                                          <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Female">
                                          Female
                                        </MenuItem>
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Prefer not to say">
                                          Prefer not to say
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
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
                                <Grid container spacing={2}>
                                  {" "}
                                  {/* Adjust spacing as needed */}
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
                                  <br />
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
                                  <br />
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
                                      value={
                                        formData.startDate
                                          ? formData.startDate.slice(0, 10)
                                          : ""
                                      }
                                      inputRef={dateInputRef}
                                      onClick={handleDateInputClick}
                                      onChange={handleInputChange}
                                      type="date"
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth required>
                                      <InputLabel id="employment-status-label">
                                        Employment Status
                                      </InputLabel>
                                      <Select
                                        labelId="employment-status-label"
                                        id="employmentStatus"
                                        name="employmentStatus"
                                        value={formData.employmentStatus}
                                        onChange={handleInputChange}
                                        label="Employment Status"
                                        autoComplete="organization-role"
                                      >
                                        <MenuItem value="">
                                          <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Full Time">
                                          Full Time
                                        </MenuItem>
                                        <MenuItem value="Part Time">
                                          Part Time
                                        </MenuItem>
                                        <MenuItem value="Internship">
                                          Internship
                                        </MenuItem>
                                        <MenuItem value="Contract">
                                          Contract
                                        </MenuItem>
                                        <MenuItem value="Temporary">
                                          Temporary
                                        </MenuItem>
                                        <MenuItem value="Freelance">
                                          Freelance
                                        </MenuItem>
                                      </Select>
                                    </FormControl>
                                  </Grid>
                                </Grid>
                              </AccordionDetails>
                            </Accordion>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>

                    <Button
                      type="submit"
                      //ref={contentRef}
                      fullWidth
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Register
                    </Button>
                  </Box>
                </Box>
              </Container>
              {/* {showPdf && (
        <SignUpPdfComponent
          isOpened={isOpened}
          setIsOpened={setIsOpened}
          contentRef={contentRef}
          setShowPdf={setShowPdf}
          formData={formData}
        />
      )} */}
            </ThemeProvider>
          </main>
        </div>
        {/* <div className="footer">
          <p>
            &copy; {new Date().getFullYear()} XYZ Company. All rights reserved.
          </p>
          <br />
          <p>Contact: contact@xyzcompany.com | Phone: +1 (123) 456-7890</p>
        </div> */}
      </div>
    </>
  );
}

export default SignUpComponent;
