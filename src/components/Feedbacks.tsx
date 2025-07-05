import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Feedbacks() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm")); // Check if the screen size is small

  const style = {
    width: "100%",
    height: isSmallScreen ? "60vh" : "80vh", // Adjust height for small screens
    border: "none", // Ensure no border
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        padding: isSmallScreen ? "16px" : "0", // Add padding for small screens
      }}
    >
      <iframe
        title="Feedback Form"
        src="https://docs.google.com/forms/d/e/1FAIpQLSeFHTyEVjLTHqiBwNKpFeIZ0jzyjqgTYS6RNr8NFcDo824esQ/viewform?embedded=true"
        style={style}
      >
        Loading...
      </iframe>
    </Box>
  );
}