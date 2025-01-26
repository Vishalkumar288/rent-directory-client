import { KeyboardDoubleArrowRight } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  styled,
  Typography
} from "@mui/material";
import React from "react";
import { currencyFormatter } from "../../shared/utils";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../shared/navigation/appRoutes";

const StyledCard = styled(Card)(({ theme }) => ({
  border: "0.4px solid #B7BEC7",
  borderRadius: 8,
  padding: "5px",
  cursor: "pointer",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  background: "#A07FF6"
}));

const StyledPrimaryText = styled(Typography)(({ color }) => ({
  color: color,
  fontSize: 18,
  fontWeight: 600
}));

const StyledSecondaryText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 12,
  fontWeight: 500
}));

const FloorCard = ({
  floor,
  agreedRent,
  securityDeposit,
  rentStartDate,
  lastEntryDate,
  totalRentPaid,
  totalElectricityBill
}) => {
  const navigate = useNavigate();
  return (
    <StyledCard>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6} display={"flex"} alignItems={"center"}>
            <Typography sx={{ fontWeight: 700, fontSize: 22, color: "#fff" }}>
              {floor || "--"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"right"}
          >
            <CardActions>
              <Button
                variant="outlined"
                sx={{
                  minHeight: "30px",
                  color: "#fff",
                  border: "1px solid #fff"
                }}
                onClick={() => navigate(`${appRoutes.tenants.main}/${floor}`)}
              >
                {"View Details "}
                <KeyboardDoubleArrowRight />
              </Button>
            </CardActions>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ border: "1px solid #fff" }} />
          </Grid>
          <Grid item xs={4} display="flex" justifyContent={"space-between"}>
            <Box display="flex" flexDirection="column">
              <StyledPrimaryText color="#98fb98">
                {Boolean(securityDeposit)
                  ? `${currencyFormatter(Math.floor(securityDeposit))}`
                  : "--"}
              </StyledPrimaryText>
              <StyledSecondaryText>{"Security Deposit"}</StyledSecondaryText>
            </Box>
            <Divider orientation="vertical" sx={{ border: "1px solid #fff" }} />
          </Grid>
          <Grid item xs={4} display="flex" justifyContent={"space-between"}>
            <Box display="flex" flexDirection="column">
              <StyledPrimaryText color="#dc143c">
                {Boolean(agreedRent)
                  ? `${currencyFormatter(Math.floor(agreedRent))}`
                  : "--"}
              </StyledPrimaryText>
              <StyledSecondaryText>{"Rent / Month"}</StyledSecondaryText>
            </Box>
            <Divider orientation="vertical" sx={{ border: "1px solid #fff" }} />
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column">
              <StyledPrimaryText color="pink" sx={{ fontSize: 16 }}>
                {Boolean(rentStartDate)
                  ? `${moment(rentStartDate, "DD/MM/YYYY").format(
                      "DD MMM YYYY"
                    )}`
                  : "--"}
              </StyledPrimaryText>
              <StyledSecondaryText>{"Rent Started on"}</StyledSecondaryText>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ border: "1px solid #fff" }} />
          </Grid>
          <Grid item xs={4} display="flex" justifyContent={"space-between"}>
            <Box display="flex" flexDirection="column">
              <StyledPrimaryText color="#faebd7" sx={{ fontSize: 16 }}>
                {Boolean(lastEntryDate)
                  ? `${moment(lastEntryDate, "DD/MM/YYYY").format("DD MMM YYYY")}`
                  : "--"}
              </StyledPrimaryText>
              <StyledSecondaryText>{"Last Paid on"}</StyledSecondaryText>
            </Box>
            <Divider orientation="vertical" sx={{ border: "1px solid #fff" }} />
          </Grid>
          <Grid item xs={4} display="flex" justifyContent={"space-between"}>
            <Box display="flex" flexDirection="column">
              <StyledPrimaryText color="orange">
                {Boolean(totalRentPaid)
                  ? `${currencyFormatter(Math.floor(totalRentPaid))}`
                  : "--"}
              </StyledPrimaryText>
              <StyledSecondaryText>{"Total Rent col."}</StyledSecondaryText>
            </Box>
            <Divider orientation="vertical" sx={{ border: "1px solid #fff" }} />
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column">
              <StyledPrimaryText color="yellow">
                {Boolean(totalElectricityBill)
                  ? `${currencyFormatter(Math.floor(totalElectricityBill))}`
                  : "--"}
              </StyledPrimaryText>
              <StyledSecondaryText>{"Total Elec. col."}</StyledSecondaryText>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </StyledCard>
  );
};

export default FloorCard;
