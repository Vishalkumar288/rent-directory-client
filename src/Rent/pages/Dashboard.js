import React from "react";
import FloorCard from "../components/FloorCard";
import { CircularProgress, Grid } from "@mui/material";
import { useFetchAllTenants } from "../../query-hooks/useFetchAllTenants";

const Dashboard = () => {
  const { isFetching, data } = useFetchAllTenants();
  return (
    <Grid container spacing={2} sx={{ p: { xs: "15px", md: "25px" } }}>
      {isFetching ? (
        <Grid item xs={12} display={"flex"} justifyContent={"center"}>
          <CircularProgress />
        </Grid>
      ) : (
        data?.tenants?.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <FloorCard
              floor={item.floor}
              agreedRent={item.rentPerMonth}
              securityDeposit={item.securityDeposit}
              rentStartDate={item.rentStartDate}
              lastEntryDate={item.lastEntryDate}
              totalRentPaid={item.totalRentCollected}
              totalElectricityBill={item.totalElectricityCollected}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default Dashboard;
