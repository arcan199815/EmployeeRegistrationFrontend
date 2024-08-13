import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Paper,
  IconButton,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { format, startOfWeek, endOfWeek, parseISO } from "date-fns";
import UserService from "../Services/UserService";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useAuth } from "./AuthContext";
import NotesIcon from "@mui/icons-material/Notes";
import ClearIcon from "@mui/icons-material/Clear";

function AddTimeSheetComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout,role,loggedInUserName, loggedInUserEmail } = useAuth();

  const [employeeName, setEmployeeName] = useState(loggedInUserName);
  const [weekStartDate, setWeekStartDate] = useState(
    format(startOfWeek(new Date()), "yyyy-MM-dd")
  );
  const [weekEndDate, setWeekEndDate] = useState(
    format(endOfWeek(new Date()), "yyyy-MM-dd")
  );
  const [formData, setFormData] = useState({
    itimeSheetId : 0,
    dstartDate : null,
    dendDate : null,
    vempName : '',
    vemployeeEmailId : '',
    vmon : '',
    vtue : '',
    vwed : '',
    vthu : '',
    vfri : '',
    vsat : '',
    vsun : '',
    vmonNote : '',
    vtueNote : '',
    vwedNote : '',
    vthuNote : '',
    vfriNote : '',
    vsatNote : '',
    vsunNote : '',
  })
  const [timesheet, setTimesheet] = useState({
    Mon: "",
    Tue: "",
    Wed: "",
    Thu: "",
    Fri: "",
    Sat: "",
    Sun: "",
  });
  const [notes, setNotes] = useState({
    Mon: "",
    Tue: "",
    Wed: "",
    Thu: "",
    Fri: "",
    Sat: "",
    Sun: "",
  });
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [visibleBar, setVisibleBar] = useState(false);
  const [isOpened, setIsOpened] = useState(true);
  

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

  useEffect(() => {
    if (role == "Employee") {
        setVisibleBar(true);
      }
    fetchEmployees();
    const today = new Date();
    const startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 }); // Start on Monday
    setWeekStartDate(format(startOfWeekDate, "yyyy-MM-dd"));
    const endOfWeekDate = endOfWeek(startOfWeekDate);
    const state = location.state?.timesheet;
    if (state) {
      setEmployeeName(loggedInUserName);
      setTimesheet(state.timesheet);
      setWeekStartDate(format(parseISO(state.weekStartDate), "yyyy-MM-dd"));
      setWeekEndDate(format(parseISO(state.weekEndDate), "yyyy-MM-dd"));
      setNotes(state.notes || {});
      setIsEditing(true);
    }
  }, [location.state]);

  const handleNoteClick = (day) => {
    // Handle note click action
    alert(`Note for ${day}: ${notes[day]}`);
  };

  const fetchEmployees = async () => {
    try {
      const response = await UserService.getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleNotesChange = (day) => (event) => {
    setNotes({ ...notes, [day]: event.target.value });
  };

  const handleSubmit = async () => {
    const timesheetData = {
      employeeName,
      timesheet,
      weekStartDate,
      weekEndDate,
    };

    try {
      if (isEditing) {
        await UserService.updateTimesheet(timesheetData);
      } else {
        await UserService.addTimesheet(timesheetData);
      }
      navigate("/timesheet"); // Navigate back to the timesheet page
    } catch (error) {
      console.error("Error saving timesheet:", error);
    }
  };

  const handleEmployeeChange = (event) => {
    setEmployeeName(event.target.value);
  };

  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start on Monday
    setWeekStartDate(format(weekStart, "yyyy-MM-dd"));
    setWeekEndDate(format(endOfWeek(weekStart), "yyyy-MM-dd"));
  };

  const handleTimesheetChange = (day) => (event) => {
    setTimesheet({ ...timesheet, [day]: event.target.value });
  };

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
            <Box p={3}>
              <Typography variant="h4" gutterBottom>
                {isEditing ? "Edit Timesheet" : "Add Timesheet"}
              </Typography>

              <TextField
                type="employee"
                label="Employee"
                value={employeeName}
                disabled
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />

              <TextField
                type="date"
                label="Week Start Date (Monday)"
                value={weekStartDate}
                onChange={handleDateChange}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />

              <Box mt={2}>
                <Typography variant="h6" gutterBottom>
                  Timesheet
                </Typography>
                <Grid container spacing={2}>
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day) => (
                      <Grid item xs={12} sm={6} key={day}>
                        <Box display="flex" alignItems="center" mb={2}>
                          <TextField
                            label={day}
                            value={timesheet[day] || ""}
                            onChange={handleTimesheetChange(day)}
                            fullWidth
                            variant="outlined"
                            margin="normal"
                          />
                          <Box ml={1}>
                            <IconButton
                              color="primary"
                              onClick={() => handleNoteClick(day)}
                            >
                              <NotesIcon />
                            </IconButton>
                          </Box>
                          <Box ml={1}>
                            <IconButton
                              color="secondary"
                              onClick={() =>
                                handleNotesChange(day)({
                                  target: { value: "" },
                                })
                              }
                            >
                              <ClearIcon />
                            </IconButton>
                          </Box>
                        </Box>
                        <TextField
                          label={`Notes for ${day}`}
                          value={notes[day] || ""}
                          onChange={handleNotesChange(day)}
                          fullWidth
                          variant="outlined"
                          margin="normal"
                          multiline
                          rows={2}
                        />
                      </Grid>
                    )
                  )}
                </Grid>
              </Box>

              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  {isEditing ? "Update Timesheet" : "Add Timesheet"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => navigate("/timesheet")}
                  style={{ marginLeft: "1rem" }}
                >
                  Cancel
                </Button>
              </Box>
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

export default AddTimeSheetComponent;
