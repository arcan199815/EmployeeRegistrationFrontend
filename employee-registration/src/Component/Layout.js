import React, {useEffect, useState} from 'react';
import { Accordion, AccordionSummary, AccordionDetails, TablePagination } from '@mui/material';
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
import './css/Layout.css';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EmployeeRegistrationService from '../Services/EmployeeRegistrationService';
import EditIcon from '@mui/icons-material/Edit'; // Import EditIcon from Material-UI
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

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
    const { token } = useAuth();

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

    // const filteredEmployees = employee.filter((row) =>
    //   row.vempName.toLowerCase().includes(searchQuery.toLowerCase())
    // );

    const navigateToEmployeeRegistration = () => {
      navigate('/signupemployee');
  };

  const navigateToEmployeeDashboard = () => {
    navigate('/layout');}

  const navigateLogout = async () => {
    debugger;
    await logout();
    navigate('/');
  }

  //const editEmployee = 

  const deleteData = async (rowData) => {
    debugger;
    try {
      await EmployeeRegistrationService.deleteEmployee(rowData.iemployeeRegistrationId);
      console.log('Records Deleted successfully');
      window.location.reload();
    } catch (error) {
      console.log('Something went wrong',error);
    }
  }

  const editData = async (rowData) => {
    navigate('/signupemployee', { state: { employees: rowData } });
  }

    const fetchData = async () => {
      try {
        debugger;
        const data = await EmployeeRegistrationService.fetchEmployeeRegistration(searchQuery,token);
        console.log('Fetched employee registration:', data);
        setEmployee(data.employees);
        setTotalCount(data.totalCount);

      } catch (error) {
        console.error('Error fetching employee registration:', error);
      }
    };

    useEffect(() => {
      fetchData();
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
        <Grid container spacing={2}>
      {/* Table Header */}
      <Grid item xs={12}>
        <Paper style={{ padding: '1rem', textAlign: 'center' }}>
          <Typography variant="h12" fontFamily=' "Playwrite CU", cursive;'>Employees</Typography>
        </Paper>
      </Grid>
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
      </Grid>
        <TableContainer component={Paper} fontFamily=' "Playwrite CU", cursive;'>
      <Table style={{ fontFamily: '"Playwrite CU", cursive' }}>
        <TableHead > 
          <TableRow >
            <TableCell >Action</TableCell>
            <TableCell >Emp Name</TableCell>
            <TableCell >Emp Id</TableCell>
            <TableCell >EmailId</TableCell>
            <TableCell >Mobile Number</TableCell>
            <TableCell >DOB</TableCell>
            <TableCell >Gender</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? employee.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : employee).map((row) => (
            <TableRow key={row.id}>
              <TableCell><span style={{ display: 'flex', alignItems: 'center' }}><EditIcon style={{ cursor: 'pointer', marginRight: '10px', fontSize: '20px' }} onClick={() => editData(row)} />
              <DeleteIcon style={{ cursor: 'pointer' , fontSize: '20px' }} onClick={() => deleteData(row)} /> </span>
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
      <TablePagination
        rowsPerPageOptions={5} // Options for rows per page dropdown
        component="div"
        count={totalCount} // Total number of rows
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
        </main>
      </div>
      <div className="footer"><p >
          &copy; {new Date().getFullYear()} XYZ Company. All rights reserved.
        </p>
        <br/>
        <p >
          Contact: contact@xyzcompany.com | Phone: +1 (123) 456-7890
        </p></div>
    </div>
    </>
  );
}

export default Layout;