import { ChallengeService } from "@/services/challenges.service";
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
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

      const response = await ChallengeService.startChallenge(
        {
          challenge_id: challengeId,
          generatedToken: token.generatedToken,
        }
      );  //call api start 
      if (response?.data.success) {
        console.log("Instance started:", response.data);
        // Navigate to instance or update state if needed
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
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {challenge ? (
        <>
          <Typography variant="h4" component="h1" gutterBottom>
            {challenge.name}
          </Typography>
          <Typography variant="body1" paragraph>
            {challenge.description}
          </Typography>
          {challenge.require_deploy && (
            <Button
              variant="contained"
              color="secondary"
              onClick={handleStartInstance}
              sx={{ mt: 3 }}
              disabled={isStartingInstance}
            >
              
              {isStartingInstance ? "Starting..." : "Start Instance"}
            </Button>
           
          )}
        </>
      ) : (
        <Typography variant="h5">Challenge not found</Typography>
      )}
    </Box>
  );
};

export default ChallengeDetailsPage;