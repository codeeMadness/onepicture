import { Box, Button } from "@mui/material";
import { CLOSE_DRAWER_EVENT, OPEN_PAYMENT_DRAWER_EVENT } from "../event/events";
import { dispatchEventWithParams } from "../event/useEventToPassParam";
import { describeEvents } from "../event/useEventToTriggerAction";
import { PricingDrawerMode } from "./data/Pricing";

export default function BlockContent() {

    const openPricingPlan = () => {
        describeEvents([new Event(CLOSE_DRAWER_EVENT)]);
        dispatchEventWithParams<PricingDrawerMode>(OPEN_PAYMENT_DRAWER_EVENT, {displayPricingPlan: true, tab: 0});
    }

    return <Box
        sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        }}
    >
        <Button variant="contained" color="success" onClick={openPricingPlan}>Get Unlimited Access</Button>
    </Box>

}