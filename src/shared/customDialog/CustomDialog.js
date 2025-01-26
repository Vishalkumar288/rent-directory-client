import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import React from "react";
import { styled } from "@mui/material/styles";
import { useCustomDialog } from "./index";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2)
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1)
  },
  "& > .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  "& .MuiPaper-root": {
    boxShadow: "none",
    borderRadius: "8px"
  }
}));

export const Modal = () => {
  const { hideDialog, store } = useCustomDialog();
  const { dialogProps } = store || {};
  const {
    component,
    size = "xs",
    closeIcon = false,
    onExitCallback = () => {},
    backdropOff = false,
    fullScreen = false
  } = dialogProps || {};

  const handleModalToggle = (event, reason) => {
    if (backdropOff && reason === "backdropClick") return;
    onExitCallback();
    hideDialog();
  };
  return (
    <BootstrapDialog
      open={true}
      maxWidth={size}
      onClose={handleModalToggle}
      disableEscapeKeyDown
      fullScreen={fullScreen}
    >
      {closeIcon ? (
        <DialogTitle sx={{ m: 0, p: 2 }}>
          <IconButton
            aria-label="close"
            onClick={handleModalToggle}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500]
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
      ) : null}
      <DialogContent>{component}</DialogContent>
    </BootstrapDialog>
  );
};
