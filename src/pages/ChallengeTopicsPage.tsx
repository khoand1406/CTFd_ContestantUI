import TopicBlockComponent from "@/components/TopicBlockComponent";

import { ChallengeService } from "@/services/challenges.service";
import {
  Box,
  CircularProgress,
  Fade,
  Grid2,
  Grow,
  Slide,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ChallengeTopicsPage = () => {
  const [topics, setTopics] = useState<{ topic_name: string; challenge_count: number }[]>([]);
  const { t } = useTranslation();
  const [isTopicsLoaded, setTopicsLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

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

  

  function handleTopicClick(topic: { topic_name: string; }): void {
    navigate(`/challenges/${topic.topic_name}`);
  }

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
              <Grid2 container spacing={3}>
                {topics.map((topic) => (
                <Grow key={topic.topic_name} in={true} timeout={300}>
                  <Grid2 component="div" size= {{xs: 12, sm: 6, md: 4, lg: 3}} >
                    <TopicBlockComponent
                      topicName={topic.topic_name}
                        
                        questions={topic.challenge_count}
                        onClick={() => handleTopicClick(topic)}
                        
                    />
                  </Grid2>
                </Grow>
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