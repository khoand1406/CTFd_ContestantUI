import { IChallenge } from "@/interfaces/challenges";

import {
  Box,
  Card,
  CardContent,
  styled,
  Typography
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { FaTrophy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Prop {
  challengeInfo: IChallenge;
}

const ChallengeBlockComponent: React.FC<Prop> = ({ challengeInfo }) => {
  useTranslation();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/challenge/${challengeInfo.id}`);
  };
  
  
  const StyledCard = styled(Card)(({}) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
    }
  }));

  return (
    <StyledCard onClick={() => handleViewDetails()} sx={{ width: '100%' }}>
    <CardContent>
      <Box display="flex" alignItems="center" mb={2}>
        <FaTrophy style={{ marginRight: 8, color: "#FFD700" }} />
        <Typography variant="h6" component="h2">
          {challengeInfo.name}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" mb={2}>
        {challengeInfo.description}
      </Typography>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" color="primary">
          {challengeInfo.type} | {challengeInfo.value} pts
        </Typography>
      </Box>
    </CardContent>
  </StyledCard>
  );
};

export default ChallengeBlockComponent;