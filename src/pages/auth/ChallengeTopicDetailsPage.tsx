import React from "react";
import { useParams } from "react-router-dom";

const ChallengeTopicDetailsPage = () => {
  const { topic } = useParams();

  return <div>The topic is: {topic}</div>;
};

export default ChallengeTopicDetailsPage;
