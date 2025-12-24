import { Box, Button, Typography } from "@mui/material";

export default function BlockContent() {
    return <Box
        sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
        }}
    >
        <Button variant="contained" color="success">Get Unlimited Access</Button>
    </Box>

}