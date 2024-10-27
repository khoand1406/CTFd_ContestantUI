import { Box, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const TicketDetailPage = () => {
  const { id } = useParams();

  return (
    <Box textAlign="center">
      <Typography variant="h2" sx={{ m: 2, fontWeight: "bold" }}>
        Ticket no xx information
      </Typography>
    </Box>
  );
};

export default TicketDetailPage;
