import { CheckCircle, Close, Language } from "@mui/icons-material";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Drawer,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { PricingDrawerMode, PricingModel, pricing_models } from "./components/data/Pricing";
import { BOTTOM_NAV_HEIGHT, DRAWER_WIDTH } from "./components/ImageDrawer";
import {
  CLOSE_PAYMENT_DRAWER_EVENT,
  OPEN_PAYMENT_DRAWER_EVENT,
  RESET_PAYMENT_PLAN_EVENT,
} from "./event/events";
import {
  dispatchEventWithParams,
  useEventToPassParams,
} from "./event/useEventToPassParam";
import { describeEvents, useEventToTriggerAction } from "./event/useEventToTriggerAction";
import SignIn from "./components/SignIn";
import { useAuth } from "./context/AuthContext";
import MyProfile from "./components/MyProfile";

export default function PaymentDrawer() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [tab, setTab] = useState(1);
  const [displayPricingPlan, setDisplayPricingPlan] = useState(true);
  const [open, setOpen] = useState(false);
  const [pricingModel, setPricingModel] = useState<PricingModel | null>(null);

  const {userDetail} = useAuth();

  useEventToPassParams<PricingDrawerMode>(
    OPEN_PAYMENT_DRAWER_EVENT,
    (item) => {
      setOpen(true);
      setPricingModel(item.pricingModel ?? null);
      setDisplayPricingPlan(item.displayPricingPlan);
      setTab(item.tab ?? 1);
    },
    []
  );

  useEventToTriggerAction({
    events: [CLOSE_PAYMENT_DRAWER_EVENT],
    triggerFn: () => {
      handleClose();
    }
  })

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      variant="persistent"
      sx={{
        width: isXs ? "100%" : DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isXs ? "100%" : DRAWER_WIDTH,
          boxSizing: "border-box",
          bottom: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom))`,
          height: `calc(100dvh - ${BOTTOM_NAV_HEIGHT}px - env(safe-area-inset-bottom))`,
        },
        overflow: "hidden",
      }}
      slotProps={{
        paper: {
          sx: {
            overflowY: "auto",
          },
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              aria-label="image tabs"
              sx={{ flex: 1 }}
            >
              {displayPricingPlan && <Tab label="Pricing" />}
              <Tab label="Payment" />
            </Tabs>
            <IconButton onClick={() => {
              handleClose();
              describeEvents([new Event(RESET_PAYMENT_PLAN_EVENT)]);
            }}>
              <Close />
            </IconButton>
          </Box>
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
          }}
        >
          {tab === 0 && displayPricingPlan && (
            <Box sx={{ p: 2 }}>
              <PricingMode setPricingModel={setPricingModel} setTab={setTab}/>
            </Box>
          )}
          {tab === 1 && (
            <Box sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.875rem 1rem 0.625rem 1rem",
                }}
              >
                {pricingModel && <Typography variant="h5">You are paying for <b>{pricingModel.name}</b></Typography>}
              </Box>
              {userDetail && <MyProfile />}
              {!userDetail && <SignIn />}
            </Box>
          )}

        </Box>
      </Box>
    </Drawer>
  );
}

function PricingMode({
  setPricingModel,
  setTab
}: {
  setPricingModel: React.Dispatch<React.SetStateAction<PricingModel | null>>;
  setTab: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <>
      <Card
        key={pricing_models[2].name}
        sx={{
          cursor: "pointer",
          marginBottom: "1rem",
        }}
        onClick={() => {
          setPricingModel(pricing_models[2])
          setTab(1)
        }}
      >
        <CardActionArea>
          <CardContent>
            <Grid container>
              <Grid
                size={6}
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
                size={6}
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
          marginBottom: "1rem",
        }}
        onClick={() => {
          setPricingModel(pricing_models[1])
          setTab(1)
        }}
      >
        <CardActionArea>
          <CardContent>
            <Grid container>
              <Grid
                size={6}
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
                size={6}
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
          marginBottom: "1rem",
        }}
        onClick={() => {
          setPricingModel(pricing_models[0])
          setTab(1)
        }}
      >
        <CardActionArea>
          <CardContent>
            <Grid container>
              <Grid
                size={6}
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
                size={6}
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
    </>
  );
}
