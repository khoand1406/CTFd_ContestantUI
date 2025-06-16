import {
  ReactECharts,
  ReactEChartsProps,
} from "@/components/charts/ReactEChartsComponent";
import { Box, Typography } from "@mui/material";

import { useTranslation } from "react-i18next";

const ScoreboardPage = () => {
  const { t } = useTranslation();

  const option: ReactEChartsProps["option"] = {
    dataset: {
      source: [
        ["Commodity", "Owned", "Financed"],
        ["Commodity 1", 4, 1],
        ["Commodity 2", 2, 4],
        ["Commodity 3", 3, 6],
        ["Commodity 4", 5, 3],
      ],
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Owned", "Financed"],
    },
    grid: {
      left: "10%",
      right: "0%",
      top: "20%",
      bottom: "20%",
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
    },
    series: [
      {
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
      },
      {
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
      },
    ],
  };
  return (
    <Box>
      <Typography align="center" variant="h2" sx={{ m: 2, fontWeight: "bold" }}>
        {t("scoreboard.title")}
      </Typography>
      <ReactECharts option={option} />
    </Box>
  );
};

export default ScoreboardPage;
