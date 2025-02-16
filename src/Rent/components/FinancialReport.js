import * as yup from "yup";
import { Close, CompareArrows } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DropDown from "../../shared/FormElements/DropDown";
import { Months } from "../pages/RentForm";
import { getYearObjects } from "./GetAmout";
import { LoadingButton } from "@mui/lab";
import { useFetchAllTenantFormData } from "../../query-hooks/useFetchAllTenantFormData";
import { error_msg } from "../../constants/label";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import { useFetchFinancialTotal } from "../../query-hooks/useFetchFinancialTotal";
import { enqueueSnackbar } from "notistack";
import { currencyFormatter } from "../../shared/utils";

const schema = yup.object({
  flat: yup.string().required(error_msg.required),
  fromMonth: yup.string().required(error_msg.required),
  fromYear: yup.string().required(error_msg.required),
  toMonth: yup.string().required(error_msg.required),
  toYear: yup.string().required(error_msg.required)
});

const FinancialReport = ({ close }) => {
  const [params, setParams] = useState(null);
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema)
  });
  const { isFetching, data, isError, error } = useFetchAllTenantFormData();
  const {
    data: totalAmount,
    isFetching: isLoadingAmount,
    isError: isAmountError,
    error: amountError
  } = useFetchFinancialTotal(params);

  useEffect(() => {
    if (!isFetching) {
      setValue("flat", "All-Flats");
      setValue("fromMonth", "April");
      setValue("fromYear", +moment(new Date()).format("YYYY") - 1);
      setValue("toMonth", "March");
      setValue("toYear", +moment(new Date()).format("YYYY"));
    }
  }, [isFetching, setValue]);

  const onSubmit = (data) => {
    const formData = {
      from: `${data["fromMonth"]}-${data["fromYear"]}`,
      to: `${data["toMonth"]}-${data["toYear"]}`,
      tenant: data["flat"]
    };
    setParams(formData);
  };

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
    if (isAmountError) {
      enqueueSnackbar(amountError?.response?.data?.message, {
        variant: "error"
      });
    }
  }, [
    error?.response?.data?.message,
    isError,
    amountError?.response?.data?.message,
    isAmountError
  ]);

  return (
    <Grid container rowSpacing={1}>
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography
          sx={{
            fontWeight: 600,
            lineHeight: "22px",
            fontSize: "20px",
            color: "#A020F0"
          }}
        >
          {"Financial Report for"}
        </Typography>
        <Box>
          <DropDown
            control={control}
            name={"flat"}
            options={data?.formData}
            placeholder={"Flat"}
            isLoading={isFetching}
            sx={{ width: "100px", borderRadius: "30px", height: "30px" }}
          />
        </Box>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid container pt={2}>
        <Grid item xs={3.1} display={"flex"} alignItems={"end"}>
          <DropDown
            control={control}
            name={"fromMonth"}
            options={Months}
            placeholder={"Month"}
            label={"From"}
            sx={{ width: "100px", borderRadius: "30px", height: "30px" }}
          />
        </Grid>
        <Grid item xs={2.5} display={"flex"} alignItems={"end"}>
          <DropDown
            control={control}
            name={"fromYear"}
            options={getYearObjects()}
            placeholder={"Year"}
            sx={{ width: "80px", borderRadius: "30px", height: "30px" }}
          />
        </Grid>
        <Grid
          item
          xs={0.8}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"end"}
          pb={"3px"}
        >
          <CompareArrows />
        </Grid>
        <Grid item xs={3.1} display={"flex"} alignItems={"end"}>
          <DropDown
            control={control}
            name={"toMonth"}
            options={Months}
            placeholder={"Month"}
            label={"To"}
            sx={{ width: "100px", borderRadius: "30px", height: "30px" }}
          />
        </Grid>
        <Grid item xs={2.5} display={"flex"} alignItems={"end"}>
          <DropDown
            control={control}
            name={"toYear"}
            options={getYearObjects()}
            placeholder={"Year"}
            sx={{ width: "80px", borderRadius: "30px", height: "30px" }}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        m={1}
      >
        <Typography
          sx={{
            fontWeight: 600,
            lineHeight: "22px",
            fontSize: "20px",
            color: "#98fb98"
          }}
        >
          {`Total Amount : ${
            totalAmount?.totalSum === undefined
              ? "--"
              : currencyFormatter(parseFloat(totalAmount?.totalSum).toFixed(2))
          }`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          component={LoadingButton}
          loading={isLoadingAmount}
          fullWidth
          sx={{ height: "50px" }}
          onClick={handleSubmit(onSubmit)}
        >
          {"Get Total Amount"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default FinancialReport;
