import { IChallenge } from "@/interfaces/challenges";
import { ChallengeService } from "@/services/challenges.service";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid2,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

interface Prop {
  challengeInfo: IChallenge;
}

const ChallengeBlockComponent: React.FC<Prop> = ({ challengeInfo }) => {
  const { t } = useTranslation();
  const { topic } = useParams<{ topic: string }>();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/challenge/${challengeInfo.id}`);
  };
  
  const [challengeList, setChallengeList] = useState<Array<IChallenge>>([]);
   const [isChallengesLoaded, setIsChallengesLoaded] = useState<boolean>(true);
  const [isChallengeStarted, setIsChallengeStarted] = useState(false);
  const [timer, setTimer] = useState(600); 

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

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isChallengeStarted && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isChallengeStarted, timer]);

 
  return (
    <Box sx={{ p: 2 }}>
      <Card sx={{ mx: 4, my: 2, p: 3, borderRadius: 2, boxShadow: 3 }}>
        <CardContent>
          <Grid2 container spacing={3}>
            <Grid2 item xs={12} md={6}>
              <Typography
                id={`${challengeInfo.id}-${challengeInfo.name}`}
                variant="h4"
                sx={{ mb: 2 }}
              >
                {challengeInfo.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, color: "text.secondary" }}>
                {challengeInfo.requirements}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Time Limit: {challengeInfo.time_limit}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
               
                <Button
                  color="secondary"
                  variant="contained"
                  fullWidth
                  sx={{ py: 1 }}
                  onClick={handleViewDetails}
                >
                  {t("challengeTopicDetails.detail")}
                </Button>
              </Box>
            </Grid2>
          </Grid2>
        </CardContent>
      </Card>
      <Divider sx={{ my: 4 }} />
    </Box>
  );
};

export default ChallengeBlockComponent;