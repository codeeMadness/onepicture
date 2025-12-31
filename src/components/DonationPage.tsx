import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Divider,
  Tooltip,
  IconButton,
} from "@mui/material";
import { AccountBalanceOutlined, LinkedIn } from "@mui/icons-material";

const BMC_URL = "https://www.buymeacoffee.com/1picture";
const PAYPAL_URL = "https://www.paypal.me/1pictureclick";

const DonationPage = () => {

  const handleDonateClick = () => {
    window.open(BMC_URL, "_blank", "noopener,noreferrer");
  };

  const handlePaypalClick = () => {
    window.open(PAYPAL_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: "auto",
        px: 2,
        pt: 3,
        pb: 10, // important for BottomNavigation
      }}
    >
      {/* ================= Header ================= */}
      <Typography variant="h5" fontWeight={600} gutterBottom>
        Support this project 💙
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        If it helps you, consider supporting it so the project can keep running ☕
        Support is always optional — thank you!
      </Typography>

      {/* ================= About Me ================= */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            About me
          </Typography>

          <Typography variant="body2" color="text.secondary">
            I’m an indie developer building this project in my free time.
            Your support helps me maintain and improve it for everyone.
          </Typography>

          <Button
            variant="text"
            size="small"
            startIcon={<LinkedIn />}
            href="https://www.linkedin.com/in/nkmhang/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              textTransform: "none",
              padding: 0,
              minWidth: "auto",
            }}
          >
            My LinkedIn
          </Button>
        </CardContent>
      </Card>

      <Card sx={{ mb: 3, backgroundColor: "action.hover" }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            Supporter perks
          </Typography>

          <Typography variant="body2" color="text.secondary">
            As a small thank you, supporters may occasionally receive:
            <br />
            • Early access to new images or new features
            <br />
            • Priority feedback or feature requests
            <br />
            • A mention or thank-you note (when appropriate)
          </Typography>
        </CardContent>
      </Card>

      {/* ================= Donation ================= */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Make a donation
          </Typography>

          {/* Name input */}
          {/* <TextField
            label="Your name (optional)"
            placeholder="e.g. Alex"
            size="small"
            fullWidth
            value={supporterName}
            onChange={(e) => setSupporterName(e.target.value)}
            sx={{ mb: 1 }}
            InputProps={{
              endAdornment: (
                <Tooltip
                  title="Your name is optional and used only for a thank-you note."
                  arrow
                >
                  <IconButton size="small">
                    <InfoOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              ),
            }}
          /> */}

          <Divider sx={{ my: 2 }} />

          {/* Buy Me a Coffee */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleDonateClick}
            sx={{
              backgroundColor: "#FFDD00",
              color: "#000",
              fontWeight: 600,
              textTransform: "none",
              mb: 2,
              "&:hover": {
                backgroundColor: "#FFD000",
              },
            }}
          >
            ☕ Buy me a coffee
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={handlePaypalClick}
            startIcon={<AccountBalanceOutlined />}
            sx={{
              textTransform: "none",
              fontWeight: 500,
              mb: 2,
            }}
          >
            Donate via PayPal
          </Button>

          {/* MoMo */}
          <Typography
            variant="body2"
            color="text.secondary"
            textAlign="center"
            sx={{ mb: 1 }}
          >
            Or donate via MoMo (🇻🇳)
          </Typography>

          <Box
            component="img"
            src="/MoMoQR.jfif"
            alt="MoMo QR Code"
            sx={{
              width: "100%",
              maxWidth: 260,
              display: "block",
              mx: "auto",
              borderRadius: 2,
            }}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default DonationPage;
