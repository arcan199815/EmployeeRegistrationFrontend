import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TablePagination,
  CircularProgress,
  ListItemText,
  ListItem,
  List,
  CardContent,
  CardHeader,
  Card,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./css/Layout.css";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EmployeeRegistrationService from "../Services/EmployeeRegistrationService";
import EditIcon from "@mui/icons-material/Edit"; // Import EditIcon from Material-UI
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

function Layout() {
  const [isOpened, setIsOpened] = useState(true);
  const [searchQuery, setSearchQuery] = useState(null);
  const [employee, setEmployee] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [Id, setId] = useState(0);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { token, role, user, loggedInUserEmail } = useAuth();
  const [data, setData] = useState(null);
  const [visibleBar, setVisibleBar] = useState(false);
  const COLORS = ['#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#4BC0C0'];
  const [pieChartData, setPieChartData] = useState([
    { name: 'Male', value: 400 },
    { name: 'Female', value: 300 },
    { name: 'Other', value: 300 }
  ]);

const performanceData = [
  { name: 'Jan', rating: 4.000 },
  { name: 'Feb', rating: 3.000 },
  { name: 'Mar', rating: 2.000 },
  { name: 'Apr', rating: 2.780 },
  { name: 'May', rating: 1.890 },
  { name: 'Jun', rating: 2.390 },
];
  const [profile, setProfile] = useState({});

  const upcomingEvents = [
    { date: '2024-08-15', title: 'Team Meeting', description: 'Monthly team sync-up meeting.' },
    { date: '2024-08-20', title: 'Project Deadline', description: 'Submission deadline for project X.' },
    { date: '2024-08-25', title: 'Client Presentation', description: 'Presentation of the new features to the client.' }
  ];

  const handleChangePage = (event, newPage) => {
    debugger;
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    debugger;
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0); // Reset to first page when rows per page changes

    if (page * newRowsPerPage >= totalCount) {
      setPage(Math.floor(totalCount / newRowsPerPage));
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset page when search query changes
    fetchData();
  };

  const leaveBalance = {
    total: 20, // Total leave days
    taken: 5,  // Leave days taken
    remaining: 15 // Leave days remaining
  };

  const recentActivities = [
    { date: '2024-08-12', title: 'Project Milestone Completed', description: 'Completed the project milestone 1.' },
    { date: '2024-08-11', title: 'Weekly Report Submitted', description: 'Submitted the weekly report.' },
    { date: '2024-08-10', title: 'Team Meeting Attended', description: 'Attended the team meeting.' }
  ];

  // const filteredEmployees = employee.filter((row) =>
  //   row.vempName.toLowerCase().includes(searchQuery.toLowerCase())
  // );

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

  //const editEmployee =

  const deleteData = async (rowData) => {
    debugger;
    try {
      await EmployeeRegistrationService.deleteEmployee(
        rowData.iemployeeRegistrationId
      );
      console.log("Records Deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const editData = async (rowData) => {
    navigate("/signupemployee", { state: { employees: rowData } });
  };

  const fetchData = async () => {
    try {
      debugger;
      let data1;
      if (role == "Admin") {
        data1 = await EmployeeRegistrationService.fetchEmployeeRegistration(
          searchQuery,
          token
        );
      } else if (role == "Employee") {
        data1 =
          await EmployeeRegistrationService.fetchEmployeeRegistrationForRmployeeRole(
            searchQuery,
            loggedInUserEmail,
            token
          );
      }
      console.log("Fetched employee registration:", data1);
      setEmployee(data1.employees);
      setTotalCount(data1.totalCount);
      setProfile({
        name: data1.employees[0].vempName,
        email: data1.employees[0].vempEmailId,
        empId: data1.employees[0].iempId,
        DOB: data1.employees[0].vdob,
        mobile: data1.employees[0].vemployeeMobileNumber,
        avatar: 'https://via.placeholder.com/150'
      });
      const genderDistribution = data1.employees.reduce((acc, curr) => {
        acc[curr.vgender] = (acc[curr.vgender] || 0) + 1;
        return acc;
      }, {});
      setPieChartData(Object.entries(genderDistribution).map(([name, value]) => ({ name, value })));
    } catch (error) {
      console.error("Error fetching employee registration:", error);
    }
  };

  useEffect(() => {
    if (role == "Employee") {
      setVisibleBar(true);
    }
    fetchData();
    
  }, [role]);

  return (
    <>
      <div className="Layout">
        <div className="header">
          <div className="icon" onClick={() => setIsOpened(!isOpened)}>
            {isOpened ? <ChevronLeftIcon /> : <MenuIcon />}
          </div>
          <div className="header-title">Employee Dashboard</div>
        </div>
        <div className="container">
          <aside className={`drawer ${isOpened ? "opened" : ""} drawer`}>
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

            {!visibleBar && <Grid item xs={12}>
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
            <Grid container spacing={2}>
              {/* Table Header */}
              <Grid item xs={12}>
                <Paper style={{ padding: "1rem", textAlign: "center" }}>
                  <Typography
                    variant="h12"
                    fontFamily=' "Playwrite CU", cursive;'
                  >
                    {!visibleBar ? "Employees" : "Personal Details"}
                  </Typography>
                </Paper>
                {/* //Pie Chart */}
                {!visibleBar &&<Grid container spacing={2} mt={2}>
              <Grid item >
                <Paper style={{ padding: "1rem", textAlign: "center" }}>
                  <Typography variant="h12" >Gender Distribution</Typography>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <PieChart width={900} height={400} >
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      label
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          }
              </Grid>
               
            
              {!visibleBar && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="search"
                    label="Search Employee"
                    variant="outlined"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </Grid>
              )}
            </Grid>
           
        {/* Profile Overview */}
        {visibleBar &&<Grid item xs={12}>
          <Paper style={{ padding: "1rem" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4} style={{ textAlign: 'left' }}>
                <Avatar src={profile.avatar} style={{ width: 100, height: 100, marginLeft: 0, marginRight: 'auto' }} />
              </Grid>
              <Grid item xs={12} sm={8} style={{ textAlign: 'right' }}>
                <Typography variant="h6">{profile.name}</Typography>
                <Typography>Email: {profile.email}</Typography>
                <Typography>EmployeeId: {profile.empId}</Typography>
                <Typography>DOB: {profile.DOB}</Typography>
                <Typography>Contact: {profile.mobile}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>}

        {/* Performance Metrics */}
        {visibleBar &&<Grid item xs={12}>
          <Paper style={{ padding: "1rem", textAlign: "center" }}>
            <Typography variant="h6">Performance Metrics</Typography>
            {/* Add charts or metrics here */}
            <ResponsiveContainer width="100%" height={300}>
            <LineChart width={600} height={300} data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="rating" stroke="#8884d8" />
            </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>}

        {/* Leave Management */}
        {visibleBar &&<Grid item xs={12}>
          <Paper style={{ padding: "1rem", textAlign: "center" }}>
            <Typography variant="h6">Leave Management</Typography>
            {/* Add leave balance and requests here */}
            <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={4}>
        <Typography variant="h6">Total Leave Days</Typography>
        <Typography variant="body1">{leaveBalance.total} days</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="h6">Leave Taken</Typography>
        <Typography variant="body1">{leaveBalance.taken} days</Typography>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Typography variant="h6">Leave Remaining</Typography>
        <Typography variant="body1">{leaveBalance.remaining} days</Typography>
        <CircularProgress
          variant="determinate"
          value={(leaveBalance.remaining / leaveBalance.total) * 100}
          size={100}
          thickness={4}
          style={{ marginTop: '1rem' }}
        />
      </Grid>
    </Grid>
          </Paper>
        </Grid>}

        {/* Upcoming Events */}
        {visibleBar &&<Grid item xs={12}>
          <Paper style={{ padding: "1rem", textAlign: "center" }}>
            <Typography variant="h6">Upcoming Events</Typography>
            {/* Add upcoming events here */}
            <List>
            {upcomingEvents.map((event, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${event.date} - ${event.title}`}
                  secondary={event.description}
                />
              </ListItem>
            ))}
          </List>
          </Paper>
        </Grid>}

        {visibleBar && (
      <Grid item xs={12}>
        <Paper style={{ padding: '1rem' }}>
          <Typography variant="h6" align="center" gutterBottom>
            Recent Activities
          </Typography>
          <Grid container spacing={2}>
          {recentActivities.map((activity, index) => (
        <Grid item xs={12} sm={4} key={index}>
          <Card>
            <CardHeader
              title={activity.title}
              subheader={activity.date}
            />
            <CardContent>
              <Typography variant="body2">{activity.description}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
          </Grid>
        </Paper>
      </Grid>
    )}

            {!visibleBar &&<TableContainer
              component={Paper}
              fontFamily=' "Playwrite CU", cursive;'
            >
              <Table style={{ fontFamily: '"Playwrite CU", cursive' }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Action</TableCell>
                    <TableCell>Emp Name</TableCell>
                    <TableCell>Emp Id</TableCell>
                    <TableCell>EmailId</TableCell>
                    <TableCell>Mobile Number</TableCell>
                    <TableCell>DOB</TableCell>
                    <TableCell>Gender</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? employee.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : employee
                  ).map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <span style={{ display: "flex", alignItems: "center" }}>
                          <EditIcon
                            style={{
                              cursor: "pointer",
                              marginRight: "10px",
                              fontSize: "20px",
                            }}
                            onClick={() => editData(row)}
                          />
                          <DeleteIcon
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => deleteData(row)}
                          />{" "}
                        </span>
                      </TableCell>
                      <TableCell>{row.vempName}</TableCell>
                      <TableCell>{row.iempId}</TableCell>
                      <TableCell>{row.vempEmailId}</TableCell>
                      <TableCell>{row.vemployeeMobileNumber}</TableCell>
                      <TableCell>{row.vdob}</TableCell>
                      <TableCell>{row.vgender}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!visibleBar && (
                <TablePagination
                  rowsPerPageOptions={5} // Options for rows per page dropdown
                  component="div"
                  count={totalCount} // Total number of rows
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              )}
            </TableContainer>}
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

export default Layout;
