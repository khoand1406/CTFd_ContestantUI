import { Box, Button, Card, CardContent, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-US", { hour12: false })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString("en-US", { hour12: false }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: '800px', margin: '0 auto', mt: 5, textAlign: 'center' }}>
      {/* Header Text */}
      <Typography variant="h4" color="primary" sx={{ mb: 3, fontWeight: 'bold' }}>
        Bring it on Flag Catchers!
      </Typography>

      {/* Current Time Display */}
      <Typography variant="h1" component="div" sx={{ fontWeight: 'bold', color: 'secondary.main', mb: 2 }}>
        {currentTime}
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        until competition ends
      </Typography>

      {/* Cards for Challenges Solved and Team Ranking */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} mt={5} justifyContent="center">
        {/* Card for Challenges Solved */}
        <Card sx={{ width: '100%', maxWidth: 300, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" component="div" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
              Challenges Solved
            </Typography>
            <Typography variant="body1" color="text.primary">
              You have solved XX/YY challenges!
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Continue challenging yourself to solve more! Aim for the highest rank by clicking the button below.
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth 
              sx={{ mt: 3, fontWeight: 'bold' }}
            >
              Go to Challenges
            </Button>
          </CardContent>
        </Card>

        {/* Card for Team Ranking */}
        <Card sx={{ width: '100%', maxWidth: 300, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" component="div" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
              Team Ranking
            </Typography>
            <Typography variant="body1" color="text.primary">
              Your team reached #13 place!
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={2}>
              Check the leaderboard and see if you can make it to the top 10!
            </Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              fullWidth 
              sx={{ mt: 3, fontWeight: 'bold' }}
            >
              Check the Top 10
            </Button>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

export default HomePage;