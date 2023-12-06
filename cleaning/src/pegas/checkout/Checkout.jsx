import React, { useState, useEffect } from 'react'
import Header from '../../components/Header'
import { Typography, Box, Paper, Grid, Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import DetailsBar from '../home/DetailsBar';
import UserDetails from './UserDetails';



const Checkout = () => {
  const datas = useSelector((state) => state.user.details)
  console.log("samad:-", datas);
  const [value, setValue] = React.useState();
  const [detail, setDetails] = React.useState({
    date:'',
    time:'',
    name:'',
    phone:'',
    email:''
  })

  useEffect(()=>{
    const selectDate  = value ? value.$d.toLocaleDateString()  : new Date().toLocaleDateString() ;
    setDetails({...detail,date:selectDate})
  },[value])
  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={8}>
          <Paper variant="outlined" elevation={3} sx={{ width: '100%', height: '90vh', backgroundColor: '#a7afb7' }}>
            <Box sx={{ width: "100%", height: '40px' }}>
              <Typography
                variant="h6"
                sx={{ textAlign: 'center', paddingTop: '5px', }}>
                Details
              </Typography>
            </Box>
            <Grid container sx={{display:'flex',alignItems:'center'}}>
              <Grid item xs={7}>

                <Grid  p={1} >
                  <Grid item sx={{ width: '100%' }}>
                    <Stack spacing={2} sx={{ alignItems: 'center' }}>
                      <Typography variant='body2'>Select Date</Typography>
                      <Typography variant='body1'>{value ? value.$d.toDateString() : new Date().toDateString()}</Typography>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar disablePast value={value} onChange={(newValue) => setValue(newValue)} />
                      </LocalizationProvider>
                    </Stack>

                  </Grid>
                </Grid>
                
              </Grid>
              <Grid item xs={5}  >
                <UserDetails setDetails={setDetails} detail={detail}/>

              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <DetailsBar data={datas} detail={detail} />
        </Grid>



      </Grid>
    </>
  )
}

export default Checkout
