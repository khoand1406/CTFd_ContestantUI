import { KEY_USERINFO } from "@/constants/storage-keys";
import { IChallenge } from "@/interfaces/challenges";
import { ChallengeService } from "@/services/challenges.service";
import { StorageUtils } from "@/utils/storage.utils";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ChallengeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const challengeId = id ? parseInt(id, 10) : undefined;

  const [challenge, setChallenge] = useState<IChallenge | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStartingInstance, setIsStartingInstance] = useState(false);
  const tokenString = StorageUtils.getItem(KEY_USERINFO, "local") as string;
  const token = JSON.parse(tokenString);

  const [flag, setFlag] = useState("");
  const [isSubmittingFlag, setIsSubmittingFlag] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [selectedHint, setSelectedHint] = useState<{ id: number; content: string } | null>(null);
  const [wsMessage, setWsMessage] = useState<string | null>(null); // WebSocket message state


  useEffect(() => {
    const ws = new WebSocket("ws://127.0.0.1:5002");

    ws.onopen = () => {
      console.log("WebSocket connection opened.");
      // Send ping at intervals
      const pingInterval = setInterval(() => {
        ws.send("ping");
        console.log("Sent ping");
      }, 10000);
      ws.onclose = () => {
        clearInterval(pingInterval); // Clear interval on close
        console.log("WebSocket connection closed.");
      };
    };

    ws.onmessage = (event) => {
      console.log("Received message from server:", event.data);
      if (event.data === "pong") {
        console.log("Received pong from server");
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, []);

  // Fetch challenge details

  const [remainingTime, setRemainingTime] = useState<number>(0);
  

  //count-down logic
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => Math.max(prevTime - 1, 0));
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [remainingTime]);


  //fetch challenge voi API 
  useEffect(() => {
    const fetchChallengeDetails = async () => {
      try {
        if (!challengeId) {
          setError("Invalid challenge ID.");
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        const response = await ChallengeService.getChallengeDetails(challengeId);

        if (response?.data.success) {

          setChallenge(response.data.data);
          setRemainingTime(response.data.data.time_limit)
          setError(null);
        } else {
          setError("Challenge not found.");
        }
      } catch (error) {
        setError("Error fetching challenge details.");
        console.error("Error fetching challenge details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallengeDetails();
  }, [challengeId]);


  // nut start button event click
  const handleStartInstance = async () => {
    setIsStartingInstance(true);

    try {
      if (!challengeId) {
        setError("Invalid challenge ID.");
        setIsStartingInstance(false);
        return;
      }

      const response = await ChallengeService.startChallenge({
        challenge_id: challengeId,
        generatedToken: token.generatedToken,
      });

      if (response?.data.success) {
        if (challenge) {
          setChallenge({
            ...challenge,
            connection_info: response.data.connection_info, // Thêm connection_info vào challenge
          });
        }
      } else {
        setError("Failed to start the instance.");
      }
    } catch (error) {
      setError("Error starting instance.");
      console.error("Error starting instance:", error);
    } finally {
      setIsStartingInstance(false);
    }
  };

  const handleInstanceToggle = async () => {
    if (!challengeId) {
      setError("Invalid challenge ID.");
      return;
    }

    if (isStartingInstance) {
      // Stop Challenge
      try {
        const response = await ChallengeService.stopChallenge({
          challenge_id: challengeId,
          generatedToken: token.generatedToken,
        });
        if (response?.data.success) {
          setIsStartingInstance(false);
          setRemainingTime(0);
        } else {
          setError("Failed to stop the instance.");
        }
      } catch (error) {
        setError("Error stopping instance.");
        console.error("Error stopping instance:", error);
      }
    } else {
      // Start Challenge
      try {
        const response = await ChallengeService.startChallenge({
          challenge_id: challengeId,
          generatedToken: token.generatedToken,
        });
        if (response?.data.success) {
          setIsStartingInstance(true);
          const timeRemainData = response.data.time_remain;
          if (Array.isArray(timeRemainData) && timeRemainData[0]?.time_remaining != null) {
            setRemainingTime(timeRemainData[0].time_remaining);
          } else {
            setRemainingTime(0); // Fallback if time_remaining is missing
          }
          if (challenge) {
            setChallenge({
              ...challenge,
              connection_info: response.data.connection_info, // Store connection info
            });
          }
        } else {
          setError("Failed to start the instance.");
        }
      } catch (error) {
        setError("Error starting instance.");
        console.error("Error starting instance:", error);
      }
    }
  };


  const handleSubmitFlag = async () => {
    setIsSubmittingFlag(true);
    setSubmissionError(null);
    try {
      const response = await ChallengeService.submitFlag(challengeId, flag);
      if (response?.data.data.status === "correct") {
        alert(`${response.data.data.message}`);
      } else if (response?.data.data.status === "already_solved") {
        alert(`${response.data.data.message}`);
      } else {
        setSubmissionError(response?.data?.data?.message || "Incorrect flag");
        alert(`${response?.data.data.message}`);
      }
    } catch (error) {
      setSubmissionError("Error submitting flag.");
      console.error("Error submitting flag:", error);
    } finally {
      setIsSubmittingFlag(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  function handleHintClick(hint: { id: number; content: string; }): void {
    setSelectedHint(hint)
    console.log(hint.id)
    console.log(hint.content)
  }
  return (
    <Box
      sx={{
        p: 2,
        maxWidth: "100%",
        margin: "auto",
        mx: 2
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 3, border: '2px solid red' }}>
          {error}
        </Alert>
      )}
      {wsMessage && (
        <Alert severity="info" sx={{ mb: 3 }}>
          {wsMessage}  {/* Display WebSocket message */}
        </Alert>
      )}
      <Box sx={{ p: 6, maxWidth: 1500 }}>
        {challenge ? (
          <Grid2 container spacing={4}>
          {/* Challenge Details Section (8 columns) */}
          <Grid2 component="div" size={{ xs: 12, md: 8 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {challenge.name}
            </Typography>
            <Typography variant="h6" color="primary">
              Time Remaining: {remainingTime} seconds
            </Typography>
            <Box 
              display="flex" 
              sx={{ height: '100%' }}
            > 
            <Typography 
            variant="body2" 
            color="text.secondary" 
            mb={2}
            > 
            {challenge.description} 
          </Typography> 
      </Box>
          </Grid2>
        
          {/* Flag Submission Section (4 columns) */}
          <Grid2 component="div" size={{ xs: 12, md: 4 } }>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {challenge?.hints?.map((hint) => (
              <Button
                key={hint.id}
                variant="outlined"
                onClick={() => handleHintClick(hint)}
                sx={{ minWidth: '100px', borderRadius: 1 }}
              >
                Hint {hint.id}
              </Button>
            ))}
          </Box>
          {selectedHint && (
            <Alert severity="info" sx={{ mb: 2 }}>
              {selectedHint.content}
            </Alert>
          )}
            <TextField
              label="Enter Flag"
              variant="outlined"
              fullWidth
              value={flag}
              onChange={(e) => setFlag(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitFlag}
              disabled={isSubmittingFlag || !flag}
              fullWidth
              sx={{ mb: 2 }}
            >
              {isSubmittingFlag ? "Submitting..." : "Submit Flag"}
            </Button>
            {submissionError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {submissionError}
              </Alert>
            )}
            {challenge.require_deploy && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleInstanceToggle}
                fullWidth
                
                sx={{ mt: 3 }}
              >
                {isStartingInstance ? "Stop Challenge" : "Start Instance"}
              </Button>
            )}
          </Grid2>
        </Grid2>
      ) : (
        <Typography variant="h5">Challenge not found</Typography>
      )}
    </Box>
    </Box>
  );
};

export default ChallengeDetailsPage;
