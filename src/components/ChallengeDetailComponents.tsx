import { ChallengeService } from "@/services/challenges.service";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { IChallenge } from "@/interfaces/challenges";
import { useNavigate, useParams } from "react-router-dom";
import { StorageUtils } from "@/utils/storage.utils";
import { KEY_USERINFO } from "@/constants/storage-keys";

const ChallengeDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const challengeId = id ? parseInt(id, 10) : undefined;
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState<IChallenge | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStartingInstance, setIsStartingInstance] = useState(false);
  const tokenString = StorageUtils.getItem(KEY_USERINFO, "local") as string;
  const token = JSON.parse(tokenString);

  const [flag, setFlag] = useState("");
  const [isSubmittingFlag, setIsSubmittingFlag] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
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

  return (
    <Box sx={{ p: 4, maxWidth: 600, margin: "auto" }}>
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
      {challenge ? (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            {challenge.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {challenge.description + "         " + challenge.connection_info || ""}
          </Typography>
          {challenge.require_deploy && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartInstance}
              sx={{ mt: 3 }}
              disabled={isStartingInstance}
            >
              {isStartingInstance ? "Starting..." : "Start Challenge"}
            </Button>
          )}

          {/* Flag Submission Section */}
          <Box sx={{ mt: 4 }}>
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
            >
              {isSubmittingFlag ? "Submitting..." : "Submit Flag"}
            </Button>
            {submissionError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {submissionError}
              </Alert>
            )}
          </Box>
        </>
      ) : (
        <Typography variant="h5">Challenge not found</Typography>
      )}
    </Box>
  );
};

export default ChallengeDetailsPage;
