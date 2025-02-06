import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Divider, Grid, Typography } from "@mui/material";
import DateInput from "../../shared/FormElements/DateInput";
import { entry_formKeys } from "../../constants/formKeys";
import DropDown from "../../shared/FormElements/DropDown";
import TextInput from "../../shared/FormElements/TextInput";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { entry_labels } from "../../constants/label";
import { enqueueSnackbar } from "notistack";
import moment from "moment";
import RadioButtonGroup from "../../shared/FormElements/RadioButtonGroup";
import { Months, schema } from "../pages/RentForm";
import { useUpdateEntry } from "../../query-hooks/useUpdateEntry";
import GetAmout from "./GetAmout";
import { StorageKeys } from "../../constants/storageKeys";
import Storage from "../../shared/utils/Storage";

const UpdateValues = ({ hideDialog, refetch, sheetId }) => {
  const [params, setParams] = useState();
  const [fetchedData, setFetchedData] = useState([]);
  const [isElectricity, setIsElectricity] = useState(false);
  const isDemoUser = Storage.getItem(StorageKeys.DEMO_LOGIN);
  const { control, handleSubmit, reset, setValue, watch } = useForm({
    resolver: yupResolver(schema(true, isElectricity))
  });

  const entryWatch = watch("entryType");

  const { mutate, isLoading, isError, error } = useUpdateEntry();

  useEffect(() => {
    if (entryWatch === "Electricity") {
      setIsElectricity(true);
    } else {
      setIsElectricity(false);
    } // eslint-disable-next-line
  }, [JSON.stringify(entryWatch)]);

  useEffect(() => {
    if (fetchedData?.length) {
      if (!isElectricity) {
        setValue(
          entry_formKeys.rentDate,
          new Date(fetchedData[0].split("/").reverse().join("/"))
        );
        setValue(entry_formKeys.rentMonth, fetchedData[1].split("-")[0]);
        setValue(
          entry_formKeys.rentAmount,
          parseInt(fetchedData[2]?.replace(/,/g, ""), 10)
        );
      } else {
        setValue(
          entry_formKeys.billdate,
          new Date(fetchedData[0].split("/").reverse().join("/"))
        );
        setValue(entry_formKeys.billMonth, fetchedData[1].split("-")[0]);
        setValue(
          entry_formKeys.billAmount,
          parseInt(fetchedData[2]?.replace(/,/g, ""), 10)
        );
      }
    }
  }, [fetchedData, isElectricity, setValue]);

  const onSubmit = async (data) => {
    const getDataValues = () => {
      if (isElectricity) {
        return [
          moment(data[entry_formKeys.billdate]).format("DD/MM/YYYY"),
          `${data[entry_formKeys.billMonth]}-${moment(new Date()).format(
            "YYYY"
          )}`,
          +data[entry_formKeys.billAmount]
        ];
      } else {
        return [
          moment(data[entry_formKeys.rentDate]).format("DD/MM/YYYY"),
          `${data[entry_formKeys.rentMonth]}-${moment(new Date()).format(
            "YYYY"
          )}`,
          +data[entry_formKeys.rentAmount]
        ];
      }
    };
    const values = getDataValues();
    Boolean(params) &&
      mutate(
        {
          values: [values],
          sheet: sheetId,
          monthYear: params.monthYear,
          isElectricBill: Boolean(isElectricity),
          ...{ ...(Boolean(isDemoUser) ? { demoLogin: true } : {}) }
        },
        {
          onSuccess: (res) => {
            reset();
            hideDialog();
            refetch();
            enqueueSnackbar(res?.data?.message, { variant: "success" });
            setParams(null);
          }
        }
      );
  };

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  }, [error?.response?.data?.message, isError]);

  return (
    <Grid
      container
      spacing={2}
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
    >
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
      {entryWatch !== "Electricity" ? (
        <>
          <Grid
            item
            xs={12}
            container
            display={"flex"}
            alignItems={"center"}
            columnSpacing={1}
          >
            <Grid item xs={4}>
              <Typography
                sx={{ fontSize: "20px", fontWeight: 700, color: "#85BB65" }}
              >
                {"Rent"}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <GetAmout
                sheetId={sheetId}
                isElectricity={isElectricity}
                setFetchedData={setFetchedData}
                params={params}
                setParams={setParams}
              />
            </Grid>
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
      ) : (
        <>
          <Grid
            item
            xs={12}
            container
            display={"flex"}
            alignItems={"center"}
            columnSpacing={1}
          >
            <Grid item xs={4}>
              <Typography
                sx={{ fontSize: "20px", fontWeight: 700, color: "#ffe047" }}
              >
                {"Electric Bill"}
              </Typography>
            </Grid>
            <Grid item xs={8}>
              <GetAmout
                sheetId={sheetId}
                isElectricity={isElectricity}
                setFetchedData={setFetchedData}
                params={params}
                setParams={setParams}
              />
            </Grid>
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
          {"Update Entry"}
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

export default UpdateValues;
