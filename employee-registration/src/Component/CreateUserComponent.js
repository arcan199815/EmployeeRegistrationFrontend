import React, { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Paper from "@mui/material/Paper";
import { useAuth } from "./AuthContext";
import UserService from "../Services/UserService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
    empId: "",
  });
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [confirmpassword, setConfirmPassword] = useState("");
  const [isOpened, setIsOpened] = useState(true);
  const [searchQuery, setSearchQuery] = useState(null);
  const [employee, setEmployee] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [Id, setId] = useState(0);
  const location = useLocation();
  const { users } = location.state || {};
  const { logout } = useAuth(); //
  const [page, setPage] = useState(0); //
  const [rowsPerPage, setRowsPerPage] = useState(6); //
  const { token, role } = useAuth();
  const [edit, setEdit] = useState(false);
  const [visibleBar, setVisibleBar] = useState(false);

  const navigateToRole = () => {
    navigate("/layoutrole");
  };

  const navigateToEmployeeRegistration = () => {
    navigate("/signupemployee");
  };

  const navigateToEmployeeDashboard = () => {
    navigate("/layout");
  };

  const navigatetoTimeSheet = () => {
    navigate("/timesheet");
  };

  const navigateToUser = () => {
    navigate("/layoutuser");
  };

  const novigateToSignupUser = () => {
    navigate("/signupuser");
  };

  const navigateToCreateUser = () => {
    navigate("/createUser");
  };

  const navigateLogout = async () => {
    debugger;
    await logout();
    navigate("/");
  };

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
    if (!edit) {
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
          navigate("/layoutuser");
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

  const fetchDataById = async () => {
    debugger;
    try {
      debugger;
      const data = await UserService.fetchUserById(users.iuserId);
      console.log("Fetched employee registration:", data);
      setFormData({
        username: data.vuserName,
        role: data.vrole,
        email: data.vemailId,
        //password: data.vpassword,
      });
      debugger;
    } catch (error) {
      console.error("Error fetching employee registration:", error);
    }
  };

  useEffect(() => {
    debugger;
    //contentRef.current = document.querySelector('.main');
    if (role == "Employee") {
      setVisibleBar(true);
    }
    setLoading(false);
    if (users) {
      setEdit(true);
      fetchDataById(); // Set loading to false once initialization is done
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="Layout">
        <div className="header">
          <div className="icon" onClick={() => setIsOpened(!isOpened)}>
            {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
          </div>
          <div className="header-title">User Dashboard</div>
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

            <Grid item xs={12}>
              <Paper
                style={{
                  padding: "1rem",
                  textAlign: "center",
                  background: "#adaaaa",
                  cursor: "pointer",
                }}
                onClick={navigatetoTimeSheet}
              >
                <Typography
                  variant="h14"
                  color="#090305"
                  fontFamily=' "Playwrite CU", cursive;'
                >
                  Time Sheet
                </Typography>
              </Paper>
            </Grid>

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
          <main className="main">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-start"
              sx={{ mb: 2 }}
            >
              <ArrowBackIcon
                style={{
                  cursor: "pointer",
                  fontSize: 32, // Adjust size as needed
                  color: "primary", // Adjust color as needed
                }}
                onClick={navigateToUser} // Attach click event for going back
              />
            </Box>

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
                  {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar> */}

                  <Typography component="h1" variant="h5">
                    Add User
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
                          disabled={edit}
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
                          disabled={edit}
                          value={formData.email}
                          onChange={handleInputChange}
                          autoComplete="email"
                        />
                      </Grid>
                      {!edit && (
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
                      )}
                      {!edit && (
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
                      )}
                      {/* <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="empId"
                  label="Employee Id"
                  type="empId"
                  id="empId"
                  value={formData.empId}
                  onChange={handleInputChange}
                  //autoComplete="new-password"
                />
              </Grid> */}
                      <Grid item xs={12}>
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
                            disabled={edit}
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
                    {!edit && (
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Add User
                      </Button>
                    )}
                    {/* <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid> */}
                  </Box>
                </Box>
              </Container>
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
    // <>
    //   <ToastContainer />
    //   {/* <ToastErrorPopup></ToastErrorPopup> */}
    //   {/* <ToastSuccessPopup></ToastSuccessPopup> */}
    //   <ThemeProvider theme={defaultTheme}>
    //     <Container component="main" maxWidth="sm">
    //       <CssBaseline />
    //       <Box
    //         sx={{
    //           marginTop: 8,
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //           <LockOutlinedIcon />
    //         </Avatar>
    //         <Typography component="h1" variant="h5">
    //           Sign up
    //         </Typography>
    //         <Box
    //           component="form"
    //           noValidate
    //           //onSubmit={handleSubmit}
    //           sx={{ mt: 3 }}
    //         >
    //           <Grid container spacing={2}>
    //             <Grid item xs={12}>
    //               <TextField
    //                 autoComplete="given-name"
    //                 name="username"
    //                 required
    //                 fullWidth
    //                 id="username"
    //                 label="User Name"
    //                 value={formData.username}
    //                 onChange={handleInputChange}
    //                 autoFocus
    //               />
    //             </Grid>
    //             <Grid item xs={12}>
    //               <TextField
    //                 required
    //                 fullWidth
    //                 id="email"
    //                 label="Email Address"
    //                 name="email"
    //                 value={formData.email}
    //                 onChange={handleInputChange}
    //                 autoComplete="email"
    //               />
    //             </Grid>
    //             <Grid item xs={12}>
    //               <TextField
    //                 required
    //                 fullWidth
    //                 name="password"
    //                 label="Password"
    //                 type="password"
    //                 id="password"
    //                 value={formData.password}
    //                 onChange={handleInputChange}
    //                 autoComplete="new-password"
    //               />
    //             </Grid>
    //             <Grid item xs={12}>
    //               <TextField
    //                 required
    //                 fullWidth
    //                 name="confirmpassword"
    //                 label="Confirm Password"
    //                 type="password"
    //                 id="confirmpassword"
    //                 value={confirmpassword}
    //                 onChange={(e) => setConfirmPassword(e.target.value)}
    //                 autoComplete="new-password"
    //               />
    //             </Grid>
    //             <Grid item xs={12} sm={6}>
    //               <FormControl fullWidth required>
    //                 <InputLabel id="role-label">Role</InputLabel>
    //                 <Select
    //                   labelId="role-label"
    //                   id="role"
    //                   name="role"
    //                   value={formData.role}
    //                   onChange={handleInputChange}
    //                   label="Gender"
    //                   autoComplete="sex"
    //                 >
    //                   <MenuItem value="">
    //                     <em>None</em>
    //                   </MenuItem>
    //                   <MenuItem value="Admin">Admin</MenuItem>
    //                   <MenuItem value="Employee">Employee</MenuItem>
    //                 </Select>
    //               </FormControl>
    //             </Grid>
    //           </Grid>
    //           <Button
    //             type="submit"
    //             fullWidth
    //             variant="contained"
    //             onClick={handleSubmit}
    //             sx={{ mt: 3, mb: 2 }}
    //           >
    //             Add User
    //           </Button>
    //           <Grid container justifyContent="flex-end">
    //             <Grid item>
    //               <Link href="/" variant="body2">
    //                 Already have an account? Sign in
    //               </Link>
    //             </Grid>
    //           </Grid>
    //         </Box>
    //       </Box>
    //     </Container>
    //   </ThemeProvider>
    // </>
  );
}

export default CreateUserComponent;
