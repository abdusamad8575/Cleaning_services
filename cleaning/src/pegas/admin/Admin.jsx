import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

export default function Admin() {
  const [orders, setOrders] = React.useState([]);
  const [selectedOrderId, setSelectedOrderId] = React.useState(null);
  const [confirmationOpen, setConfirmationOpen] = React.useState(false);
  const [status,setStatus] = React.useState()
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('http://localhost:7000/orderDetails');
      setOrders(res.data.datas);
    };

    fetchData();
  }, []);

  const handleChange = (event, orderId) => {
    setStatus(event.target.value);
    setSelectedOrderId(orderId);
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    setSelectedOrderId(null);
  };

  const handleConfirmationOk = async () => {
    try {
      await axios.patch(`http://localhost:7000/statusUpdate/${selectedOrderId}`, { status: status });
      const res = await axios.get('http://localhost:7000/orderDetails');
      setOrders(res.data.datas);

      setConfirmationOpen(false);
      setSelectedOrderId(null);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  return (
    <Box sx={{ padding: 10 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="left">Home services</TableCell>
              <TableCell align="left">Deep Cleaning</TableCell>
              <TableCell align="left">Car Wash</TableCell>
              <TableCell align="left">Total</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left"><ul>{row.orderDetails.filter((value) => value.serviceName === 'Home services')
                  .map((filteredValue) => filteredValue.subCategory.map((val) =>
                    <li key={val.orderServises}>{val.orderServises}</li>))}</ul>
                </TableCell>
                <TableCell align="left"><ul>{row.orderDetails.filter((value) => value.serviceName === 'Deep Cleaning')
                  .map((filteredValue) => filteredValue.subCategory.map((val) =>
                    <li key={val.orderServises}>{val.orderServises}</li>))}</ul>
                </TableCell>
                <TableCell align="left"><ul>{row.orderDetails.filter((value) => value.serviceName === 'Car Wash')
                  .map((filteredValue) => filteredValue.subCategory.map((val) =>
                    <li key={val.orderServises}>{val.orderServises}</li>))}</ul>
                </TableCell>
                <TableCell align="left">
                  {row.total}
                </TableCell>
                <TableCell align="left">
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Status</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={row.status}
                      label="Status"
                      onChange={(event) => handleChange(event, row._id)}
                    >
                      <MenuItem value={'SCHEDULED'}>SCHEDULED</MenuItem>
                      <MenuItem value={'COMPLETE'}>COMPLETE</MenuItem>
                      <MenuItem value={'CANCELLED'}>CANCELLED</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
      <Dialog
        open={confirmationOpen}
        onClose={handleConfirmationClose}
      >
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          Are you sure you want to update the status?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose}>Cancel</Button>
          <Button onClick={handleConfirmationOk}>OK</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
