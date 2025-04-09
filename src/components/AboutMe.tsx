import { LinkedIn, MusicNote, YouTube } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

export default function AboutMe() {
  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        padding: "10%",
      }}
    >
      <Box className="avatar-container">
        <img
          src="https://raw.githubusercontent.com/codeeMadness/onepicture/refs/heads/main/assets/4p_avatar.jpg"
          alt="Avatar"
          className="avatar"
          style={{ borderRadius: "10%", width: "15vw", height: "32vh" }}
        />
      </Box>
      <Box
        className="info-content"
        sx={{ padding: "1rem" }}
      >
        <Typography variant="body1">
          Hello! I'm Hang, a software engineer at{" "}
          <a href="https://www.axonactive.com/">Axon Active</a>
        </Typography>
        <Typography variant="body1">
          And I love technical and doodles...
        </Typography>
        <Box
          display="flex"
          flexDirection="row" // Horizontal for small screens, vertical for large
          gap="1rem" // Adds space between buttons
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

        <Box className="additional-links" alignItems="center">
          <Typography variant="body1">
            If you find my doodles really much useful to you, kindly support me
            sometimes :)
          </Typography>
          <img
            src="https://raw.githubusercontent.com/codeeMadness/onepicture/refs/heads/main/assets/momo_qr.jpg"
            alt="QR Code"
            className="qr-code"
            style={{ borderRadius: "10%", width: "10vw", height: "15vh" }}
          />
          {/* <img
            src="https://raw.githubusercontent.com/codeeMadness/onepicture/refs/heads/main/assets/vcb_qr.jpg"
            alt="QR Code"
            className="qr-code"
            style={{ borderRadius: "10%", width: "10vw", height: "25vh" }}
          /> */}
        </Box>
      </Box>
    </Box>
  );
}
