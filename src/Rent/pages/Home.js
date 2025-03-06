import { Box } from "@mui/material";
import React from "react";
import Login from "./Login";

const Home = () => {
  return (
    <Box
      display={"flex"}
      sx={{ height: { xs: `calc(100svh - 60px)`, md: `calc(100svh - 72px)` } }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Login />
    </Box>
  );
};

export default Home;
