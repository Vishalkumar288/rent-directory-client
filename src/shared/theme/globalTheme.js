import { createTheme, styled, Switch } from "@mui/material";
export const primaryBackground = "transparent";
const disabled = "#F0F2F5";

export const globalTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true
      },
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" && {
            background: "#A020F0",
            "&:hover": {
              background: "#A020F0"
            }
          }),
          color: ownerState.variant === "outlined" ? "#A020F0" : "#fff",
          textTransform: "capitalize",
          borderRadius: "8px",
          height: "100%",
          fontSize: 15,
          lineHeight: "20px",
          letterSpacing: "0.02em"
        })
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: ({ theme }) => {
            return {
              border: "1px solid #A020F0"
            };
          }
        },
        {
          props: { variant: "soft" },
          style: ({ theme }) => {
            return {
              color: "#fff",
              backgroundColor: primaryBackground,
              "&:hover": {
                backgroundColor: "#fff",
                color: "white"
              }
            };
          }
        },
        {
          props: { variant: "link" },
          style: ({ theme }) => {
            return {
              color: "#fff",
              backgroundColor: "transparent",
              padding: 0,
              height: "auto",
              fontSize: 14,
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "transparent"
              }
            };
          }
        }
      ]
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
          transform: "none",
          zIndex: "auto",
          "&.MuiFormLabel-filled , &.Mui-focused": {
            color: theme.palette.text.primary,
            fontWeight: 500
          },
          "&.Mui-disabled": {
            color: theme.palette.text.disabled
          },
          "& + div": {
            marginTop: theme.spacing(3.2)
          }
        })
      },
      defaultProps: {}
    },
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          border: "1px solid #B7BEC7",
          background: "white",
          borderRadius: "8px",
          padding: 0,
          overflow: "hidden",
          width: "100%",
          "&.Mui-focused": {
            border: `1px solid ${theme.palette.primary.main}`
          },
          "&.Mui-error": {
            borderColor: theme.palette.error.main
          },
          "&.Mui-disabled": {
            borderColor: disabled
          },
          "&:hover": {
            borderColor: disabled,
            "&.Mui-focused": {
              borderColor: theme.palette.primary.main
            },
            "&.Mui-error": {
              borderColor: theme.palette.error.main
            },
            "& > .MuiOutlinedInput-notchedOutline": {
              borderColor: `${disabled} !important`
            }
          }
        }),
        input: ({ theme }) => ({
          padding: "12px 16px !important",
          fontSize: "14px",
          color: theme.palette.text.primary,
          "&::placeholder": {
            color: theme.palette.text.disabled,
            opacity: 1
          }
        })
      }
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: "60px",
          "@media (min-width: 600px)": {
            minHeight: "72px"
          }
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          fontSize: "14px",
          lineHeight: "17px",
          transform: "none",
          color: theme.palette.text.primary,
          "&.Mui-focused": {
            color: theme.palette.text.primary,
            fontWeight: 500
          }
        })
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          marginTop: 8
        }
      }
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          borderWidth: 0,
          padding: "12px 16px",
          marginRight: 16
        },
        root: {
          borderRadius: 8,
          border: 0,
          "& + .Mui-error": {
            marginLeft: 0
          },
          "&.Mui-focused": {
            border: 0
          },
          "&:hover": {
            "&.Mui-error .MuiOutlinedInput-notchedOutline": {
              borderColor: "#F05454 !important"
            }
          },
          "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            borderColor: disabled
          }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: ({ theme }) => ({
          borderWidth: "1px !important"
        })
      }
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          background: "#FFFFFF",
          boxShadow: "0px 2px 5px rgba(1, 16, 34, 0.1)",
          borderRadius: 8,
          marginTop: 7,
          "& > .MuiList-root": {
            padding: 8,
            "& > li": {
              background: "#FFFFFF",
              borderRadius: 8,
              fontWeight: 400,
              fontSize: 14,
              padding: "12px 16px",
              lineHeight: "150%",
              color: "#0F0F0F",
              "&:hover": {
                background: "#F4F5F8"
              },
              "&.Mui-selected": {
                background: "#F4F6F6",
                color: "#1F7E4B",
                fontWeight: 600,
                marginBottom: 6
              }
            }
          }
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: 14,
          fontWeight: 400,
          lineHeight: "20px",
          color: "#808080"
        },
        root: {
          // marginRight: 22,
        }
      },
      defaultProps: {
        sx: {
          marginRight: {
            md: "25px"
          }
        }
      }
    }
  }
});

export const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 50,
  height: 25,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 20,
      height: 20
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(10px)"
    }
  },
  "& .MuiSwitch-switchBase": {
    padding: 2.5,
    "&.Mui-checked": {
      transform: "translateX(25px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#A020F0"
      }
    }
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 20,
    height: 20,
    borderRadius: "50%",
    transition: theme.transitions.create(["width"], {
      duration: 200
    })
  },
  "& .MuiSwitch-track": {
    borderRadius: "16px",
    opacity: 1,
    backgroundColor: "#F9A90E",
    boxSizing: "border-box"
  }
}));
