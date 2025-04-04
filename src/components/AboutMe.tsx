import { Box, Typography } from "@mui/material";

export default function AboutMe() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Box className="avatar-container" sx={{ marginBottom: "20px" }}>
        <img
          src="https://raw.githubusercontent.com/codeeMadness/onepicture/refs/heads/main/assets/my_avatar.jpg"
          alt="Avatar"
          className="avatar"
          style={{ borderRadius: "50%", width: "150px", height: "150px" }}
        />
      </Box>
      <Box className="info-content" sx={{ textAlign: "center" }}>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          Hello! I'm Hang, a software engineer at{" "}
          <a href="https://www.axonactive.com/">Axon Active</a>
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          And I love technical and doodles...
        </Typography>
        {/* <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          If you find my doodles really much useful to you, kindly support me
          sometimes :)
        </Typography> */}
        <Typography variant="body1" sx={{ marginBottom: "10px" }}>
          <i className="fab fa-linkedin"></i>{" "}
          <a href="https://www.linkedin.com/in/nkmhang/">
            See my LinkedIn profile
          </a>
        </Typography>
        <Box className="additional-links" sx={{ marginTop: "20px" }}>
          {/* <img
            src="https://raw.githubusercontent.com/codeeMadness/onepicture/refs/heads/main/assets/momo_qr.jpg"
            alt="QR Code"
            className="qr-code"
            style={{ width: "100px", marginRight: "10px" }}
          />
          <img
            src="https://raw.githubusercontent.com/codeeMadness/onepicture/refs/heads/main/assets/vcb_qr.jpg"
            alt="QR Code"
            className="qr-code"
            style={{ width: "100px" }}
          /> */}
          <blockquote
            style={{ width: "auto", margin: "2%" }}
            className="tiktok-embed"
            cite="https://www.tiktok.com/@codee.madness"
            data-unique-id="codee.madness"
            data-embed-type="creator"
          >
            <section>
              <a
                target="_blank" rel="noreferrer"
                href="https://www.tiktok.com/@codee.madness?refer=creator_embed"
              >
                @codee.madness
              </a>
            </section>
          </blockquote>
          <script async src="https://www.tiktok.com/embed.js"></script>
        </Box>
      </Box>
    </Box>
  );
}