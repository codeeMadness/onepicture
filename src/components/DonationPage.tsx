import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button, FormControlLabel, Checkbox, Tooltip } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const BMC_URL = "https://www.buymeacoffee.com/1picture";

const DonationPage: React.FC = () => {
  const navigate = useNavigate();
  const [linkAccount, setLinkAccount] = useState(false);

  const handleDonateClick = () => {
    if (linkAccount) {
      navigate("/signin", {
        state: { from: "donate" },
      });
    } else {
      window.open(BMC_URL, "_blank", "noopener,noreferrer");
    }
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state?.autoDonate) {
      window.open(BMC_URL, "_blank", "noopener,noreferrer");
    }
  }, [location.state]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 420,
          width: "100%",
          borderRadius: 3,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Typography variant="h5" fontWeight={600} gutterBottom>
            Support This Project
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            This project is developed and maintained by an independent creator.
            If you find it useful, you can support it to help cover server costs
            and future development. All support is completely optional and
            voluntary.
          </Typography>

          {/* Buy Me a Coffee Button */}
          <Box sx={{ mb: 3 }}>
            <Button
              onClick={handleDonateClick}
              sx={{
                backgroundColor: "#FFDD00",
                color: "#000",
                fontWeight: 600,
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                py: 1.2,
                "&:hover": {
                  backgroundColor: "#F2D200",
                },
              }}
            >
              ☕ Buy me a coffee
            </Button>
          </Box>

          {/* Optional link donation to account */}
          <Box sx={{ mb: 3 }}>
            <Tooltip
              title="If checked, you can sign in to associate this donation with your account (e.g. supporter badge)."
              placement="top"
            >
              <FormControlLabel
                control={<Checkbox
                  size="small"
                  checked={linkAccount}
                  onChange={(e) => setLinkAccount(e.target.checked)}
                />}
                label={
                  <Typography variant="caption" color="text.secondary">
                    I want to link this support to my account (optional)
                  </Typography>
                }
              />
            </Tooltip>
          </Box>

          {/* Momo QR (Vietnam users) */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ mb: 1 }}
            >
              🇻🇳 Support via Momo (Vietnam)
            </Typography>
            <Box
              component="img"
              src="/MoMoQR.jfif"
              alt="Momo QR Code"
              sx={{
                width: 180,
                height: 180,
                mx: "auto",
                borderRadius: 2,
                border: "1px solid",
                borderColor: "divider",
              }}
            />
            <Typography
              variant="caption"
              color="text.secondary"
              display="block"
              sx={{ mt: 1 }}
            >
              Scan with Momo to support (optional)
            </Typography>
          </Box>

          {/* Footer note */}
          <Typography variant="caption" color="text.disabled" sx={{ mb: 3 }}>
            No subscriptions. No paywalls. Just a simple way to say thanks 💙
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DonationPage;
