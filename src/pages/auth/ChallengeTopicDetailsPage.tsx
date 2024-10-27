import ChallengeBlockComponent from "@/components/ChallengeBlockComponent";
import { API_R_200 } from "@/constants/res-codes";
import { ROUTE_CHALLENGES } from "@/constants/routes";
import { IChallenge } from "@/interfaces/challenges";
import { ChallengeService } from "@/services/challenges.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  CircularProgress,
  Grid2,
  IconButton,
  List,
  ListItem,
  Slide,
  Typography,
} from "@mui/material";
import { AxiosResponse } from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const ChallengeTopicDetailsPage = () => {
  const { topic } = useParams();
  const { t } = useTranslation();

  const [isChallengesLoaded, setChallengesLoaded] = useState<boolean>(false);

  setTimeout(() => {
    setChallengesLoaded(true);
  }, 500);

  const challengeList: Array<IChallenge> = [
    {
      id: 1,
      name: "bruh",
      category: "crypto",
      message: "hi",
      connectionInfo: "lmao",
      value: 3,
      maxAttempts: 1,
      isDeployed: false,
    },
    {
      id: 2,
      name: "bruh",
      category: "crypto",
      message: "hi",
      connectionInfo: "lmao",
      value: 3,
      maxAttempts: 1,
      isDeployed: false,
    },
    {
      id: 3,
      name: "bruh",
      category: "crypto",
      message: "hi",
      connectionInfo: "lmao",
      value: 3,
      maxAttempts: 1,
      isDeployed: false,
    },
    {
      id: 4,
      name: "bruh",
      category: "crypto",
      message: "hi",
      connectionInfo: "lmao",
      value: 3,
      maxAttempts: 1,
      isDeployed: false,
    },
  ];

  const onGetChallengeListOfTopic = async () => {
    const response = (await ChallengeService.getChallengeListOfTopic({
      topic: topic as string,
    })) as AxiosResponse;

    if (response.status === API_R_200) {
      console.log("ok");
    } else {
      console.log("fail");
    }
  };

  return (
    <Box sx={{ height: "90vh" }}>
      <Grid2 container sx={{ height: "100%" }}>
        <Slide in={true} timeout={500} direction="right" mountOnEnter>
          <Grid2
            sx={{
              display: "flex",
              flexDirection: "column",
              p: 2,
              backgroundColor: "#27b898",
              zIndex: 1,
            }}
            size={{ sm: 12, md: 1 }}
            justifyContent="start"
          >
            <Box sx={{ textAlign: "center" }}>
              <IconButton
                sx={{ width: 50, height: 50 }}
                component={RouterLink}
                to={ROUTE_CHALLENGES}
              >
                <FontAwesomeIcon icon="arrow-left" />
              </IconButton>
            </Box>

            <Typography
              variant="h3"
              sx={{
                my: 3,
                textOrientation: "sideways",
                writingMode: "vertical-lr",
                alignContent: "center",
              }}
            >
              {topic}
            </Typography>
          </Grid2>
        </Slide>
        <Slide in={true} direction="right" timeout={500} mountOnEnter>
          <Grid2
            sx={{ py: 2, backgroundColor: "#55b3ed", zIndex: 0 }}
            size={{ sm: 12, md: 3 }}
          >
            <List sx={{ listStyleType: "disc" }}>
              {isChallengesLoaded ? (
                challengeList.map((chal) => {
                  return (
                    <ListItem sx={{ display: "list-item" }}>
                      <HashLink to={`#${chal.id}-${chal.name}`}>
                        {chal.name}
                      </HashLink>
                    </ListItem>
                  );
                })
              ) : (
                <Box display="flex" sx={{ my: 4 }} justifyContent="center">
                  <CircularProgress />
                </Box>
              )}
            </List>
          </Grid2>
        </Slide>
        <Grid2 size={{ sm: 12, md: 8 }}>
          {isChallengesLoaded ? (
            challengeList.map((chal) => {
              return <ChallengeBlockComponent challengeInfo={chal} />;
            })
          ) : (
            <Box display="flex" sx={{ my: 4 }} justifyContent="center">
              <CircularProgress />
            </Box>
          )}
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default ChallengeTopicDetailsPage;
