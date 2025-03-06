import React from "react";
import FloorCard from "../components/FloorCard";
import { Button, CircularProgress, Grid } from "@mui/material";
import { useFetchAllTenants } from "../../query-hooks/useFetchAllTenants";
import { useCustomDialog } from "../../shared/customDialog";
import FinancialReport from "../components/FinancialReport";

const Dashboard = () => {
  const { isFetching, data, refetch } = useFetchAllTenants();

  const { showDialog, hideDialog } = useCustomDialog();

  const onFinancialClick = () => {
    showDialog({
      component: <FinancialReport close={hideDialog} />,
      backdropOff: true
    });
  };

  return (
    <Grid container spacing={2} sx={{ p: { xs: "15px", md: "25px" } }}>
      {isFetching ? (
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid container display={"flex"} justifyContent={"right"}>
            <Button
              variant="text"
              sx={{
                fontWeight: 600,
                lineHeight: "20px",
                fontSize: 17,
                color: "yellow"
              }}
              onClick={onFinancialClick}
            >
              {"Financial Report >>"}
            </Button>
          </Grid>
          {data?.tenants?.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <FloorCard
                floor={item.floor}
                agreedRent={item.rentPerMonth}
                securityDeposit={item.securityDeposit}
                rentStartDate={item.rentStartDate}
                lastEntryDate={item.lastEntryDate}
                totalRentPaid={item.totalRentCollected}
                refetch={refetch}
                totalElectricityBill={item.totalElectricityCollected}
              />
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
};

export default Dashboard;
