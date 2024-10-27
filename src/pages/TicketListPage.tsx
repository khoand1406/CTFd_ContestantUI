import { ROUTE_TICKET_SUBMIT } from "@/constants/routes";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const TicketListPage = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h2" sx={{ m: 2, fontWeight: "bold" }}>
        List of tickets
      </Typography>
      <Button
        variant="contained"
        component={RouterLink}
        to={ROUTE_TICKET_SUBMIT}
        color="success"
      >
        Add new ticket
      </Button>
    </Box>
  );
};

export default TicketListPage;
