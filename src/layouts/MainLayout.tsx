import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      <Navbar companyName = "ArogJob" />
      <Outlet />
    </>
  );
};

export default MainLayout;
