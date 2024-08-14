import { Card, Typography, Stack } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

function Success() {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh" }} // يضمن أن الكارت يكون في منتصف الصفحة
    >
      <Card
        sx={{
          padding: "2rem",
          textAlign: "center",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: "1rem" }}>
          Thank You
        </Typography>
        <ThumbUpIcon sx={{ fontSize: "4rem", color: "#28a745 ", marginBottom: "1rem" }} />
        <Typography variant="h6">Your action was successful.</Typography>
      </Card>
    </Stack>
  );
}

export default Success;
