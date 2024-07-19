import React, {useEffect, useState} from 'react';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
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

function Layout() {
    const [isOpened, setIsOpened] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState(null);
    const [employee, setEmployee] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate();

    const navigateToEmployeeRegistration = () => {
      navigate('/signupemployee');
  };

  const navigateToEmployeeDashboard = () => {
    navigate('/layout');}

    const fetchData = async () => {
      try {
        debugger;
        const data = await EmployeeRegistrationService.fetchEmployeeRegistration(searchKeyword);
        console.log('Fetched employee registration:', data);
        setEmployee(data.employees);
        setTotalCount(data.totalCount);

        // Process or set state with fetched data
      } catch (error) {
        // Handle error
        console.error('Error fetching employee registration:', error);
        // Optionally display an error message to the user
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
      <Paper style={{ padding: '1rem', textAlign: 'center', background: '#adaaaa', cursor: 'pointer' }} onClick={navigateToEmployeeRegistration}>
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
          {employee.map((row) => (
            <TableRow key={row.id}>
              <TableCell><EditIcon style={{ cursor: 'pointer', marginRight: '10px', fontSize: '20px' }} />
              <DeleteIcon style={{ cursor: 'pointer' , fontSize: '20px' }} /></TableCell>
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
    </TableContainer>
        </main>
      </div>
      <div className="footer">Footer</div>
    </div>
    </>
  );
}

export default Layout;