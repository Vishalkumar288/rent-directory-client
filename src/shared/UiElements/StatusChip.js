import { Chip } from "@mui/material";
import { Circle } from "@mui/icons-material";
import { stringCapitalization } from "../utils";

const SuccessCode = {
  color: "#85BB65",
  backgroundColor: "#E8F9F5"
};

const WarningCode = {
  color: "#CC9D42",
  backgroundColor: "#FFF9EE"
};

const ErrorCode = {
  color: "#A83B3B",
  backgroundColor: "#FEEEEE"
};

export const StyledChip = ({ label, variant = "outlined", ...props }) => {
  const statusCode = {
    Paid: SuccessCode,
    Pending: ErrorCode,
    HalfPaid: WarningCode
  };

  return (
    <Chip
      {...props}
      sx={{
        color: statusCode[label]?.color,
        backgroundColor: ["outlined", "standard"].includes(variant)
          ? statusCode[label]?.backgroundColor
          : "transparent",
        border: variant === "outlined" ? "0.4px solid" : 0,
        borderColor: statusCode[label]?.color,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: "16px",
        height: ["outlined", "standard"].includes(variant) ? 32 : "auto",
        ".MuiChip-icon": {
          color: statusCode[label]?.color
        },
        width: "100%",
        ".MuiChip-label": {
          whiteSpace: "pretty",
          wordWrap: "inherit",
          display: "flex"
        },
      }}
      icon={
        <Circle
          sx={{
            fontSize: 12
          }}
        />
      }
      label={stringCapitalization(
        label?.replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase()
      )}
    />
  );
};
