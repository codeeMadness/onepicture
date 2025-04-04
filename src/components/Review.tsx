import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import { topics } from "./data/topics";
import { PlayArrow } from "@mui/icons-material";

export default function Review() {
    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Autocomplete
                disablePortal
                options={topics}
                getOptionLabel={(option) => option.title}
                sx={{ width: 300, mt: 3 }}
                renderInput={(params) => <TextField {...params} label="Topic" />}
            />
            {/* <Autocomplete
                disablePortal
                options={[10, 20, 30]}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Time (s)" />}
            /> */}
            <IconButton aria-label="play" sx={{mt: 3}}>
                <PlayArrow />
            </IconButton>
        </Box>
    );
}

function SlideShow() {
    return <div>SlideShow</div>;
}