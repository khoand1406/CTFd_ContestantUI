import { IChallenge } from "@/interfaces/challenges";
import { ChallengeService } from "@/services/challenges.service";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

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
  const { topic } = useParams<{ topic: string }>();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/challenge/${challengeInfo.id}`);
  };
  
  const [challengeList, setChallengeList] = useState<Array<IChallenge>>([]);
  const [isChallengesLoaded, setIsChallengesLoaded] = useState<boolean>(true);
  const [isChallengeStarted, setIsChallengeStarted] = useState(false);
  const [timer, setTimer] = useState(600); 

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await ChallengeService.listChallengesByCategory({ category: topic || '' });

        if (response?.data.success && Array.isArray(response.data.data)) {
          setChallengeList(response.data.data);
        } else {
          setChallengeList([]);
        }
      } catch (error) {
        console.error('Error fetching challenges:', error);
        setChallengeList([]);
        
      } finally {
        setIsChallengesLoaded(true);
      }
    };
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
    fetchChallenges();
  }, [topic]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isChallengeStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isChallengeStarted, timer]);

 
  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ mx: 4, my: 2, p: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography
                id={`${challengeInfo.id}-${challengeInfo.name}`}
                variant="h4"
                sx={{ mb: 2 }}
              >
                {challengeInfo.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
                {challengeInfo.requirements}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Time Limit: {challengeInfo.time_limit}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
               
                <Button
                  color="secondary"
                  variant="contained"
                  fullWidth
                  sx={{ py: 1 }}
                  onClick={handleViewDetails}
                >
                  {t("challengeTopicDetails.detail")}
                </Button>
              </Box>
            </Grid>
          </Grid>
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
      <Divider sx={{ my: 4 }} />
    </Box>
  );
};

export default ChallengeBlockComponent;