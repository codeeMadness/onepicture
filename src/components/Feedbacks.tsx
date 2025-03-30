import { Box, Typography } from "@mui/material";

export default function Feedbacks() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
      }}
    >
      <Typography>This is Feedback Page!</Typography>
    </Box>
  );
}
