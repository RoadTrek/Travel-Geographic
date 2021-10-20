import React, {useState} from 'react'
import axios from 'axios';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
const Login = () => {

    const paperStyle = { padding: 20, height: '60%', width: "26%", margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const login = (e) => {
        e.preventDefault();
        console.log("inside login");
        axios({
            method: "POST",
            withCredentials: true,
            url: "http://localhost:8080/login",
            data: {
                username: email,
                password: password
            },
        }).then((res) => {
            console.log("login details sent");
        })
            .catch(err => {
            });
    }

    return (
        <div>
            <Grid style={{ paddingBottom: "0px", background: "white", marginTop: "125px" }}>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
                        <h2>Log In</h2>
                    </Grid>
                    <TextField onChange={(event) => setEmail(event.target.value)} label='Email' placeholder='Enter email' type="email" fullWidth required />
                    <TextField onChange={(event) => setPassword(event.target.value)} label='Password' placeholder='Enter password' style={{ marginTop: "25px" }} type='password' fullWidth required />
                    {/* <FormControlLabel
                        control={
                            <Checkbox
                                name="checkedB"
                                color="primary"
                            />
                        }
                        label="Remember me"
                    /> */}
                    <div style={{ marginTop: " 25px" }}>
                        <Button type='submit' onClick = {login} color='primary' variant="contained" style={btnstyle} fullWidth>LogIn</Button>
                    </div>

                    {/* <Typography >
                        <Link href="#" >
                            Forgot password ?
                        </Link>
                    </Typography> */}
                    <Typography style={{ marginTop: "10px" }} > Do you have an account ?
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