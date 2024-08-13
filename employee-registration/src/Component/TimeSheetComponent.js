import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TablePagination,
  Toolbar,
  IconButton,
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
import UserService from "../Services/UserService";
import EditIcon from "@mui/icons-material/Edit"; // Import EditIcon from Material-UI
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { format, startOfWeek, endOfWeek, addDays } from "date-fns";
import TimesheetService from "../Services/TimesheetService";

function TimeSheetComponent() {
  const [isOpened, setIsOpened] = useState(true);
  const [searchQuery, setSearchQuery] = useState(null);
  const [employee, setEmployee] = useState([]); //
  const [totalCount, setTotalCount] = useState(0); //
  const [Id, setId] = useState(0); //
  const navigate = useNavigate();
  const { logout, loggedInUserEmail } = useAuth(); //
  const [page, setPage] = useState(0); //
  const [rowsPerPage, setRowsPerPage] = useState(5); //
  const { token, role } = useAuth(); //
  const [visibleBar, setVisibleBar] = useState(false);
  const [data, setData] = useState([]);
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [startDate, setStartDate] = useState(
    format(startOfWeek(new Date()), "yyyy-MM-dd")
  ); // Default to current week
  const [endDate, setEndDate] = useState(
    format(endOfWeek(new Date()), "yyyy-MM-dd")
  ); // Default to current week
  const [formData, setFormData] = useState([]);
  const dummyData = [
    {
      id: 1,
      employeeName: "John Doe",
      timesheet: {
        Mon: "8h",
        Tue: "7.5h",
        Wed: "8h",
        Thu: "8h",
        Fri: "7h",
        Sat: "-",
        Sun: "-",
      },
    },
    {
      id: 2,
      employeeName: "Jane Smith",
      timesheet: {
        Mon: "7h",
        Tue: "8h",
        Wed: "7.5h",
        Thu: "8h",
        Fri: "7h",
        Sat: "6h",
        Sun: "-",
      },
    },
    {
      id: 3,
      employeeName: "Alice Johnson",
      timesheet: {
        Mon: "8h",
        Tue: "8h",
        Wed: "8h",
        Thu: "8h",
        Fri: "8h",
        Sat: "5h",
        Sun: "4h",
      },
    },
    {
      id: 4,
      employeeName: "Bob Brown",
      timesheet: {
        Mon: "7.5h",
        Tue: "7h",
        Wed: "7h",
        Thu: "7.5h",
        Fri: "8h",
        Sat: "-",
        Sun: "-",
      },
    },
    // Add more dummy entries as needed
  ];

  const handleChangePage = (event, newPage) => {
    debugger;
    setPage(newPage);
  };

  const handleStartDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start on Monday
    setStartDate(format(weekStart, "yyyy-MM-dd"));
    setEndDate(format(endOfWeek(weekStart), "yyyy-MM-dd"));
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

  const fetchDataById = async () => {
    debugger;
    try {
      debugger;
      const data = await TimesheetService.fetchTimesheetByEmailId(
        loggedInUserEmail
      );
      console.log("Fetched employee registration:", data);
      setFormData(data);
      debugger;
    } catch (error) {
      console.error("Error fetching employee registration:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0); // Reset page when search query changes
    fetchData();
  };

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

  // const deleteData = async (rowData) => {
  //   debugger;
  //   try {
  //     await EmployeeRegistrationService.deleteEmployee(
  //       rowData.iemployeeRegistrationId
  //     );
  //     console.log("Records Deleted successfully");
  //     window.location.reload();
  //   } catch (error) {
  //     console.log("Something went wrong", error);
  //   }
  // };

  const editData = async (rowData) => {
    navigate("/edit-timesheet", { state: { timesheetData: rowData } });
  };

  const fetchData = async () => {
    try {
      setData(dummyData); // Set dummy data directly
      setTotalCount(dummyData.length); // Set the total count
    } catch (error) {
      console.error("Error fetching timesheet data:", error);
    }
  };

  const deleteData = async (rowData) => {
    debugger;
    try {
      await TimesheetService.deleteTimesheet(rowData.itimeSheetId);
      console.log("Records Deleted successfully");
      window.location.reload();
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  useEffect(() => {
    if (role == "Employee") {
      setVisibleBar(true);
      fetchDataById();
    }
    fetchData();
    const today = new Date();
    const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 }); // Start on Monday
    setStartDate(startOfWeekDate);
    const endOfWeekDate = endOfWeek(startOfWeekDate);
  }, []);

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
            </Grid>

            {!visibleBar && (
              <Grid item xs={12}>
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
            <Typography variant="h4" gutterBottom>
              Weekly Timesheets
            </Typography>
            <TextField
              type="date"
              label="Start Date (Monday)"
              value={startDate}
              onChange={handleStartDateChange}
              style={{ marginBottom: "1rem", width: "100%" }}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/add-timesheet")}
            >
              Add New Timesheet
            </Button>
            <Box sx={{ marginTop: 2 }}>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Employee</TableCell>
                      <TableCell>Monday</TableCell>
                      <TableCell>Tuesday</TableCell>
                      <TableCell>Wednesday</TableCell>
                      <TableCell>Thursday</TableCell>
                      <TableCell>Friday</TableCell>
                      <TableCell>Saturday</TableCell>
                      <TableCell>Sunday</TableCell>
                      <TableCell>Start Day</TableCell>
                      <TableCell>End Day</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {formData.length > 0 ? (
                      formData.map((row) => (
                        <TableRow key={row.id}>
                          <TableCell>{row.vempName}</TableCell>
                          <TableCell>{row.vmon}</TableCell>
                          <TableCell>{row.vtue}</TableCell>
                          <TableCell>{row.vwed}</TableCell>
                          <TableCell>{row.vthu}</TableCell>
                          <TableCell>{row.vfri}</TableCell>
                          <TableCell>{row.vsat}</TableCell>
                          <TableCell>{row.vsun}</TableCell>
                          <TableCell>{row.dstartDate}</TableCell>
                          <TableCell>{row.dendDate}</TableCell>
                          <TableCell>
                            <IconButton
                            onClick={() => editData(row)}
                            >
                              <EditIcon color="primary" />
                            </IconButton>
                            <IconButton onClick={() => deleteData(row)}>
                              <DeleteIcon color="error" />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={9} align="center">
                          No records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalCount}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{ marginTop: "1rem" }}
              />
            </Box>
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

export default TimeSheetComponent;
