import FooterComponent from "@/components/FooterComponent";
import HeaderComponent from "@/components/HeaderComponent";

import { Box } from "@mui/material";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <HeaderComponent />
      <main>
        <Box sx={{ mt: 8 }}>
          <Outlet />
        </Box>
      </main>
      <FooterComponent />
    </Box>
  );
};

export default MainLayout;
