import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './css/SignInComponent.css';
import backgroundImage from '../static/images/employee.png';
import { useAuth } from './AuthContext';
import { useHistory, useNavigate } from 'react-router-dom';
import ToastErrorPopup from './ToasterComponent/ToastErrorPopupComponent'; // Adjust path as necessary
import ToastSuccessPopup from './ToasterComponent/ToastSuccessPopupComponent'; // Adjust path as necessary
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignInComponent() {

  debugger;
    const defaultTheme = createTheme();
    const [isImageLoaded, setIsImageLoaded] = useState();
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
      email: '',
      password: '',
    });

    const handleInputChange = (event) => {
      setFormData({
        ...formData,
        [event.target.name]: event.target.value,
      });
    };

    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    };

    const handleSubmit = async (event) => {
      debugger;
      event.preventDefault();
      setLoading(true);
      setError('');

    // if(formData.username ==null || formData.username == undefined)
    // {
    //     <ToastErrorPopup message="User Name Required" />;
    //     return;
    // }
    if(formData.email ==null || formData.email == undefined)
    {
        <ToastErrorPopup message="Email Required" />;
        return;
    }
    if(formData.password ==null || formData.password == undefined)
    {
        <ToastErrorPopup message="Password Required" />;
        return;
    }
    if (!validatePassword(formData.password))
    {
        <ToastErrorPopup message="Password should be atleast 8 characters long with one capital letter, one small letter, one number and one special characters" />;
        return;
    }
  
      try {
        // const { email, password } = formData;
        const userData = await login(formData);
        debugger;
        if (userData.token) {
          login(); 
          navigate('/layout'); 
        } else {
          setError('Invalid username or password');
        }
      } catch (error) {
        console.error('Login error:', error);
        setError('Login failed. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    return (
      <>
      <ToastContainer />
      <ThemeProvider 
      theme={defaultTheme}
      >
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            className="bg-image"
            sx={{
              backgroundImage: `url(${backgroundImage})`,
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[500] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: '100%',
              //transition: 'backgroundImage 2.5s ease-in-out', // Transition property
              //opacity: isImageLoaded ? 1 : 0, // Fade in effect
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate 
              //onSubmit={handleSubmit} 
              sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  autoComplete="current-password"
                />
                {error && (
              <Typography component="p" variant="body2" color="error">
                {error}
              </Typography>
            )}
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ mt: 3, mb: 2 }}
                >
                  {loading ? <CircularProgress size={24} /> : 'Sign In'}
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signupuser" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                {/* <Copyright sx={{ mt: 5 }} /> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      </>
    );
  }
  
  export default SignInComponent;