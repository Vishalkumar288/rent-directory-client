import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./shared/layouts/Header";
import { isMobile } from "react-device-detect";
import { globalTheme } from "./shared/theme/globalTheme";
import { privateRoutes, publicRoutes } from "./shared/navigation/routes";
import { Routes } from "react-router-dom";
import { CustomDialog } from "./shared/customDialog";
import { ErrorBoundary } from "react-error-boundary";
import { SnackbarProvider } from "notistack";
import SomethingWentWrong from "./shared/UiElements/SomethingWentWrong";
import useAuth from "./shared/hooks/useAuth";
import { AppContext } from "./shared/context/auth-context";

function App() {
  const { userData, updateUserData } = useAuth();

  const validUser = Boolean(userData?.token);

  const logError = (error, info) => {
    console.error(error);
    console.info(info);
  };

  return (
    <ErrorBoundary
      FallbackComponent={SomethingWentWrong}
      onReset={(details) => console.log(details)}
      onError={logError}
    >
      <AppContext.Provider value={{ userData, updateUserData }}>
        <ThemeProvider theme={globalTheme}>
          <SnackbarProvider>
            <CustomDialog>
              <Box>
                <CssBaseline />
                <Header />
                <Box id="main" sx={{ mt: isMobile ? "60px" : 9 }}>
                  <Routes>{validUser ? privateRoutes : publicRoutes}</Routes>
                </Box>
              </Box>
            </CustomDialog>
          </SnackbarProvider>
        </ThemeProvider>
      </AppContext.Provider>
    </ErrorBoundary>
  );
}

export default App;
