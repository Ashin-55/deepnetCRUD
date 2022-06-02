import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "../axios";

const Home = () => {
  let userInfo;
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleAddProduct = () => {
    navigate("/addProduct");
  };
  const fetchProducts = async () => {
    axios
      .get("/api/allProducts")
      .then((data) => {
        console.log(data);
        setProducts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/login");
  };
  useEffect(() => {
    userInfo = localStorage.getItem("userInfo");
    if (!userInfo) {
      navigate("/login");
    }
    fetchProducts();
  }, []);

  return (
    <Container>
      <Typography align='center' variant='h4' sx={{ marginTop: "5%" }}>
        List Product
      </Typography>
      <Typography align='right'>
        <Button onClick={logoutHandler}>logout</Button>
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "3%",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center' sx={{ fontWeight: 800 }}>
                Name
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 800 }}>
                Price
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 800 }}>
                Quantity
              </TableCell>
              <TableCell align='center' sx={{ fontWeight: 800 }}>
                Category
              </TableCell>
            </TableRow>
          </TableHead>
          <TableHead>
            {products?.map((product) => (
              <TableRow key={product._id}>
                <TableCell align='center'>{product.name}</TableCell>
                <TableCell align='center'>{product.price}</TableCell>
                <TableCell align='center'>{product.quantity}</TableCell>
                <TableCell align='center'>{product.category}</TableCell>
              </TableRow>
            ))}
          </TableHead>
        </Table>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "3%",
        }}
      >
        <Button variant='contained' onClick={handleAddProduct}>
          Add Product
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
