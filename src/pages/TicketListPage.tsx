import { ROUTE_TICKET_SUBMIT, ROUTE_TICKET_DETAIL } from "@/constants/routes";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const TicketListPage = () => {
  const tickets = [
    { id: 1, title: "Ticket 1", status: "Open", createDate: "2023-10-01" },
    { id: 2, title: "Ticket 2", status: "Closed", createDate: "2023-10-02" },
  ];

  const navigate = useNavigate();

  const handleRowClick = (id: number) => {
    navigate(ROUTE_TICKET_DETAIL.replace(":id", id.toString()));
  };

  return (
    <Box sx={{ width: '70%', margin: '0 auto', mt: 5, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ m: 2, mt: 10, fontWeight: "bold" }}>
        List of tickets
      </Typography>
      <Button
        variant="contained"
        component={RouterLink}
        to={ROUTE_TICKET_SUBMIT}
        color="success"
        sx={{ mb: 2 }}
      >
        Add new ticket
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Ticket Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Create Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id} onClick={() => handleRowClick(ticket.id)} style={{ cursor: 'pointer' }}>
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.title}</TableCell>
                <TableCell>{ticket.status}</TableCell>
                <TableCell>{ticket.createDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TicketListPage;