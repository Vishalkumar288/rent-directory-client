import { Box } from "@mui/material";
import React from "react";
import Login from "./Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Home = () => {
  return (
    <Box
      display={"flex"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Login />
      </GoogleOAuthProvider>
    </Box>
  );
};

export default Home;
