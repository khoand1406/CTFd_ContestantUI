import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button, IconButton } from "@mui/material";

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false }));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Box sx={{ width: '50%', margin: '0 auto', mt: 5, textAlign: 'center' }}>
        {/* Display current time */}
        <Typography variant="h6" sx={{ mb: 3, mt: 10 }}>
          Bring it on Flag Catchers!
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>
          <Typography variant="h1" component="span" sx={{ fontWeight: "bold" }}>
            {currentTime} 
          </Typography>
        </Typography>
        <Typography variant="h6" sx={{ mt: 3 }}>
          unitl competition ends
        </Typography>

        {/* Cards for challenges and team ranking */}
        <Box display="flex" justifyContent="space-around" padding={2} mt={5}>
          {/* Card for Challenges Solved */}
          <Card sx={{ width: 250, padding: 2, textAlign: 'center' }}>
            <CardContent>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" component="div">
                  You have solved XX/YY challenges!
                </Typography>           
              </Box>
              <Typography variant="body2" color="text.secondary" mt={2}>
                To replace any placeholder text (such as this), just click and start typing. We think this paragraph makes a great statement just as it is. But if you'd like to try a bit of customizing to make it your own, you can change the fonts with just a click.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Go to challenges
              </Button>
            </CardContent>
          </Card>

          {/* Card for Team Ranking */}
          <Card sx={{ width: 250, padding: 2, textAlign: 'center' }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Your team reached #13 place!
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                To replace any placeholder text (such as this), just click and start typing. We think this paragraph makes a great statement just as it is. But if you'd like to try a bit of customizing to make it your own, you can change the fonts with just a click.
              </Typography>
              <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                Check the top 10
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
