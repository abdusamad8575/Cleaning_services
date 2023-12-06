import React from 'react'
import Header from './Header'
import { Box, Grid,Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const Success = () => {
    const navigate= useNavigate()
  return (
    <>
        <Header />
        <Box sx={{height:'90vh',display:'flex',justifyContent:'center',alignItems:'center' , flexDirection:'column'}}>
            <Grid>
                <h1>Order Compleated</h1>
            </Grid>
            <Button variant='contained'  sx={{ backgroundColor: 'primary' }} onClick={()=>navigate('/')}>Back To Home</Button>

        </Box>

      
    </>
  )
}

export default Success
