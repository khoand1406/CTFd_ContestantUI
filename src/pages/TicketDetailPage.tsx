import { Box, Typography, Grid, TextField, Divider } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const TicketDetailPage = () => {
  const { id } = useParams();

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", p: 4 }}>
      {/* Title */}
      <Typography variant="h4" component="h1" sx={{ fontWeight: "bold", textAlign: "center", mb: 4 }}>
        Ticket #{id} Information
      </Typography>

      {/* Status and Type Section */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={6}>
          <Typography variant="subtitle1" color="text.secondary">
            Status:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value="Resolved" // Example value
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="subtitle1" color="text.secondary">
            Type:
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value="Technical Problem" // Example value
            InputProps={{
              readOnly: true,
            }}
          />
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ mb: 4 }} />

      {/* Details Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Details:
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={4}
          variant="outlined"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a pulvinar enim..." // Example value
          InputProps={{
            readOnly: true,
          }}
          sx={{ mt: 1 }}
        />
      </Box>

      {/* Admin Response Section */}
      <Box>
        <Typography variant="subtitle1" color="text.secondary">
          Admin Response:
        </Typography>
        <TextField
          fullWidth
          multiline
          minRows={4}
          variant="outlined"
          value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a pulvinar enim..." // Example value
          InputProps={{
            readOnly: true,
          }}
          sx={{ mt: 1 }}
        />
      </Box>
    </Box>
  );
};

export default TicketDetailPage;
