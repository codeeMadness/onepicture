import { CheckCircle, Language } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import { Grid } from "@mui/system";
import { useState } from "react";
import { OPEN_PAYMENT_DRAWER_EVENT, RESET_PAYMENT_PLAN_EVENT } from "../event/events";
import { dispatchEventWithParams } from "../event/useEventToPassParam";
import { useEventToTriggerAction } from "../event/useEventToTriggerAction";
import { PricingDrawerMode, PricingModel, pricing_models } from "./data/Pricing";

export default function Pricing() {
  const [selected, setSelected] = useState<PricingModel | null>();

  useEventToTriggerAction({
    events: [RESET_PAYMENT_PLAN_EVENT],
    triggerFn: () => {
      setSelected(null);
    }
  })

  return (
    <Box
      sx={{
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <Card
        key={pricing_models[2].name}
        sx={{
          cursor: "pointer",
          border:
            selected?.name === pricing_models[2].name
              ? "2px solid #1976d2"
              : "1px solid #ccc",
          boxShadow: selected ? 6 : 1,
          transition: "0.3s",
          marginBottom: "1rem",
        }}
        onClick={() => {
          setSelected(pricing_models[2]);
          dispatchEventWithParams<PricingDrawerMode>(
            OPEN_PAYMENT_DRAWER_EVENT,
            {pricingModel: pricing_models[2], displayPricingPlan: false}
          );
        }}
      >
        <CardActionArea>
          <CardContent>
            <Grid container>
              <Grid
                size={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Language />
                <Typography variant="h4" sx={{ marginLeft: "0.5rem" }}>
                  {pricing_models[2].name}
                </Typography>
              </Grid>
              <Grid
                size={8}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                container
                spacing={2}
              >
                <Typography variant="h3">${pricing_models[2].price}</Typography>
                <Typography variant="h5">/one time</Typography>
              </Grid>
            </Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <CheckCircle sx={{ color: "green" }} />
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Own forever
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <CheckCircle sx={{ color: "green" }} />
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Unlimited access to all current & future images for life
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <CheckCircle sx={{ color: "green" }} />
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Detail Explained Powered By AI
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card
        key={pricing_models[1].name}
        sx={{
          cursor: "pointer",
          border:
            selected?.name === pricing_models[1].name
              ? "2px solid #1976d2"
              : "1px solid #ccc",
          boxShadow: selected ? 6 : 1,
          transition: "0.3s",
          marginBottom: "1rem",
        }}
        onClick={() => {
          setSelected(pricing_models[1]);
          dispatchEventWithParams<PricingDrawerMode>(
            OPEN_PAYMENT_DRAWER_EVENT,
            {pricingModel: pricing_models[1], displayPricingPlan: false}
          );
        }}
      >
        <CardActionArea>
          <CardContent>
            <Grid container>
              <Grid
                size={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Language />
                <Typography variant="h4" sx={{ marginLeft: "0.5rem" }}>
                  {pricing_models[1].name}
                </Typography>
              </Grid>
              <Grid
                size={8}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                container
                spacing={2}
              >
                <Typography variant="h3">${pricing_models[1].price}</Typography>
                <Typography variant="h5">/year</Typography>
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <CheckCircle sx={{ color: "green" }} />
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Unlimited access to all current & future images for one year
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <CheckCircle sx={{ color: "green" }} />
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Detail Explained Powered By AI
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
      <Card
        key={pricing_models[0].name}
        sx={{
          cursor: "pointer",
          border:
            selected?.name === pricing_models[0].name
              ? "2px solid #1976d2"
              : "1px solid #ccc",
          boxShadow: selected ? 6 : 1,
          transition: "0.3s",
          marginBottom: "1rem",
        }}
        onClick={() => {
          setSelected(pricing_models[0]);
          dispatchEventWithParams<PricingDrawerMode>(
            OPEN_PAYMENT_DRAWER_EVENT,
            {pricingModel: pricing_models[0], displayPricingPlan: false}
          );
        }}
      >
        <CardActionArea>
          <CardContent>
            <Grid container>
              <Grid
                size={4}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <Language />
                <Typography variant="h4" sx={{ marginLeft: "0.5rem" }}>
                  {pricing_models[0].name}
                </Typography>
              </Grid>
              <Grid
                size={8}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                }}
                container
                spacing={2}
              >
                <Typography variant="h3">${pricing_models[0].price}</Typography>
                <Typography variant="h5">/month</Typography>
              </Grid>
            </Grid>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <CheckCircle sx={{ color: "green" }} />
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Unlimited access to all current & future images for one month
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}
