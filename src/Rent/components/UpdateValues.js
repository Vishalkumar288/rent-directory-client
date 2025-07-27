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
import { useDeleteEntry } from "../../query-hooks/useDeleteEntry";

const UpdateValues = ({ hideDialog, refetch, sheetId }) => {
  const [params, setParams] = useState();
  const [fetchedData, setFetchedData] = useState([]);
  const [isElectricity, setIsElectricity] = useState(false);
  const [operationType, setOperationType] = useState("operations");
  const isDemoUser = Storage.getItem(StorageKeys.DEMO_LOGIN);
  const { control, handleSubmit, reset, setValue, watch } = useForm({
    resolver: yupResolver(schema(true, isElectricity))
  });

  const entryWatch = watch("entryType");

  const { mutate, isLoading, isError, error } = useUpdateEntry();

  const {
    mutate: deleteEntry,
    isLoading: isDeleting,
    isError: isDeleteError,
    error: deleteError
  } = useDeleteEntry();

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

  const onDelete = async () => {
    Boolean(params) &&
      deleteEntry(
        {
          sheet: sheetId,
          monthYear: params.monthYear,
          ...{
            ...(Boolean(isElectricity)
              ? { isElectricBill: Boolean(isElectricity) }
              : {})
          },
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
    if (isDeleteError) {
      enqueueSnackbar(deleteError?.response?.data?.message, {
        variant: "error"
      });
    }
  }, [
    error?.response?.data?.message,
    isError,
    deleteError?.response?.data?.message,
    isDeleteError
  ]);

  const ActionButtons = ({
    operationType = "operations",
    setOperationType = () => {}
  }) => {
    const variants = {
      operations: (
        <>
          <Grid
            item
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Typography variant="caption">
              {"Which action You want to perform?"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              variant="outlined"
              fullWidth
              sx={{ height: "50px" }}
              onClick={() => setOperationType("update")}
            >
              {"Update"}
            </Button>
          </Grid>
          <Grid
            item
            xs={12}
            md={2}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {"--or--"}
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button
              variant="outlined"
              fullWidth
              sx={{
                height: "50px",
                bgColor: "error.main",
                borderColor: "error.main",
                color: "error.main"
              }}
              onClick={() => setOperationType("delete")}
            >
              {"Delete"}
            </Button>
          </Grid>
        </>
      ),
      update: (
        <>
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
              onClick={() => setOperationType("operations")}
            >
              {"Go Back"}
            </Button>
          </Grid>
        </>
      ),
      delete: (
        <>
          <Grid item xs={12} md={6}>
            <Button
              variant="softError"
              component={LoadingButton}
              loading={isDeleting}
              fullWidth
              sx={{ height: "50px" }}
              onClick={handleSubmit(onDelete)}
            >
              {"Delete Entry"}
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              variant="outlined"
              fullWidth
              sx={{ height: "50px" }}
              onClick={() => setOperationType("operations")}
            >
              {"Go Back"}
            </Button>
          </Grid>
        </>
      )
    };

    return variants[operationType];
  };

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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
      <ActionButtons
        operationType={operationType}
        setOperationType={setOperationType}
      />
    </Grid>
  );
};

export default UpdateValues;
