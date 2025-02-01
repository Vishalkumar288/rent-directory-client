import React, { useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
  CircularProgress,
  styled
} from "@mui/material";
import { useCustomDialog } from "../../shared/customDialog";
import RentForm from "./RentForm";
import { ArrowBack } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchGetRentDetails } from "../../query-hooks/useFetchGetRentDetails";
import moment from "moment/moment";
import { currencyFormatter } from "../../shared/utils";
import { useInView } from "react-intersection-observer";

export const CustomTypo = styled(Typography)`
  font-weight: 700;
  line-height: 19.36px;
`;

export const SubtotalTypo = (value, label, color) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      gap={1}
      alignItems={"center"}
    >
      <CustomTypo color={color}>{value}</CustomTypo>
      <Typography
        sx={{
          fontWeight: 400,
          lineHeight: "14px",
          fontSize: "12px",
          color: "#fff"
        }}
      >
        {`(${label})`}
      </Typography>
    </Box>
  );
};

const RentDetails = () => {
  const { floor } = useParams();
  const { ref, inView } = useInView({ threshold: 0 });
  const { isFetched, data, refetch, hasNextPage, fetchNextPage } =
    useFetchGetRentDetails(floor);
  const { showDialog, hideDialog } = useCustomDialog();
  const navigate = useNavigate();

  const sheetSummary = data?.pages?.[0]?.sheetSummary;

  const onAddClick = () => {
    showDialog({
      component: (
        <RentForm
          hideDialog={hideDialog}
          refetch={refetch}
          sheetId={floor}
          rentAmount={sheetSummary?.rentPerMonth || 0}
        />
      ),
      backdropOff: true,
      closeIcon: true
    });
  };

  const getRows = (rows = []) => {
    return rows?.map((item, index) => ({
      id: index + 1,
      rent: {
        date: item?.rentData?.[0] || "",
        month: item?.rentData?.[1] || "",
        amount: item?.rentData?.[2] || ""
      },
      electricity: {
        date: item?.electricityData?.[0] || "",
        month: item?.electricityData?.[1] || "",
        amount: item?.electricityData?.[2] || ""
      }
    }));
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  return !isFetched ? (
    <Grid item xs={12} display={"flex"} justifyContent={"center"}>
      <CircularProgress />
    </Grid>
  ) : (
    <Box sx={{ backgroundColor: "#000", padding: "20px" }}>
      {/* Header */}
      <Grid container spacing={2} paddingBottom={2}>
        <Grid item xs={2} display={"flex"}>
          <IconButton
            size="small"
            onClick={() => {
              navigate(-1);
            }}
            sx={{ marginRight: 1, marginLeft: -1, color: "#fff" }}
          >
            <ArrowBack fontSize="small" />
          </IconButton>
          <Typography
            component={"h1"}
            sx={{ fontSize: 28, fontWeight: 700, color: "#fff" }}
          >
            {sheetSummary?.floor}
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {SubtotalTypo(
            sheetSummary?.rentPerMonth
              ? currencyFormatter(
                  parseFloat(sheetSummary?.rentPerMonth).toFixed(2)
                )
              : "--",
            "Rent / Month",
            "#dc143c"
          )}
        </Grid>
        <Grid
          item
          xs={1.5}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {SubtotalTypo(
            sheetSummary?.securityDeposit
              ? currencyFormatter(
                  parseFloat(sheetSummary?.securityDeposit).toFixed(2)
                )
              : "--",
            "Security Deposit",
            "#98fb98"
          )}
        </Grid>
        <Grid
          item
          xs={1.5}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {SubtotalTypo(
            sheetSummary?.totalRentCollected
              ? currencyFormatter(
                  parseFloat(sheetSummary?.totalRentCollected).toFixed(2)
                )
              : "--",
            "Total Rent Collected",
            "#faebd7"
          )}
        </Grid>
        <Grid
          item
          xs={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {SubtotalTypo(
            sheetSummary?.totalElectricityCollected
              ? currencyFormatter(
                  parseFloat(sheetSummary?.totalElectricityCollected).toFixed(2)
                )
              : "--",
            "Total Electricity Collected",
            "yellow"
          )}
        </Grid>
        <Grid
          item
          xs={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          {SubtotalTypo(
            currencyFormatter(
              parseFloat(
                (+sheetSummary?.totalRentCollected || 0) +
                  (+sheetSummary?.totalElectricityCollected || 0)
              ).toFixed(2)
            ),
            "Total Amount Collected",
            "green"
          )}
        </Grid>
        <Grid
          item
          xs={2}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"right"}
        >
          <Button variant="text" sx={{ color: "#fff" }} onClick={onAddClick}>
            {"+ Add Entry"}
          </Button>
        </Grid>
      </Grid>

      {/* Table */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          backgroundColor: "rgb(39, 38, 38)",
          boxShadow: "none",
          borderRadius: "0",
          overflow: "hidden",
          border: "none"
        }}
      >
        <Table
          sx={{
            borderCollapse: "collapse",
            "& td, & th": {
              // border: "1px solid transparent",
              position: "relative"
            },
            "& td::before, & th::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              boxShadow: "inset 0 0 0px 1px #B0B0B0",
              pointerEvents: "none"
            }
          }}
        >
          {/* Table Head */}
          <TableHead>
            <TableRow>
              {/* Rent Header */}
              <TableCell
                colSpan={3}
                align="center"
                sx={{
                  color: "#85BB65",
                  fontWeight: "bold",
                  fontSize: "19px",
                  border: "none"
                }}
              >
                ₹ Rent ₹
              </TableCell>
              {/* Electricity Header */}
              <TableCell
                colSpan={3}
                align="center"
                sx={{
                  color: "#ffe047",
                  fontWeight: "bold",
                  fontSize: "19px",
                  border: "none"
                }}
              >
                ⚡︎ Electricity ⚡︎
              </TableCell>
            </TableRow>
            <TableRow>
              {/* Rent Columns */}
              <TableCell
                align="center"
                sx={{ color: "#ADD8E6", border: "none", fontSize: "17px" }}
              >
                Date
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#ADD8E6", border: "none", fontSize: "17px" }}
              >
                Month
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#ADD8E6", border: "none", fontSize: "17px" }}
              >
                Amount
              </TableCell>
              {/* Electricity Columns */}
              <TableCell
                align="center"
                sx={{ color: "#ADD8E6", border: "none", fontSize: "17px" }}
              >
                Date
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#ADD8E6", border: "none", fontSize: "17px" }}
              >
                Month
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#ADD8E6", border: "none", fontSize: "17px" }}
              >
                Amount
              </TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {data?.pages
              ?.flatMap((page) => getRows(page?.data?.rows))
              .map((row) => (
                <TableRow key={row.id}>
                  {/* Rent Columns */}
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      height: "50px", // Increased Row Height
                      padding: "12px 8px"
                    }}
                  >
                    {moment(row.rent.date, "DD/MM/YYYY").format("DD MMM YYYY")}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      height: "50px",
                      padding: "12px 8px"
                    }}
                  >
                    {row.rent.month}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      height: "50px",
                      padding: "12px 8px"
                    }}
                  >
                    {currencyFormatter(row.rent.amount)}
                  </TableCell>

                  {/* Electricity Columns */}
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      height: "50px",
                      padding: "12px 8px"
                    }}
                  >
                    {row.electricity.date
                      ? moment(row.electricity.date, "DD/MM/YYYY").format(
                          "DD MMM YYYY"
                        )
                      : ""}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      height: "50px",
                      padding: "12px 8px"
                    }}
                  >
                    {row.electricity.month}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      height: "50px",
                      padding: "12px 8px"
                    }}
                  >
                    {row.electricity.amount
                      ? currencyFormatter(row.electricity.amount)
                      : ""}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {hasNextPage && (
          <Box
            ref={ref}
            display={"flex"}
            justifyContent={"center"}
            margin={"16px 0"}
            width={"100%"}
          >
            <CircularProgress />
          </Box>
        )}
      </TableContainer>
    </Box>
  );
};

export default RentDetails;
