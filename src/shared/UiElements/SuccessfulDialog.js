import { Box, Button, Typography } from "@mui/material";

import { CheckCircle } from "@mui/icons-material";

const SuccessfulDialog = ({
  text,
  subText,
  btn1Text,
  btn2Text,
  btn1Callback,
  btn2Callback,
  btn1Variant = "",
  btn2Variant = ""
}) => {
  return (
    <Box
      padding={1}
      display={"flex"}
      flexDirection={"column"}
      gap={"12px"}
      textAlign={"center"}
      alignItems={"center"}
    >
      <CheckCircle
        color="success"
        sx={{
          height: 60,
          width: 60
        }}
      />
      <Typography
        fontSize={20}
        lineHeight={"24px"}
        fontWeight={500}
        letterSpacing={"0.002em"}
      >
        {text}
      </Typography>
      <Typography
        fontSize={14}
        lineHeight={"24px"}
        color={"text.secondary"}
        maxWidth={422}
      >
        {subText}
      </Typography>
      <Box display={{ xs: "block", lg: "flex" }} gap={"10px"} width={"100%"}>
        {btn1Text && (
          <Button
            fullWidth
            variant={btn1Variant ? btn1Variant : "outlined"}
            sx={{
              height: { xs: 48, lg: 64 },
              fontWeight: 500,
              fontSize: 15,
              marginTop: "20px",
              whiteSpace: "nowrap"
            }}
            onClick={btn1Callback}
          >
            {btn1Text}
          </Button>
        )}
        {btn2Text && (
          <Button
            fullWidth
            variant={btn2Variant ? btn2Variant : "contained"}
            sx={{
              height: { xs: 48, lg: 64 },
              fontWeight: 500,
              fontSize: 15,
              marginTop: "20px",
              whiteSpace: "nowrap"
            }}
            onClick={btn2Callback}
          >
            {btn2Text}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SuccessfulDialog;
