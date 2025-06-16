import ChallengeBlockComponent from "@/components/ChallengeBlockComponent";
import { IChallenge } from "@/interfaces/challenges";
import { ChallengeService } from "@/services/challenges.service";
import { Box, Checkbox, CircularProgress, FormControlLabel, Grid2, List, ListItem, TextField } from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const ChallengeTopicDetailsPage = () => {
  const { topic } = useParams<{ topic: string }>();
  const [challengeList, setChallengeList] = useState<IChallenge[]>([]);
  const [topicList, setTopicList] = useState<{ topic_id: string; topic_name: string }[]>([]);
  const [isChallengesLoaded, setIsChallengesLoaded] = useState(false);
  const [isTopicsLoaded, setIsTopicsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSolved, setShowSolved] = useState(false);
  const [selectedType, setSelectedType] = useState("All");

  
  // Fetch topics
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await ChallengeService.getChallengeTopics();
        setTopicList(response?.data?.data || []);
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
        setChallengeList(response?.data?.data || []);
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
  
  <Grid2 
    sx={{ 
      py: 2, 
      backgroundColor: "#55b3ed", 
      zIndex: 0, 
      flexBasis: '20%', 
      height: "100%" 
    }}
  >
    {/* Search and Filter Options */}
  <Box sx={{ width: "90%", mb: 2 }}>
    <TextField
      label="Search"
      variant="outlined"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={showSolved}
          onChange={(e) => setShowSolved(e.target.checked)}
          color="primary"
        />
      }
      label="Show Solved"
    />
    <FormControlLabel
      control={
        <Checkbox
          checked={selectedType === "ALL"}
          onChange={() => setSelectedType(selectedType === "ALL" ? "SPECIFIC_TYPE" : "ALL")}
          color="primary"
        />
      }
      label="Filter by Type"
    />
  </Box>
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
              <HashLink to={`/challenges/${topic.topic_name}`} style={{ fontSize: "1rem" }}>
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

  <Grid2 sx={{ p: 2 , flexBasis: '80%'}}>
  {isChallengesLoaded ? (
    <Grid2 container spacing={3} sx={{mr: 1}}>
      {challengeList.map((challenge) => (
        <Grid2 component="div" size={{ xs: 12, sm: 6, md: 4 }}   key={challenge.id}>
          <ChallengeBlockComponent challengeInfo={challenge}>
            
          </ChallengeBlockComponent>
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