import React, { useEffect } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button, Divider, Grid, Typography } from "@mui/material";
import DateInput from "../../shared/FormElements/DateInput";
import { entry_formKeys } from "../../constants/formKeys";
import DropDown from "../../shared/FormElements/DropDown";
import TextInput from "../../shared/FormElements/TextInput";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { entry_labels, error_msg } from "../../constants/label";
import { useMutateAddEntry } from "../../query-hooks/useMutateAddEntry";
import { enqueueSnackbar } from "notistack";
import moment from "moment";

const schema = yup.object({
  [entry_formKeys.rentDate]: yup.string().required(error_msg.required),
  [entry_formKeys.rentMonth]: yup.string().required(error_msg.required),
  [entry_formKeys.rentAmount]: yup.string().required(error_msg.required),
  [entry_formKeys.billdate]: yup.string().required(error_msg.required),
  [entry_formKeys.billMonth]: yup.string().required(error_msg.required),
  [entry_formKeys.billAmount]: yup.string().required(error_msg.required)
});

const Months = [
  { name: "January", displayName: "January" },
  { name: "February", displayName: "February" },
  { name: "March", displayName: "March" },
  { name: "April", displayName: "April" },
  { name: "May", displayName: "May" },
  { name: "June", displayName: "June" },
  { name: "July", displayName: "July" },
  { name: "August", displayName: "August" },
  { name: "September", displayName: "September" },
  { name: "October", displayName: "October" },
  { name: "November", displayName: "November" },
  { name: "December", displayName: "December" }
];

const RentForm = ({ hideDialog, refetch, sheetId }) => {
  const { control, handleSubmit, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const { mutate, isLoading, isError, error } = useMutateAddEntry();

  // Handle form submission
  const onSubmit = async (data) => {
    mutate(
      {
        values: [
          [
            moment(data[entry_formKeys.rentDate]).format("DD/MM/YYYY"),
            data[entry_formKeys.rentMonth],
            +data[entry_formKeys.rentAmount],
            "",
            moment(data[entry_formKeys.billdate]).format("DD/MM/YYYY"),
            data[entry_formKeys.billMonth],
            +data[entry_formKeys.billAmount]
          ]
        ],
        sheet: [[sheetId]]
      },
      {
        onSuccess: (res) => {
          reset();
          hideDialog();
          refetch();
          enqueueSnackbar("Entry added! ", { variant: "success" });
        }
      }
    );
  };

  useEffect(() => {
    if (isError)
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
  }, [error?.response.data.message, isError]);

  return (
    <Grid
      container
      spacing={2}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={12}>
        <Typography
          sx={{ fontSize: "20px", fontWeight: 700, color: "#85BB65" }}
        >
          {"Rent Entry"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={4}>
        <DateInput
          label={entry_labels.date}
          control={control}
          name={entry_formKeys.rentDate}
          minDate={"2000-01-01"}
        />
      </Grid>
      <Grid item xs={4}>
        <DropDown
          label={entry_labels.month}
          control={control}
          name={entry_formKeys.rentMonth}
          options={Months}
        />
      </Grid>
      <Grid item xs={4}>
        <TextInput
          label={entry_labels.amount}
          control={control}
          name={entry_formKeys.rentAmount}
          type="number"
        />
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ border: "1px solid black" }} />
      </Grid>
      <Grid item xs={12}>
        <Typography
          sx={{ fontSize: "20px", fontWeight: 700, color: "#ffe047" }}
        >
          {"Electric Bill Entry"}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={4}>
        <DateInput
          label={entry_labels.date}
          control={control}
          name={entry_formKeys.billdate}
          minDate={"2000-01-01"}
        />
      </Grid>
      <Grid item xs={4}>
        <DropDown
          label={entry_labels.month}
          control={control}
          name={entry_formKeys.billMonth}
          options={Months}
        />
      </Grid>
      <Grid item xs={4}>
        <TextInput
          label={entry_labels.amount}
          control={control}
          name={entry_formKeys.billAmount}
          type="number"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          variant="contained"
          component={LoadingButton}
          loading={isLoading}
          fullWidth
          sx={{ height: "50px" }}
          onClick={handleSubmit(onSubmit)}
        >
          {"Add Entry"}
        </Button>
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          variant="outlined"
          fullWidth
          sx={{ height: "50px" }}
          onClick={() => {
            reset();
            hideDialog();
          }}
        >
          {"Cancel"}
        </Button>
      </Grid>
    </Grid>
  );
};

export default RentForm;
