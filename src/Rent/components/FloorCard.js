import * as yup from "yup";
import { BorderColorOutlined, DoneAll, Visibility } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  styled,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { currencyFormatter } from "../../shared/utils";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import appRoutes from "../../shared/navigation/appRoutes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { error_msg } from "../../constants/label";
import { useUpdateSummary } from "../../query-hooks/useUpdateSummary";
import { enqueueSnackbar } from "notistack";
import { LoadingButton } from "@mui/lab";
import Storage from "../../shared/utils/Storage";
import { StorageKeys } from "../../constants/storageKeys";
import TextInput from "../../shared/FormElements/TextInput";
import { StyledChip } from "../../shared/UiElements/StatusChip";

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

const schema = yup.object({
  rent: yup.string().required(error_msg.required),
  security: yup.string().required(error_msg.required)
});

const FloorCard = ({
  floor,
  status,
  agreedRent,
  securityDeposit,
  rentStartDate,
  lastEntryDate,
  totalRentPaid,
  refetch,
  totalElectricityBill
}) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { rent: agreedRent || 0, security: securityDeposit || 0 }
  });
  const [isEditable, setIsEditable] = useState(false);
  const isDemoUser = Storage.getItem(StorageKeys.DEMO_LOGIN);
  const navigate = useNavigate();

  const handleEdit = () => {
    setIsEditable((prev) => !prev);
  };

  const { mutate, isLoading, error, isError } = useUpdateSummary();

  const onSaveClick = (data) => {
    mutate(
      {
        flat: floor,
        values: [[+data["rent"], +data["security"]]],
        ...{ ...(Boolean(isDemoUser) ? { demoLogin: true } : {}) }
      },
      {
        onSuccess: (res) => {
          handleEdit();
          refetch();
          enqueueSnackbar("Updated Summary", { variant: "success" });
        }
      }
    );
  };

  useEffect(() => {
    if (isError)
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
  }, [error?.response?.data?.message, isError]);

  return (
    <StyledCard>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={4} md={4.5} display={"flex"} alignItems={"center"}>
            <Typography
              sx={{
                fontWeight: { xs: 600, md: 700 },
                fontSize: { xs: 18, md: 22 },
                color: "#fff"
              }}
            >
              {floor || "--"}
            </Typography>
          </Grid>
          <Grid
            item
            md={3.5}
            xs={4}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <StyledChip label={status} />
          </Grid>
          <Grid
            item
            xs={4}
            display={"flex"}
            alignItems={"center"}
            justifyContent={isEditable ? "right" : "space-evenly"}
          >
            {isEditable ? (
              <IconButton
                component={LoadingButton}
                loading={isLoading}
                onClick={handleSubmit(onSaveClick)}
                sx={{ minWidth: "40px !important", width: "40px" }}
              >
                <DoneAll sx={{ color: "green" }} />
              </IconButton>
            ) : (
              <>
                <IconButton
                  onClick={() => navigate(`${appRoutes.tenants.main}/${floor}`)}
                  sx={{ border: "0.4px solid #fff" }}
                >
                  <Visibility sx={{ color: "#fff" }} />
                </IconButton>
                <IconButton onClick={handleEdit}>
                  <BorderColorOutlined sx={{ color: "yellow" }} />
                </IconButton>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ border: "1px solid #fff" }} />
          </Grid>
          <Grid item xs={4} display="flex" justifyContent={"space-between"}>
            <Box display="flex" flexDirection="column">
              {isEditable ? (
                <TextInput
                  control={control}
                  name={"security"}
                  placeholder={"Deposit"}
                  type="number"
                  sx={{ height: "30px", width: "100px" }}
                />
              ) : (
                <StyledPrimaryText
                  color="#98fb98"
                  sx={{ fontSize: { xs: 14, md: 16 } }}
                >
                  {Boolean(securityDeposit)
                    ? `${currencyFormatter(Math.floor(securityDeposit))}`
                    : "--"}
                </StyledPrimaryText>
              )}
              <StyledSecondaryText>{"Security Dep."}</StyledSecondaryText>
            </Box>
            <Divider orientation="vertical" sx={{ border: "1px solid #fff" }} />
          </Grid>
          <Grid item xs={4} display="flex" justifyContent={"space-between"}>
            <Box display="flex" flexDirection="column">
              {isEditable ? (
                <TextInput
                  control={control}
                  name={"rent"}
                  placeholder={"Rent"}
                  type="number"
                  sx={{ height: "30px", width: "100px" }}
                />
              ) : (
                <StyledPrimaryText
                  color="#dc143c"
                  sx={{ fontSize: { xs: 14, md: 16 } }}
                >
                  {Boolean(agreedRent)
                    ? `${currencyFormatter(Math.floor(agreedRent))}`
                    : "--"}
                </StyledPrimaryText>
              )}
              <StyledSecondaryText>{"Rent / Month"}</StyledSecondaryText>
            </Box>
            <Divider orientation="vertical" sx={{ border: "1px solid #fff" }} />
          </Grid>
          <Grid item xs={4}>
            <Box display="flex" flexDirection="column">
              <StyledPrimaryText
                color="pink"
                sx={{ fontSize: { xs: 14, md: 16 } }}
              >
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
              <StyledPrimaryText
                color="#faebd7"
                sx={{ fontSize: { xs: 14, md: 16 } }}
              >
                {Boolean(lastEntryDate)
                  ? `${moment(lastEntryDate, "DD/MM/YYYY").format(
                      "DD MMM YYYY"
                    )}`
                  : "--"}
              </StyledPrimaryText>
              <StyledSecondaryText>{"Last Paid on"}</StyledSecondaryText>
            </Box>
            <Divider orientation="vertical" sx={{ border: "1px solid #fff" }} />
          </Grid>
          <Grid item xs={4} display="flex" justifyContent={"space-between"}>
            <Box display="flex" flexDirection="column">
              <StyledPrimaryText
                color="orange"
                sx={{ fontSize: { xs: 14, md: 16 } }}
              >
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
              <StyledPrimaryText
                color="yellow"
                sx={{ fontSize: { xs: 14, md: 16 } }}
              >
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
