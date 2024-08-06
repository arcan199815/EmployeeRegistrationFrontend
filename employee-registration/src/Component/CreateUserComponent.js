import React, { useState } from "react";
import { FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthService from "../Services/AuthService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function CreateUserComponent() {
  debugger;
  const defaultTheme = createTheme();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [confirmpassword, setConfirmPassword] = useState("");

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();
    if (
      formData.username == null ||
      formData.username == undefined ||
      formData.username == ""
    ) {
      toast.error("User Name Required");
      return;
    }
    if (
      formData.email == null ||
      formData.email == undefined ||
      formData.email == ""
    ) {
      toast.error("Email Required");
      return;
    }
    if (
      formData.password == null ||
      formData.password == undefined ||
      formData.password == ""
    ) {
      toast.error("Password Required");
      return;
    }
    if (!validatePassword(formData.password)) {
      toast.error(
        "Password should be atleast 8 characters long with one capital letter, one small letter, one number and one special characters"
      );
      return;
    }
    if (confirmpassword != formData.password) {
      toast.error("Password Didnot Match");
      return;
    }
    if (formData.role == null || formData.role == "") {
      toast.error("Role Required");
      return;
    }

    try {
      const userData = await AuthService.register(formData);
      debugger;
      if (userData.data.token) {
        //login();
        toast.success("User Registered successfully", {
          autoClose: 5000, // 5000 milliseconds = 5 seconds
        });
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else {
        //setError('Invalid username or password');
        toast.error("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
      //setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (password) => {
    // Regex for password validation: at least 8 characters, one uppercase letter,
    // one lowercase letter, one digit, and one special character
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <>
      <ToastContainer />
      {/* <ToastErrorPopup></ToastErrorPopup> */}
      {/* <ToastSuccessPopup></ToastSuccessPopup> */}
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
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="User Name"
                    value={formData.username}
                    onChange={handleInputChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                    value={formData.password}
                    onChange={handleInputChange}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmpassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmpassword"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      label="Gender"
                      autoComplete="sex"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="Employee">Employee</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={handleSubmit}
                sx={{ mt: 3, mb: 2 }}
              >
                Add User
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

export default CreateUserComponent;
