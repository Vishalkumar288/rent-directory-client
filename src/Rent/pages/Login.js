import { Google, LoginOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLoginApi } from "../service";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../shared/navigation/appRoutes";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { AppContext } from "../../shared/context/auth-context";
import { LoadingButton } from "@mui/lab";
import { useDemoLogin } from "../../query-hooks/useDemoLogin";
import Storage from "../../shared/utils/Storage";
import { StorageKeys } from "../../constants/storageKeys";

const Login = () => {
  const { updateUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const { mutate, isLoading, error, isError } = useDemoLogin();

  const reponseGoogle = async (authResult) => {
    try {
      if (authResult?.access_token) {
        await googleLoginApi(authResult?.access_token).then((res) => {
          updateUserData(res.data);
          navigate(appRoutes.dashboard);
        });
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message || "Login failed", {
        variant: "error"
      });
    }
  };

  const login = useGoogleLogin({
    onSuccess: reponseGoogle,
    onError: reponseGoogle,
    scope: "openid email profile",
    flow: "implicit"
  });

  const onDemoLogin = () => {
    mutate(
      {},
      {
        onSuccess: (res) => {
          Storage.setItem(StorageKeys.DEMO_LOGIN, true);
          updateUserData(res.data);
          navigate(appRoutes.dashboard);
          enqueueSnackbar("Demo User Logged In", { variant: "success" });
        }
      }
    );
  };

  useEffect(() => {
    if (isError)
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
  }, [error?.response?.data?.message, isError]);

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Box maxWidth={"420px"} textAlign={"center"}>
        <Typography sx={{ fontSize: 18, color: "#fff" }}>
          {
            "Hi There! Login to experience hassle-free solution for managing rental payments and records"
          }
        </Typography>
      </Box>
      <Divider sx={{ border: "1px solid #fff" }} />
      <Box display={"flex"} justifyContent={"center"} mt={1}>
        <Button
          variant="contained"
          startIcon={<Google />}
          onClick={login}
          sx={{
            color: "#fff",
            textTransform: "none"
          }}
        >
          Login with Google
        </Button>
      </Box>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={2.5} display={"flex"} alignItems={"center"}>
          <Divider sx={{ border: "0.6px solid #fff", width: "100%" }} />
        </Grid>
        <Grid
          item
          xs={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography sx={{ fontSize: 16, color: "#fff" }}>or</Typography>
        </Grid>
        <Grid item xs={2.5} display={"flex"} alignItems={"center"}>
          <Divider sx={{ border: "0.6px solid #fff", width: "100%" }} />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
      <Box display={"flex"} justifyContent={"center"}>
        <Button
          component={LoadingButton}
          loading={isLoading}
          variant="outlined"
          startIcon={<LoginOutlined />}
          onClick={onDemoLogin}
          sx={{
            color: "#fff",
            textTransform: "none"
          }}
        >
          Demo User Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
