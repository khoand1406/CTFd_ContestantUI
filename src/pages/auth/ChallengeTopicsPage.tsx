import TopicBlockComponent from "@/components/TopicBlockComponent";
import { API_R_200 } from "@/constants/res-codes";
import { ROUTE_CHALLENGES } from "@/constants/routes";
import { ChallengeService } from "@/services/challenges.service";
import {
  Box,
  CircularProgress,
  Fade,
  Grid2,
  Slide,
  Typography,
} from "@mui/material";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

const ChallengeTopicsPage = () => {
  const topics = ["forensics", "crypto", "pwn"];
  const { t } = useTranslation();

  const [isTopicsLoaded, setTopicsLoaded] = useState<boolean>(false);

  const onGetChallengeTopics = async () => {
    const response =
      (await ChallengeService.getChallengeTopics()) as AxiosResponse;

    if (response.status === API_R_200) {
      console.log("ok");
    } else {
      console.log("fail");
    }
  };

  setTimeout(() => {
    setTopicsLoaded(true);
  }, 500);

  return (
    <Box>
      <Typography align="center" variant="h2" sx={{ m: 2, fontWeight: "bold" }}>
        {t("challengeTopics.title")}
      </Typography>
      {isTopicsLoaded ? (
        <Slide direction="up" in={true} timeout={1000}>
          <div>
            <Fade in={true} timeout={1500}>
              <Box sx={{ p: 4, zIndex: 0 }}>
                <Grid2 container spacing={2}>
                  {topics.map((t) => {
                    return (
                      <Grid2
                        component={RouterLink}
                        to={`${ROUTE_CHALLENGES}/${t}`}
                        size={{ sm: 12, md: 4 }}
                      >
                        <TopicBlockComponent topicName={t} />
                      </Grid2>
                    );
                  })}
                </Grid2>
              </Box>
            </Fade>
          </div>
        </Slide>
      ) : (
        <Box display="flex" sx={{ my: 4 }} justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Box>
  );
};

export default ChallengeTopicsPage;
