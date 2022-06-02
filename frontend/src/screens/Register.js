import React, { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "../axios.js";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let userInfo;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [regError, setRegError] = useState(false);
  const [regErrorMsg, setRegErrorMsg] = useState("");

  // effect runs on component mount
  useEffect(() => {
    userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/");
    }
    // simulate async api call with set timeout
    setTimeout(
      () => setUser({ name: "", email: "", place: "", password: "" }),
      1000
    );
  }, []);
  // effect runs when user state is updated
  useEffect(() => {
    // reset form with user data
    reset(user);
  }, [user]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("enter name"),
    email: Yup.string().required("enter email"),
    place: Yup.string().required("enter place"),
    password: Yup.string().required("enter password"),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data) => {
    setRegError(false);
    axios
      .post("/api/register", data)
      .then((response) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setRegError(true);
        setRegErrorMsg(err.response.data.message);
      });
  };
  return (
    <Container>
      <Typography align='center' variant='h4' sx={{ marginTop: "5%" }}>
        Registration
      </Typography>
      {regError && (
        <Typography align='center' sx={{ marginTop: "2%", color: "red" }}>
          {regErrorMsg}
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
          label='Name'
          name='name'
          {...register("name")}
          error={errors.name ? true : false}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant='inherit' color='textSecondary'>
          {errors.name?.message}
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
        <TextField
          variant='outlined'
          label='Place'
          name='place'
          {...register("place")}
          error={errors.place ? true : false}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant='inherit' color='textSecondary'>
          {errors.place?.message}
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
          onClick={handleSubmit(onSubmit)}
        >
          Register
        </Button>
        <Button onClick={() => reset()}>Reset</Button>
      </Box>
    </Container>
  );
};
export default Register;

