import React, { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

const AddProducts = () => {
  let userInfo;
  const navigate = useNavigate();
  const [addProError, setAddProError] = useState(false);
  const [addProErrorMsg, setAddProErrorMsg] = useState("");
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Enter product name"),
    price: Yup.string().required("Enter product prize"),
    quantity: Yup.string().required("Enter product quantity"),
    category: Yup.string().required("Enter product category"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const onSubmit = async (data) => {
    setAddProErrorMsg("");
    setAddProError(false);
    axios
      .post("/api/addProduct", data)
      .then((response) => {
        navigate("/");
      })
      .catch((err) => {
          console.log("errrrr",err)
        setAddProError(true);
        setAddProErrorMsg(err.response.data.message);
        console.log(err.response.data.message);
      });
  };
  useEffect(() => {
    userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    }
  }, []);
  return (
    <Container>
      <Typography align='center' variant='h4' sx={{ marginTop: "5%" }}>
        Add Product
      </Typography>
      {addProError && (
        <Typography align='center' sx={{ marginTop: "2%", color: "red" }}>
          {addProErrorMsg}
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
          label='Product Name'
          name='name'
          {...register("name")}
          error={errors.name ? true : false}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant='inherit' color='red'>
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
          label='Price'
          type='text'
          name='price'
          {...register("price")}
          error={errors.price ? true : false}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant='inherit' color='red'>
          {errors.price?.message}
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
          label='Product Quantity'
          name='quantity'
          {...register("quantity")}
          error={errors.quantity ? true : false}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant='inherit' color='red'>
          {errors.quantity?.message}
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
          label='Product Category'
          name='category'
          {...register("category")}
          error={errors.category ? true : false}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Typography variant='inherit' color='red'>
          {errors.category?.message}
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
          Add Product
        </Button>
      </Box>
    </Container>
  );
};
export default AddProducts;


