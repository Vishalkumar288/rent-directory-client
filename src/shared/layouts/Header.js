import {
  AppBar,
  Avatar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography
} from "@mui/material";
import React, { useContext } from "react";
import { isMobileOnly } from "react-device-detect";
import { useCustomDialog } from "../customDialog";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessfulDialog from "../UiElements/SuccessfulDialog";
import Storage from "../utils/Storage";
import { AppContext } from "../context/auth-context";
import { StorageKeys } from "../../constants/storageKeys";

const Header = () => {
  const { showDialog, hideDialog } = useCustomDialog();
  const { userData, updateUserData } = useContext(AppContext);

  const location = useLocation();
  const navigate = useNavigate();
  const isRoot = ["/"].includes(location.pathname);

  const onLogoutClick = () => {
    showDialog({
      component: (
        <SuccessfulDialog
          text={"Are you sure you want to log out?"}
          btn1Text={"Cancel"}
          btn2Text={"Yes, confirm"}
          btn1Callback={() => hideDialog()}
          btn2Callback={() => {
            updateUserData(null);
            Storage.setItem(StorageKeys.DEMO_LOGIN, null);
            Storage.clear();
            localStorage.clear();
            navigate("/");
            hideDialog();
          }}
        />
      )
    });
  };

  return (
    <AppBar
      sx={{
        width: "100%",
        boxShadow: "1px solid #A020F0",
        backgroundColor: "#A020F0",
        zIndex: 2
      }}
    >
      <Toolbar
        component={Container}
        sx={{
          padding: {
            sm: "0 90px",
            xs: "0 16px"
          }
        }}
        maxWidth={"xl"}
      >
        <Grid container spacing={1} position={"relative"}>
          <Grid
            item
            xs={6}
            sm={12}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 24, md: 34 },
                color: "yellow",
                textShadow: "inherit"
              }}
            >
              {"Rent Register"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"right"}
            gap={1}
          >
            {!isRoot && (
              <Button
                variant="text"
                sx={{
                  "&:hover": {
                    color: "yellow",
                    "& .MuiSvgIcon-root": {
                      color: "yellow" // Ensures the icon color changes on hover
                    },
                    "& .MuiTypography-root": {
                      textShadow: "0px 0px 5px rgba(255, 255, 224, 0.7)" // Soft light yellow shadow
                    }
                  }
                }}
                onClick={onLogoutClick}
              >
                <Avatar
                  alt={userData?.user?.name}
                  sx={{
                    width: 30,
                    height: 30,
                    mr: { xs: 0, md: 2 },
                    bgcolor: "pink"
                  }}
                >
                  {userData?.user?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                {!isMobileOnly && <Typography>{"Logout"}</Typography>}
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
