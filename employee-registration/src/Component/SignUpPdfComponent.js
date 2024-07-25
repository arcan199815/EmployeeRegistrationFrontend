import React, { useEffect, useRef, useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Paper, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
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
import { useLocation } from 'react-router-dom';
import AuthService from '../Services/AuthService'
import ToastErrorPopup from './ToasterComponent/ToastErrorPopupComponent'; // Adjust path as necessary
import ToastSuccessPopup from './ToasterComponent/ToastSuccessPopupComponent'; // Adjust path as necessary
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from '@mui/material/Link';
import EmployeeRegistrationService from '../Services/EmployeeRegistrationService';
import LoadingIndicator from './LoadingIndicator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function SignUpPdfComponent({ isOpened, setIsOpened, contentRef, setShowPdf, formData }) {
    debugger;
  
    useEffect(() => {
        debugger;
        if (contentRef.current) {
            console.log("Ref is set:", contentRef.current);
          } else {
            console.log("Ref is not set yet.");
          }
    }, [contentRef]);
  
  const defaultTheme = createTheme();
  return (
    <>
    <div className="Layout" >
      <div className="container">
        <main className="main" ref={contentRef}>
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
            <Grid container spacing={2}>
              <Grid item xs={12}>
              <Grid container spacing={2}>
              <Grid item xs={12}>
                    Personal Information
                  <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="employeeMobileNumber"
                  label="Mobile Number"
                  name="employeeMobileNumber"
                  value={formData.employeeMobileNumber}
                  //onChange={handleInputChange}
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
                  //onChange={handleInputChange}
                  autoComplete="bday"
                  type="date"
                  //inputRef={dateInputRef1}
                  //onClick={handleDateInputClick1}
                  //inputProps={{ max: formatDate(new Date()) }} 
                />
              </Grid>

              <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  //onChange={handleInputChange}
                  label="Gender"
                  autoComplete="sex"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Prefer not to say">Prefer not to say</MenuItem>
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
                  //onChange={handleInputChange}
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
                  //onChange={handleInputChange}
                  autoComplete="organization"
                />
              </Grid>
              </Grid>
              <Grid item xs={12}>
                    Address
                  <Grid container spacing={2}> {/* Adjust spacing as needed */}
                    <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="streetAddress"
                  label="Street Address"
                  name="streetAddress"
                  value={formData.streetAddress}
                  //onChange={handleInputChange}
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
                  //onChange={handleInputChange}
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
                  //onChange={handleInputChange}
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
                  //onChange={handleInputChange}
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
                  //onChange={handleInputChange}
                  autoComplete="country"
                /> 
                </Grid>
                </Grid>     
                </Grid>
                <Grid item xs={12}>
                    Employement Details
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
                      //onChange={handleInputChange}
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
                        //onChange={handleInputChange}
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
                        //onChange={handleInputChange}
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
                        value={formData.startDate ? formData.startDate.slice(0, 10) : ''}
                        //inputRef={dateInputRef}
                        //onClick={handleDateInputClick}
                        //onChange={handleInputChange}
                        type="date"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required>
                        <InputLabel id="employment-status-label">Employment Status</InputLabel>
                        <Select
                          labelId="employment-status-label"
                          id="employmentStatus"
                          name="employmentStatus"
                          value={formData.employmentStatus}
                          //onChange={handleInputChange}
                          label="Employment Status"
                          autoComplete="organization-role"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="Full Time">Full Time</MenuItem>
                          <MenuItem value="Part Time">Part Time</MenuItem>
                          <MenuItem value="Internship">Internship</MenuItem>
                          <MenuItem value="Contract">Contract</MenuItem>
                          <MenuItem value="Temporary">Temporary</MenuItem>
                          <MenuItem value="Freelance">Freelance</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    </Grid>
              </Grid>
              </Grid>
            </Grid>
            </Grid>
            </Grid>
          
    </ThemeProvider>
        </main>
      </div>
    </div>
    </>
    
  );
}

export default SignUpPdfComponent;