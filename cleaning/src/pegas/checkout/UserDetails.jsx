import { Grid, Typography, Box, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import React from 'react'

const UserDetails = ({ setDetails, detail }) => {

    const handleChange = (event) => {
        setDetails({...detail,time:event.target.value})
    };
    return (
        <>

            <Grid container flexDirection={'column'} rowSpacing={1} m={"5px"}>
                <Grid item sx={{ display: 'flex', justifyContent:'center'}}>
                    <Typography variant='body2'>Select Your Time Slot</Typography>

                </Grid>
                <Grid item>
                    <Box sx={{ minWidth: 120, width: "95%", marginBottom: '30px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Time Slots</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={detail.time}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={'9AM-12PM'}>9AM-12PM</MenuItem>
                                <MenuItem value={'12PM-3PM'}>12PM-3PM</MenuItem>
                                <MenuItem value={'3PM-6PM'}>3PM-6PM</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>


            </Grid>

            <Box sx={{ width: '100%', display: 'flex', textAlign: 'center' }}>
                <Grid container direction={'column'} rowSpacing={1} p={1}>
                    <Grid item>
                        <Typography variant='body2'>Enter Your Details</Typography>
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="name" id="Full Name"
                            value={detail.name}
                            onChange={(event) => setDetails({ ...detail, name: event.target.value })}
                        />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="phone" id="Phone"
                            value={detail.phone}
                            onChange={(event) => setDetails({ ...detail, phone: event.target.value })}
                        />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth label="email" id="Email"
                            value={detail.email}
                            onChange={(event) => setDetails({ ...detail, email: event.target.value })}
                        />
                    </Grid>

                </Grid>
            </Box>



        </>
    )
}

export default UserDetails
