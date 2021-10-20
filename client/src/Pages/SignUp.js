import React, {useState} from 'react'
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
const Login = () => {
    const [value, setValue] = useState()
    const paperStyle = { padding: 20, height: '76vh', width: 340, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    return (
        <div>
            <Grid style={{ paddingBottom: "0px", background: "white", marginTop: "110px", paddingBottom: "" }}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Sign Up</h2>
                    </Grid>
                    <TextField label='Name' placeholder='Name' fullWidth required />
                    <TextField style = {{marginTop : "10px"}} label='Email' placeholder='Email' type="email" fullWidth required />
                    <TextField style = {{marginTop : "10px"}} label='Password' placeholder='Enter password' type='password' fullWidth required />
                    <PhoneInput style = {{marginTop: "25px", marginBottom: "15px"}}
                        placeholder="Enter phone number"
                        value={value}
                        onChange={setValue} />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign up</Button>
                    <Typography style = {{marginTop : "10px"}} > Do you have an account ?
                        <Link href="#" >
                            Sign Up
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </div>
    )
}

export default Login