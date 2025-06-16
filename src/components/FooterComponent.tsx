import { Box, Typography } from "@mui/material";


const FooterComponent = () => {
  return (
    <footer style={{ marginTop: "auto" }}>
      <Box
        color="secondary"
        sx={{ display: "flex", justifyContent: "center", p: 6 }}
      >
        <Typography variant="h5"></Typography>
      </Box>
    </footer>
  );
};

export default FooterComponent;