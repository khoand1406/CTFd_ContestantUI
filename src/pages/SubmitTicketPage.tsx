import React, { ChangeEvent, useState } from "react";
import { Box, Typography, TextField, MenuItem, Select, FormControl, Button, SelectChangeEvent } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

const SubmitTicketPage: React.FC = () => {
  const [ticketLevel, setTicketLevel] = useState<string>('');
  const [ticketType, setTicketType] = useState<string>('');
  const [ticketDetails, setTicketDetails] = useState<string>('');

  const handleLevelChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTicketLevel(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setTicketType(event.target.value);
  };

  const handleDetailsChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTicketDetails(event.target.value);
  }

  return (
    <Box sx={{ width: '50%', margin: '0 auto', mt: 5, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, mt: 10 }}>
        Submit a Ticket
      </Typography>


      {/* Level Input as TextField */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ textAlign: 'left', mb: 1 }}>Level:</Typography>
        <TextField
          value={ticketLevel}
          onChange={handleLevelChange}
          placeholder="Enter level"
          variant="outlined"
          fullWidth
        />
      </FormControl>

      {/* Type of Ticket as Select */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <Typography variant="body1" sx={{ textAlign: 'left', mb: 1 }}>Type of Ticket:</Typography>
        <Select
          value={ticketType}
          onChange={handleTypeChange}
          variant="outlined"
          sx={{ textAlign: "left" }}
        >
          <MenuItem value="Bug">Bug</MenuItem>
          <MenuItem value="Feature Request">Feature Request</MenuItem>
          <MenuItem value="Support">Support</MenuItem>
        </Select>
      </FormControl>

      {/* Details Textarea */}
      <Typography variant="body1" sx={{ textAlign: 'left', mb: 1 }}>Details:</Typography>
      <TextareaAutosize
        aria-label="minimum height"
        onChange={handleDetailsChange}
        value={ticketDetails}
        minRows={5}
        placeholder="Enter your ticket details here"
        style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px', borderColor: '#ccc', marginBottom: '16px' }}
      />

      {/* Submit Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" sx={{ backgroundColor: '#555', color: '#fff' }}>
          Submit
        </Button>
      </Box>

    </Box>
  );
};

export default SubmitTicketPage;
