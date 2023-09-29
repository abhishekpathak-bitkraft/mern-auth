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
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

// TODO remove, this demo shouldn't need to reset the theme.


export default function SignIn() {
  let URL = process.env.REACT_APP_BACKEND_URL;

  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: ""
  })
  const [message, setMessage] = React.useState("")
  const [errors, setErrors] = React.useState([]);

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }


  async function postData(userurl = "", userdata = {}) {
    // const response = await fetch(`${URL}${url}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
    // return response.json(); // parses JSON response into native JavaScript objects

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
        setMessage("Registration complete, please login");
        setTimeout(() => {
          navigate("/login")
        }, 2000);
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
          // setMessage("Check all the fields")
        } else {
          setErrors([]);
          setMessage(error.message);
        }
      })



  }

  const handleSubmit = async () => {
    postData("auth/register", data);
    // let res = await postData("auth/register", data);
    // if (res.success) {
    //   setMessage("Register complete, please login")
    //   setTimeout(() => {
    //     navigate("/login")
    //   }, 2000);
    // } else {
    //   // console.log(res.message)
    //   if ((res.message.errors)) {
    //     setMessage("")
    //     setErrors(res.message.errors)
    //   } else {
    //     setErrors([])
    //     setMessage(res.message);
    //   }
    // }
  };

  const { t } = useTranslation();

  // console.log(errors)

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
          {t("register")}
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
            id="name"
            value={data.name}
            onChange={handleOnChange}
            label={t("name")}
            name="name"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            value={data.email}
            onChange={handleOnChange}
            id="email"
            label={t("email_address")}
            name="email"
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
            variant="contained"
            onClick={handleSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            {t("register")}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {t("forgot_password")}
              </Link>
            </Grid>
            <Grid item>
              <Link href="/login" variant="body2">
                {t("already_have_an_account_Sing_In")}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}