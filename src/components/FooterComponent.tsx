import { Box, Typography } from "@mui/material";
import React from "react";

const FooterComponent = () => {
  return (
    <footer style={{ marginTop: "auto" }}>
      <Box
        color="secondary"
        sx={{ display: "flex", justifyContent: "center", p: 6 }}
      >
        <Typography variant="h5">Powered with the CTFd API</Typography>
      </Box>
    </footer>
  );
};

export default FooterComponent;
