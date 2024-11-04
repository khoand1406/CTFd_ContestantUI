import { IChallenge } from "@/interfaces/challenges";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { ChallengeService } from "@/services/challenges.service";
import { useTranslation } from "react-i18next";
import io from "socket.io-client";
import { StorageUtils } from "@/utils/storage.utils";
import { KEY_USERINFO } from "@/constants/storage-keys";

interface Prop {
  challengeInfo: IChallenge;
}

const ChallengeBlockComponent: React.FC<Prop> = ({ challengeInfo }) => {
  const { t } = useTranslation();
  const [submission, setSubmission] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [challengeDescription, setChallengeDescription] = useState<string>(challengeInfo.description);
  const tokenString = StorageUtils.getItem(KEY_USERINFO, "local") as string;
  const token = JSON.parse(tokenString);

  const handleStartChallenge = async () => {
    try {
      const response = await ChallengeService.startChallenge({
        challenge_id: challengeInfo.id,
        generatedToken: token.generatedToken,
      });

      if (response?.data?.success && response.data.challenge?.description) {
        setChallengeDescription(response.data.challenge.description);
        setMessage("Challenge started!");
      }
    } catch (error) {
      console.error("Error starting challenge:", error);
      setMessage("Error starting challenge. Please try again.");
    }
  };

  const handleSubmitChallenge = async () => {
    try {
      const response = await ChallengeService.submitChallengeFlag({
        challenge_id: challengeInfo.id,
        submission,
      });
      if (response?.data?.success) {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting challenge:", error);
      setMessage("Submission failed. Please check your input.");
    }
  };

  return (
    <Box>
      <Card sx={{ m: 4, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography variant="h3" id={`${challengeInfo.id}-${challengeInfo.name}`}>
                {challengeInfo.name}
              </Typography>
              <Typography variant="h5">{challengeDescription}</Typography>
            </Grid>
            <Grid item md={6}>
              <Button
                color="primary"
                variant="contained"
                onClick={handleStartChallenge}
              >
                {t("challengeTopicDetails.startChallenge")}
              </Button>

            </Grid>
          </Grid>
          <Box mt={2}>
            <TextField
              placeholder={t("challengeTopicDetails.enterFlag")}
              value={submission}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubmission(e.target.value)}
            />
            <Button
              variant="contained"
              color="success"
              sx={{ ml: 2 }}
              onClick={handleSubmitChallenge}
            >
              {t("challengeTopicDetails.submit")}
            </Button>
          </Box>
          {message && (
            <Typography mt={2} color={status === "success" ? "green" : "red"}>
              {message}
            </Typography>
          )}
        </CardContent>
      </Card>
      <Divider variant="middle" />
    </Box>
  );
};

export default ChallengeBlockComponent;
