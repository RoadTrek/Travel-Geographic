import React from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
const Login = () => {

    const paperStyle = { padding: 20, height: '55vh', width: "25vw", margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    return (
        <div>
            <Grid style={{ paddingBottom : "0px", background: "white", marginTop: "125px" }}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Log In</h2>
                    </Grid>
                    <TextField label='Username' placeholder='Enter username' type="email" fullWidth required />
                    <TextField label='Password' placeholder='Enter password' style={{marginTop:"25px"}} type='password' fullWidth required />
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    /> */}
                    <div style={{marginTop:" 25px"}}>
                    <Button  type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>LogIn</Button>
                    </div>
                    
                    {/* <Typography >
                        <Link href="#" >
                            Forgot password ?
                        </Link>
                    </Typography> */}
                    <Typography style={{marginTop:"10px"}} > Do you have an account ?
                        <Link href="/signup" >
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    )
}

export default Login