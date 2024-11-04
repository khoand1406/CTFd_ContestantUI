import { IChallenge } from "@/interfaces/challenges";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { ChallengeService } from "@/services/challenges.service";
import { useTranslation } from "react-i18next";

interface Prop {
  challengeInfo: IChallenge;
}

const ChallengeBlockComponent: React.FC<Prop> = (props) => {
  const { t } = useTranslation();
  const [submission, setSubmission] = useState("");

  return (
    <Box>
      <Card sx={{ m: 4, p: 2 }}>
        <CardContent>
          <Grid2 container>
            <Grid2 size={{ md: 6 }}>
              <Typography
                id={`${props.challengeInfo.id}-${props.challengeInfo.name}`}
                variant="h3"
              >
                {props.challengeInfo.name}
              </Typography>
              <Typography variant="h5">
                {props.challengeInfo.message}
              </Typography>
            </Grid2>
            <Grid2 size={{ md: 6 }}>
              <Button
                color="primary"
                variant="contained"
                onClick={() => { ChallengeService.startChallenge({ challenge_id: props.challengeInfo.id, team_id: 1 }) }}
              >
                {t("challengeTopicDetails.startChallenge")}
              </Button>
            </Grid2>
          </Grid2>
          <Box>
            <TextField
              placeholder={t("challengeTopicDetails.enterFlag")}
              value={submission}
              onChange={(e) => setSubmission(e.target.value)} // Cập nhật state khi người dùng nhập
            />
            <Button variant="contained" color="success" sx={{ ml: 2 }}
              onClick={() => { ChallengeService.submitChallengeFlag({ challenge_id: props.challengeInfo.id, submission: submission }) }}
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
