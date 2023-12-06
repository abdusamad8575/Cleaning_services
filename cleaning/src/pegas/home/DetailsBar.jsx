import React from 'react'
import { Typography, Box, Paper, Grid, Divider, Button } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {useDispatch} from 'react-redux';
import {sercices} from '../../redux_toolkit/userSlice'
import axios from 'axios'


const DetailsBar = ({ data,detail }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const totalLength = Object.values(data).reduce((acc, categoryArray) => acc + categoryArray.length, 0);

    const calculateTotalPrice = () => {
        return Object.values(data).reduce((total, items) => {
          return total + items.reduce((categoryTotal, item) => categoryTotal + item.price, 0);
        }, 0);
      };
      const total = calculateTotalPrice();

      const handleSubmit = async()=>{
        await axios.post('http://localhost:7000/orderDetails',{data,detail})
        .then(()=>navigate('/success'))
      }
    return (
        <>
            {totalLength ? (<Paper sx={{ height: '90vh', backgroundColor: '#a7afb7' }}>
                <Box sx={{ width: "100%", height: '40px' }}>
                    <Typography
                        variant="h6"
                        sx={{ textAlign: 'center', paddingTop: '5px', }}>
                        services
                    </Typography>
                </Box>

                <Grid container direction={'column'} p={2}>
                    {Object.entries(data).map(([category, items]) => (
                        <Grid item>
                            <Grid container>
                                {items.length ? (< div > <strong><u>{ category }</u></strong></div>):''}
                            {items.map((item) => (
                                <>
                                    <Grid item xs={10}> <SlideshowIcon sx={{ fontSize: 'x-small', color: 'green' }} />{item.name}</Grid>
                                    <Grid item xs={0.5}><CurrencyRupeeIcon sx={{ fontSize: '18px' }} /></Grid>
                                    <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'end' }}>{item.price}</Grid>
                                </>))}
                        </Grid>
                            </Grid>
                        ))}
                <Divider
                    sx={{
                        backgroundColor: "#1976d2",
                        height: "2px",
                        margin: "10px 0",
                    }} />
                <Grid item>
                            <Grid container>
                                <Grid item xs={10}><SlideshowIcon sx={{ fontSize: 'x-small', color: 'green' }} />Total</Grid>
                                <Grid item xs={0.5}><CurrencyRupeeIcon sx={{ fontSize: '18px' }} /></Grid>
                                <Grid item xs={1.5} sx={{ display: 'flex', justifyContent: 'end' }}>{total}</Grid>
                            </Grid>
                        </Grid>
                <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                   {detail ?<Button variant='contained'  sx={{ backgroundColor: 'primary',display:'flex',position:'absolute',right:30,bottom:30 }} onClick={handleSubmit} >Order</Button>: (<Link to={'/checkout'}>
                    <Button variant='contained'  sx={{ backgroundColor: 'primary' }} onClick={()=>dispatch(sercices(data))}>Pay Order</Button>
                    </Link>)}
                </Grid>
            </Grid>
                    
                </Paper >): ''
}

        </>
    )
}

export default DetailsBar
