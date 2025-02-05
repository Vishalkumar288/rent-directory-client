import * as yup from "yup";
import React, { useEffect } from "react";
import DropDown from "../../shared/FormElements/DropDown";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useFetchAmountByMonthYear } from "../../query-hooks/useFetchAmountByMonthYear";
import moment from "moment";
import { LoadingButton } from "@mui/lab";
import { yupResolver } from "@hookform/resolvers/yup";
import { error_msg } from "../../constants/label";
import { enqueueSnackbar } from "notistack";
import { Months } from "../pages/RentForm";

const schema = yup.object({
  getMonth: yup.string().required(error_msg.required),
  getYear: yup.string().required(error_msg.required)
});

const getYearObjects = () =>
  Array.from({ length: moment().year() - 2022 + 1 }, (_, i) => ({
    name: 2022 + i,
    displayName: (2022 + i).toString()
  }));

const GetAmout = ({
  isElectricity = false,
  sheetId,
  setFetchedData,
  params,
  setParams
}) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });

  const { data, isFetching, isError, error, isSuccess } =
    useFetchAmountByMonthYear(params);

  const onFindClick = (data) => {
    const filteredParams = {
      sheet: sheetId,
      monthYear: `${data["getMonth"]}-${data["getYear"]}`,
      ...{ ...(isElectricity ? { isElectricBill: isElectricity } : {}) }
    };
    setParams(filteredParams);
  };

  useEffect(() => {
    if (Boolean(params) && !isFetching && isSuccess) {
      setFetchedData(data?.amount);
    } // eslint-disable-next-line
  }, [isFetching, JSON.stringify(params), isSuccess]);

  useEffect(() => {
    if (isError) {
      enqueueSnackbar(error?.response?.data?.message, { variant: "error" });
    }
  }, [error?.response?.data?.message, isError]);

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={"flex"} alignItems={"center"} gap={0.5}>
        <Box>
          <DropDown
            control={control}
            name={"getMonth"}
            options={Months}
            placeholder={"Month"}
            sx={{ width: "100px", borderRadius: "30px", height: "30px" }}
          />
        </Box>
        <Box>
          <DropDown
            control={control}
            name={"getYear"}
            options={getYearObjects()}
            placeholder={"Year"}
            sx={{ width: "80px", borderRadius: "30px", height: "30px" }}
          />
        </Box>
      </Box>
      <Box>
        <Button
          variant="contained"
          component={LoadingButton}
          loading={isFetching}
          fullWidth
          sx={{ height: "30px" }}
          onClick={handleSubmit(onFindClick)}
        >
          {"Find"}
        </Button>
      </Box>
    </Box>
  );
};

export default GetAmout;
