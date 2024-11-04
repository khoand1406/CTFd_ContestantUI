import TopicBlockComponent from "@/components/TopicBlockComponent";
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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

const ChallengeTopicsPage = () => {
  const [topics, setTopics] = useState<{ topic_name: string }[]>([]);
  const { t } = useTranslation();
  const [isTopicsLoaded, setTopicsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await ChallengeService.getChallengeTopics();
        if (response?.data.success && Array.isArray(response.data.data)) {
          setTopics(response.data.data);
        } else {
          setTopics([]);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
        setTopics([]);
      } finally {
        setTopicsLoaded(true);
      }
    };

    fetchTopics();
  }, []);

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
                  {topics.map((topic) => (
                    <Grid2
                      key={topic.topic_name}
                      component={RouterLink}
                      to={`${ROUTE_CHALLENGES}/${topic.topic_name}`}
                      size={{ sm: 12, md: 4 }}
                    >
                      <TopicBlockComponent topicName={topic.topic_name} />
                    </Grid2>
                  ))}
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