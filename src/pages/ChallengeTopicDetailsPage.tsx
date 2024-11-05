import ChallengeBlockComponent from "@/components/ChallengeBlockComponent";
import { IChallenge } from "@/interfaces/challenges";
import { ChallengeService } from "@/services/challenges.service";
import { Box, CircularProgress, Grid as Grid2, List, ListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";


const ChallengeTopicDetailsPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const { t } = useTranslation();

  const [challengeList, setChallengeList] = useState<Array<IChallenge>>([]);
  const [topicList, setTopicList] = useState<{ topic_id: string; topic_name: string }[]>([]);
  const [isChallengesLoaded, setIsChallengesLoaded] = useState(false);
  const [isTopicsLoaded, setIsTopicsLoaded] = useState(false);
  

  // Fetch topics
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await ChallengeService.getChallengeTopics();
        if (response?.data.success && Array.isArray(response.data.data)) {
          setTopicList(response.data.data);
        } else {
          setTopicList([]);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      } finally {
        setIsTopicsLoaded(true);
      }
    };
    fetchTopics();
  }, []);

  // Fetch challenges by category
  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setIsChallengesLoaded(false);
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
      <Grid2 container sx={{ height: "100%", width: "100%" }}>
        
       
        <Grid2 item sx={{ py: 2, backgroundColor: "#55b3ed", zIndex: 0, width: 300, height: "100%" }}>
          <List sx={{ listStyleType: "disc", textAlign: "center" }}>
            {isTopicsLoaded ? (
              topicList.map((topic) => (
                <ListItem key={topic.topic_id} sx={{ justifyContent: "center" }}>
                  <Box
                    sx={{
                      width: "100%",
                      p: 1,
                      borderRadius: 1,
                      transition: "background-color 0.3s ease",
                      "&:hover": { backgroundColor: "#FF5733" },
                    }}
                  >
                    <HashLink to={`#${topic.topic_id}-${topic.topic_name}`} style={{ fontSize: "1rem" }}>
                      {topic.topic_name}
                    </HashLink>
                  </Box>
                </ListItem>
              ))
            ) : (
              <Box display="flex" sx={{ my: 4 }} justifyContent="center">
                <CircularProgress />
              </Box>
            )}
          </List>
        </Grid2>

       
        <Grid2 item xs sx={{ p: 2 }}>
          {isChallengesLoaded ? (
            <Grid2 container spacing={3}>
              {challengeList.map((chal) => (
                <Grid2 item xs={12} sm={6} md={4} key={chal.id}>
                  <ChallengeBlockComponent challengeInfo={chal} />
                </Grid2>
              ))}
            </Grid2>
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