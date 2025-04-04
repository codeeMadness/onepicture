import { Box } from "@mui/material";

const style = {
  width: "100%",
  height: "80vh",
  border: "none", // Ensure no border
};

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
      <iframe title="Feedback Form" src="https://docs.google.com/forms/d/e/1FAIpQLSeFHTyEVjLTHqiBwNKpFeIZ0jzyjqgTYS6RNr8NFcDo824esQ/viewform?embedded=true" style={style} >Loading...</iframe>
    </Box>
  );
}
