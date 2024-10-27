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
import React from "react";
import { useTranslation } from "react-i18next";

interface Prop {
  challengeInfo: IChallenge;
}

const ChallengeBlockComponent: React.FC<Prop> = (props) => {
  const { t } = useTranslation();
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
              <Button color="primary" variant="contained">
                {t("challengeTopicDetails.startChallenge")}
              </Button>
            </Grid2>
          </Grid2>
          <Box>
            <TextField placeholder={t("challengeTopicDetails.enterFlag")} />
            <Button variant="contained" color="success" sx={{ ml: 2 }}>
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
