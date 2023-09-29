import * as React from 'react';
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
import i18n from "i18next";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';

import { useTranslation } from "react-i18next";
import { AuthContext } from '../Context/userContext';
import axios from 'axios';


export default function SignIn() {

    const { t } = useTranslation();

    let URL = process.env.REACT_APP_BACKEND_URL;

    const [data, setData] = React.useState({
        password: "",
        email: "",
    })
    const [message, setMessage] = React.useState("")
    const [errors, setErrors] = React.useState([]);

    const handleOnChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const { setToken } = React.useContext(AuthContext);

    async function postData(userurl = "", userdata = {}) {

        axios({
            method: "POST",
            baseURL: URL,
            url: `${userurl}`,
            headers: {
                "Content-Type": "application/json",
            },
            data: userdata
        }).then(res => {
            console.log(res.data)
            if (res.data.success) {
                setToken(res.data.message)
                // console.log(res.message)
                Cookies.set("AUTH-TOKEN", res.data.message);
                window.location.href = "/"
            } else {
                if ((res.data.message.errors)) {
                    setMessage("")
                    setErrors(res.data.message.errors);
                    // setMessage("Check all the fields")
                } else {
                    setErrors([]);
                    setMessage(res.data.message);
                }
            }
        })
            .catch(err => {
                let error = (err.response.data)
                if ((error.message.errors)) {
                    setMessage("")
                    setErrors(error.message.errors);
                } else {
                    setErrors([]);
                    setMessage(error.message);
                }
            })

    }

    const handleSubmit = async () => {
        postData("auth/login", data);
    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {t("login")}
                </Typography>
                <Box component="div" noValidate sx={{ mt: 1 }}>
                    {
                        message && (
                            <Typography color={"secondary"} sx={{
                                my: 1,
                                border: "1px solid gray",
                                py: 1,
                                px: 1,
                                borderRadius: 1,

                            }}>{message}</Typography>
                        )
                    }
                    {
                        errors.length > 0 &&
                        <div className="errors" style={{ border: "1px solid gray", borderRadius: "3px", paddingTop: "3px", paddingBottom: "5px", display: `${errors.length > 0 ? "block" : "none"}` }}>
                            <ul >
                                {errors.map((err) => {
                                    return (
                                        <li key={err.msg}>{err.msg}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        value={data.email}
                        onChange={handleOnChange}
                        label={t("email_address")}
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        value={data.password}
                        onChange={handleOnChange}
                        name="password"
                        label={t("password")}
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        onClick={handleSubmit}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {t("login")}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                {t("forgot_password")}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
                                {t("dont_have_an_account_Sing_Up")}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}