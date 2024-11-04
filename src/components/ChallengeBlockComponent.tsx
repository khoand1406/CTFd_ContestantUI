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
import io from 'socket.io-client';
import { StorageUtils } from "@/utils/storage.utils";
import { KEY_USERINFO } from "@/constants/storage-keys";


interface Prop {
  challengeInfo: IChallenge;
}

const ChallengeBlockComponent: React.FC<Prop> = (props) => {
  const { t } = useTranslation();
  const [submission, setSubmission] = useState<string>("");
  const [challengeDescription, setChallengeDescription] = useState<string>(props.challengeInfo.description);

  const handleStartChallenge = async () => {
    const tokenString = StorageUtils.getItem(KEY_USERINFO, "local") as string;
    const token = JSON.parse(tokenString);
    const teamId = token.user.team_id

    try {
      const response = await ChallengeService.startChallenge({
        challenge_id: props.challengeInfo.id,
        team_id: teamId,
      });
      if (response?.data?.success && response.data.challenge?.description) {
        setChallengeDescription(response.data.challenge.description);
      }
    } catch (error) {
      console.error("Error starting challenge:", error);
    }
  };

  useEffect(() => {
    const socket = io('http://127.0.0.1:4000');

    socket.on('connect', () => {
      console.log('Connected to the server!');
    });
    socket.emit('join_teams', { user_id: '123' });
    socket.on('time_up', () => {
      console.log('Time is up! Submitting exam...');
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Box>
      <Card sx={{ m: 4, p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <Typography
                id={`${props.challengeInfo.id}-${props.challengeInfo.name}`}
                variant="h3"
              >
                {props.challengeInfo.name}
              </Typography>
              <Typography variant="h5">
                {challengeDescription}
              </Typography>
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
              onClick={() => ChallengeService.submitChallengeFlag({ challenge_id: props.challengeInfo.id, submission })}
            >
              {t("challengeTopicDetails.submit")}
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Divider variant="middle" />
    </Box>
  );
};

export default ChallengeBlockComponent;
