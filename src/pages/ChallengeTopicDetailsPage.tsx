import ChallengeBlockComponent from "@/components/ChallengeBlockComponent";
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
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link as RouterLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const ChallengeTopicDetailsPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const { t } = useTranslation();
  const [challengeList, setChallengeList] = useState<Array<IChallenge>>([]);
  const [isChallengesLoaded, setIsChallengesLoaded] = useState<boolean>(true);

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

    fetchChallenges();
  }, [topic]);

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
                challengeList.map((chal) => (
                  <ListItem key={chal.id} sx={{ display: "list-item" }}>
                    <HashLink to={`#${chal.id}-${chal.name}`}>
                      {chal.name}
                    </HashLink>
                  </ListItem>
                ))
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
            challengeList.map((chal) => (
              <ChallengeBlockComponent key={chal.id} challengeInfo={chal} />
            ))
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