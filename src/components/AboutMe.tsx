import { LinkedIn, MusicNote, YouTube } from "@mui/icons-material";
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material";

export default function AboutMe() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        padding: isSmallScreen ? "5%" : "10%",
        gap: isSmallScreen ? "2rem" : "0",
      }}
    >
      <Box
        className="info-content"
        sx={{
          padding: isSmallScreen ? "0.5rem" : "1rem",
          textAlign: isSmallScreen ? "center" : "left",
        }}
      >
        <Typography variant="body1">
          Hello! I'm Hang, a software engineer at{" "}
          <a href="https://www.axonactive.com/">Axon Active</a>
        </Typography>
        <Typography variant="body1">
          And I love both technical and doodles...
        </Typography>
        <Box
          display="flex"
          flexDirection={isSmallScreen ? "column" : "row"}
          gap="1rem"
          justifyContent="center"
        >
          <Button
            variant="outlined"
            startIcon={<LinkedIn />}
            onClick={() =>
              window.open("https://www.linkedin.com/in/nkmhang/", "_blank")
            }
          >
            My LinkedIn
          </Button>

          <Button
            color="error"
            variant="outlined"
            startIcon={<YouTube />}
            onClick={() =>
              window.open("https://www.youtube.com/@codee.madness", "_blank")
            }
          >
            My Youtube
          </Button>

          <Button
            color="inherit"
            variant="outlined"
            startIcon={<MusicNote />}
            onClick={() =>
              window.open("https://www.tiktok.com/@codee.madness", "_blank")
            }
          >
            My Tiktok
          </Button>
        </Box>

        {/* <Box
          className="additional-links"
          sx={{
            alignItems: "center",
            marginTop: "1rem",
            textAlign: isSmallScreen ? "center" : "left",
          }}
        >
          <Typography variant="body1">
            If you find my doodles really much useful to you, kindly support me
            sometimes :)
          </Typography>
          <img
            src="https://raw.githubusercontent.com/codeeMadness/onepicture/refs/heads/main/assets/momo_qr.jpg"
            alt="QR Code"
            className="qr-code"
            style={{
              borderRadius: "10%",
              width: isSmallScreen ? "30vw" : "10vw",
              height: isSmallScreen ? "auto" : "15vh",
            }}
          />
        </Box> */}
      </Box>
    </Box>
  );
}