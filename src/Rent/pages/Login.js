import { Google } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { googleLoginApi } from "../service";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../shared/navigation/appRoutes";
import { enqueueSnackbar } from "notistack";

const Login = () => {
  const navigate = useNavigate();
  const reponseGoogle = async (authResult) => {
    try {
      if (authResult["code"]) {
        const response = await googleLoginApi(authResult["code"]);
        const { email, token } = response?.data;
        const saveToken = { email, token };
        localStorage.setItem("user-info", JSON.stringify(saveToken));
        navigate(appRoutes.dashboard);
      }
    } catch (error) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  };
  const login = useGoogleLogin({
    onSuccess: reponseGoogle,
    onError: reponseGoogle,
    flow: "auth-code"
  });

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Box maxWidth={"420px"} textAlign={"center"}>
        <Typography sx={{ fontSize: 18, color: "#fff" }}>
          {
            "Hi There! Login to experience hassle-Free solution for managing rental payments and records"
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
            // backgroundColor: "#4285F4",
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
