import { Box, Card, CardContent, styled, Typography } from "@mui/material";
import React from "react";
import { FaQuestionCircle } from "react-icons/fa";

interface Prop {
  topicName: string;
  
  questions: number;
  onClick: () => void;
  
}

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  transition: "transform 0.3s, box-shadow 0.3s",
  cursor: "pointer",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
  },
  "&:focus": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: "2px",
  },
}));

const TopicBlockComponent: React.FC<Prop> = ({
  topicName,
  questions,
  onClick,
  
}) => (
  <StyledCard
    onClick={onClick}
    role="button"
    tabIndex={0}
    
    onKeyPress={(e) => e.key === "Enter" && onClick()}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        
        <Typography variant="h6" align="center" gutterBottom>
          {topicName}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <FaQuestionCircle />
          <Typography variant="body2" color="text.secondary">
            {questions} Questions
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </StyledCard>
);

export default TopicBlockComponent;