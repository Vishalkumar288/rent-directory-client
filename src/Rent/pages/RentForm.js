import React, { useEffect, useState } from "react";
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
import { AntSwitch } from "../../shared/theme/globalTheme";
import RadioButtonGroup from "../../shared/FormElements/RadioButtonGroup";

const schema = (isSingleEntry = false, isElectricity = false) => {
  if (isSingleEntry) {
    if (isElectricity) {
      return yup.object({
        [entry_formKeys.billdate]: yup.string().required(error_msg.required),
        [entry_formKeys.billMonth]: yup.string().required(error_msg.required),
        [entry_formKeys.billAmount]: yup.string().required(error_msg.required)
      });
    } else {
      return yup.object({
        [entry_formKeys.rentDate]: yup.string().required(error_msg.required),
        [entry_formKeys.rentMonth]: yup.string().required(error_msg.required),
        [entry_formKeys.rentAmount]: yup.string().required(error_msg.required)
      });
    }
  } else {
    return yup.object({
      [entry_formKeys.rentDate]: yup.string().required(error_msg.required),
      [entry_formKeys.rentMonth]: yup.string().required(error_msg.required),
      [entry_formKeys.rentAmount]: yup.string().required(error_msg.required),
      [entry_formKeys.billdate]: yup.string().required(error_msg.required),
      [entry_formKeys.billMonth]: yup.string().required(error_msg.required),
      [entry_formKeys.billAmount]: yup.string().required(error_msg.required)
    });
  }
};

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

const RentForm = ({ hideDialog, refetch, sheetId, rentAmount }) => {
  const [isSingleEntry, setIsSingleEntry] = useState(true);
  const [isElectricity, setIsElectricity] = useState(false);

  const handleToggle = () => {
    setIsSingleEntry((prev) => !prev);
  };

  const { control, handleSubmit, reset, setValue, watch } = useForm({
    resolver: yupResolver(schema(isSingleEntry, isElectricity))
  });

  const entryWatch = watch("entryType");

  useEffect(() => {
    setValue(entry_formKeys.rentDate, new Date());
    setValue(entry_formKeys.rentMonth, moment(new Date()).format("MMMM"));
    setValue(entry_formKeys.rentAmount, rentAmount);
    setValue(entry_formKeys.billdate, new Date());
    setValue(
      entry_formKeys.billMonth,
      moment(new Date()).subtract(1, "months").format("MMMM")
    );
  }, [setValue, rentAmount]);

  useEffect(() => {
    if (entryWatch === "Electricity") {
      setIsElectricity(true);
    } else {
      setIsElectricity(false);
    } // eslint-disable-next-line
  }, [JSON.stringify(entryWatch)]);

  const { mutate, isLoading, isError, error } = useMutateAddEntry();

  const onSubmit = async (data) => {
    const getDataValues = () => {
      if (isSingleEntry) {
        if (isElectricity) {
          return [
            moment(data[entry_formKeys.billdate]).format("DD/MM/YYYY"),
            data[entry_formKeys.billMonth],
            +data[entry_formKeys.billAmount]
          ];
        } else {
          return [
            moment(data[entry_formKeys.rentDate]).format("DD/MM/YYYY"),
            data[entry_formKeys.rentMonth],
            +data[entry_formKeys.rentAmount]
          ];
        }
      } else {
        return [
          moment(data[entry_formKeys.rentDate]).format("DD/MM/YYYY"),
          data[entry_formKeys.rentMonth],
          +data[entry_formKeys.rentAmount],
          "",
          moment(data[entry_formKeys.billdate]).format("DD/MM/YYYY"),
          data[entry_formKeys.billMonth],
          +data[entry_formKeys.billAmount]
        ];
      }
    };
    const values = getDataValues();
    mutate(
      {
        values: [values],
        sheet: [[sheetId]],
        isElectricBill: Boolean(isElectricity)
      },
      {
        onSuccess: (res) => {
          reset();
          hideDialog();
          refetch();
          enqueueSnackbar(res?.data?.message, { variant: "success" });
        }
      }
    );
  };

  useEffect(() => {
    if (isError)
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
  }, [error?.response?.data?.message, isError]);

  return (
    <Grid
      container
      spacing={2}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        item
        xs={12}
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Typography
          sx={{
            color: isSingleEntry ? "#c4C4C4" : "#F9A90E",
            fontSize: 20,
            fontWeight: 700
          }}
        >
          {"Both Entries"}
        </Typography>
        <AntSwitch
          checked={isSingleEntry}
          onChange={handleToggle}
          inputProps={{ "aria-label": "toggle switch" }}
        />
        <Typography
          sx={{
            color: isSingleEntry ? "#A020F0" : "#c4C4C4",
            fontSize: 20,
            fontWeight: 700
          }}
        >
          {"Single Entry"}
        </Typography>
      </Grid>
      {isSingleEntry && (
        <Grid
          container
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          pt={1}
        >
          <RadioButtonGroup
            control={control}
            name={"entryType"}
            options={[
              { label: "Rent", value: "Rent", color: "#85BB65" },
              {
                label: "Electricity",
                value: "Electricity",
                color: "#F9A90E"
              }
            ]}
            defaultValue="Rent"
          />
        </Grid>
      )}
      {(!isSingleEntry || entryWatch !== "Electricity") && (
        <>
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
              maxDate={new Date()}
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
        </>
      )}
      {!isSingleEntry && (
        <Grid item xs={12}>
          <Divider sx={{ border: "1px solid black" }} />
        </Grid>
      )}
      {(!isSingleEntry || entryWatch === "Electricity") && (
        <>
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
              maxDate={new Date()}
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
        </>
      )}
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
