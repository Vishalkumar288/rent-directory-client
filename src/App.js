import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./shared/layouts/Header";
import { isMobile } from "react-device-detect";
import { globalTheme } from "./shared/theme/globalTheme";
import { privateRoutes, publicRoutes } from "./shared/navigation/routes";
import { Routes } from "react-router-dom";
import { CustomDialog } from "./shared/customDialog";
import { ErrorBoundary } from "react-error-boundary";
import { SnackbarProvider } from "notistack";

function App() {
  const data = localStorage.getItem("user-info");
  const token = JSON.parse(data)?.token;
  const logError = (error, info) => {
    console.error(error);
    console.info(info);
  };
  return (
    <ErrorBoundary
      FallbackComponent={<>Something went wrong</>}
      onReset={(details) => console.log(details)}
      onError={logError}
    >
      <ThemeProvider theme={globalTheme}>
        <SnackbarProvider>
          <CustomDialog>
            <Box>
              <CssBaseline />
              <Header />
              <Box id="main" sx={{ mt: isMobile ? "60px" : 9 }}>
                <Routes>{Boolean(token) ? privateRoutes : publicRoutes}</Routes>
              </Box>
            </Box>
          </CustomDialog>
        </SnackbarProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
