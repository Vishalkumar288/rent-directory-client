import * as yup from "yup";

import { LoginOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../shared/navigation/appRoutes";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect } from "react";
import { AppContext } from "../../shared/context/auth-context";
import { LoadingButton } from "@mui/lab";
import { useDemoLogin } from "../../query-hooks/useDemoLogin";
import Storage from "../../shared/utils/Storage";
import { StorageKeys } from "../../constants/storageKeys";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { error_msg } from "../../constants/label";
import TextInput from "../../shared/FormElements/TextInput";
import { useLogin } from "../../query-hooks/useLogin";

const schema = yup.object({
  id: yup.string().required(error_msg.required),
  password: yup.string().required(error_msg.required)
});

const Login = () => {
  const { control, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const { updateUserData } = useContext(AppContext);
  const navigate = useNavigate();

  const { mutate, isLoading, error, isError } = useDemoLogin();
  const {
    mutate: loginUser,
    isLoading: isLogging,
    error: loginError,
    isError: isLoginError
  } = useLogin();

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

  const onLoginClick = (data) => {
    loginUser(
      { id: data["id"], password: data["password"] },
      {
        onSuccess: (res) => {
          updateUserData(res.data);
          navigate(appRoutes.dashboard);
          enqueueSnackbar("Login Successfull", { variant: "success" });
        }
      }
    );
  };

  useEffect(() => {
    if (isError)
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    if (isLoginError)
      enqueueSnackbar(loginError?.response?.data?.message, {
        variant: "error"
      });
  }, [
    error?.response?.data?.message,
    isError,
    loginError?.response?.data?.message,
    isLoginError
  ]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      sx={{
        boxShadow:
          "0px 4px 10px rgba(233, 222, 222, 0.1), 0px 10px 25px rgba(238, 231, 231, 0.1)",
        borderRadius: "12px",
        padding: "24px"
      }}
    >
      <Box>
        <Typography sx={{ fontSize: 18, color: "#fff" }}>Sign In</Typography>
        <Divider sx={{ border: "1px solid #fff", width: "100%" }} />
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <TextInput
          control={control}
          name={"id"}
          label={"UserName"}
          placeholder={"Enter UserName"}
          mandatoryField
        />
        <TextInput
          control={control}
          name={"password"}
          label={"Password"}
          type="password"
          placeholder={"Enter Password"}
          mandatoryField
        />
      </Box>
      <Box display={"flex"} justifyContent={"center"} mt={1}>
        <Button
          fullWidth
          variant="contained"
          component={LoadingButton}
          loading={isLogging}
          onClick={handleSubmit(onLoginClick)}
          sx={{
            color: "#fff",
            textTransform: "none"
          }}
        >
          Login
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <Divider sx={{ flexGrow: 1, border: "0.6px solid #fff" }} />
        <Typography sx={{ fontSize: 16, color: "#fff", mx: 2 }}>or</Typography>
        <Divider sx={{ flexGrow: 1, border: "0.6px solid #fff" }} />
      </Box>
      <Box display={"flex"} justifyContent={"center"}>
        <Button
          fullWidth
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
