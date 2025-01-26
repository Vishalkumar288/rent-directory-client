import { Navigate, Route } from "react-router-dom";
import appRoutes from "./appRoutes";
import RentDetails from "../../Rent/pages/RentDetails";
import Dashboard from "../../Rent/pages/Dashboard";
import Home from "../../Rent/pages/Home";

export const privateRoutes = (
  <>
    <Route path="*" element={<Navigate to={appRoutes.dashboard} />} />
    <Route path={appRoutes.home} element={<Home />} />
    <Route path={appRoutes.dashboard} element={<Dashboard />} />
    <Route
      path={appRoutes.tenants.main + appRoutes.tenants.floor}
      element={<RentDetails />}
    />
    {/* <Route path={appRoutes.home} element={<Landing />} /> */}
  </>
);
export const publicRoutes = (
  <>
    <Route path="*" element={<Navigate to={appRoutes.home} />} />
    <Route path={appRoutes.home} element={<Home />} />
    {/* <Route path={appRoutes.home} element={<Landing />} /> */}
  </>
);
