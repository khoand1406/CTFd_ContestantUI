import { Card, Typography } from "@mui/material";
import React from "react";

interface Prop {
  topicName: string;
}

const TopicBlockComponent: React.FC<Prop> = (prop) => {
  return (
    <Card sx={{ p: 4 }}>
      <Typography variant="h4">{prop.topicName}</Typography>
    </Card>
  );
};

export default TopicBlockComponent;
