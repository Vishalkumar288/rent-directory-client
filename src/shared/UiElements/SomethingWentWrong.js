import { Box, styled, ThemeProvider, Typography } from "@mui/material";

import React from "react";
import { globalTheme } from "../theme/globalTheme";
import { Error } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export const StyledButton = styled(LoadingButton)(({ theme }) => ({
  [theme.breakpoints.up("xs")]: { padding: "14px 40px", maxHeight: "48px" },
  [theme.breakpoints.up("md")]: { padding: "22px 40px", maxHeight: "64px" }
}));

const SomethingWentWrong = ({ error, resetErrorBoundary }) => {
  return (
    <ThemeProvider theme={globalTheme}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={3}
        height={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Error color="error" sx={{ fontSize: 64 }} />
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={1}
          alignItems={"center"}
        >
          <Typography fontSize={20} letterSpacing={"0.04px"} fontWeight={500}>
            Something went wrong
          </Typography>
          <Typography
            component={"pre"}
            fontSize={20}
            letterSpacing={"0.04px"}
            fontWeight={500}
          >
            {error.message}
          </Typography>
        </Box>
        <StyledButton
          variant={"contained"}
          disableElevation
          onClick={resetErrorBoundary}
          sx={{ textTransform: "none", height: "auto" }}
        >
          Try again
        </StyledButton>
      </Box>
    </ThemeProvider>
  );
};

export default SomethingWentWrong;
