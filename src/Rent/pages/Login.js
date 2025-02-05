import { Google } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLoginApi } from "../service";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../shared/navigation/appRoutes";
import { enqueueSnackbar } from "notistack";
import { useContext } from "react";
import { AppContext } from "../../shared/context/auth-context";

const Login = () => {
  const { updateUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const reponseGoogle = async (authResult) => {
    try {
      if (authResult?.access_token) {
        console.log(authResult);
        await googleLoginApi(authResult?.access_token).then((res) => {
          updateUserData(res.data);
          navigate(appRoutes.dashboard);
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error?.response?.data?.message || "Login failed", {
        variant: "error"
      });
    }
  };

  const login = useGoogleLogin({
    onSuccess: reponseGoogle,
    onError: reponseGoogle,
    scope: "openid email profile",
    flow: "implicit" // This ensures the login happens inside a popup
  });

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
      <Box display={"flex"} justifyContent={"center"}>
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
    </Box>
  );
};

export default Login;
