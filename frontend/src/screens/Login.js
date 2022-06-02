import React, { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "../axios";

const Login = () => {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(false);
  const [loginErrorMsg, setLoginErrorMsg] = useState("");
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Enter the email"),
    password: Yup.string().required("Enter the password"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const handleRegister = () => {
    console.log("clicked")
    navigate("/register");
  };
  const onSubmit = async (data) => {
    setLoginError(false);
    axios
      .post("/api/login", data)
      .then((response) => {
        console.log(response.data);
        navigate("/");
        localStorage.setItem("userInfo", response.data.userInfo);
      })
      .catch((err) => {
        setLoginError(true);
        setLoginErrorMsg(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <Container>
      <Typography align='center' variant='h4' sx={{ marginTop: "5%" }}>
        Login
      </Typography>
      {loginError && (
        <Typography align='center' sx={{ marginTop: "2%", color: "red" }}>
          {loginErrorMsg}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1%",
        }}
      >
        <TextField
          variant='outlined'
          label='Email'
          type='email'
          name='email'
          {...register("email")}
          error={errors.email ? true : false}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant='inherit' color='textSecondary'>
          {errors.email?.message}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1%",
        }}
      >
        <TextField
          variant='outlined'
          label='Password'
          type='password'
          name='password'
          {...register("password")}
          error={errors.password ? true : false}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant='inherit' color='textSecondary'>
          {errors.password?.message}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1%",
        }}
      >
        <Button
          variant='contained'
          color='primary'
          sx={{ margin: "1%" }}
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
        <Button
          variant='contained'
          color='primary'
          sx={{ margin: "1%" }}
          onClick={handleRegister}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};
export default Login;
