import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Paper } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
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


function SignUpComponent() {
  const [isOpened, setIsOpened] = useState(true);
  const navigate = useNavigate();
  const { logout } = useAuth();

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
                  name="employeeName"
                  required
                  fullWidth
                  id="employeeName"
                  label="Employee Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="empId"
                  label="Employee Id"
                  name="empId"
                  autoComplete="off"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
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
                  id="mobile"
                  label="Mobile Number"
                  name="mobile"
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