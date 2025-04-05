import { Autocomplete, Box, IconButton, TextField, Typography } from "@mui/material";
import { topics } from "./data/topics";
import { Pause, PlayArrow } from "@mui/icons-material";
import { useEffect, useState } from "react";
import baseUrl from "./data/constant";

export default function Review() {
    const [dataArray, setDataArray] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30); // Initialize countdown timer

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (isPlaying && dataArray.length > 0) {
            interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * dataArray.length);
                setCurrentIndex(randomIndex);
                setTimeLeft((prev) => (prev > 1 ? prev - 1 : 30)); // Reset timer after 30s
            }, 5000);
        } else if (!isPlaying && interval) {
            clearInterval(interval);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isPlaying, dataArray]);

    const handlePlay = () => {
        setIsPlaying((prev) => !prev); // Toggle play/pause
        if (!isPlaying) setTimeLeft(30); // Reset timer when starting
    };

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Autocomplete
                    disablePortal
                    options={topics}
                    getOptionLabel={(option) => option.title}
                    sx={{ width: 300, mt: 3 }}
                    onChange={(_event, newValue) => { setDataArray(newValue?.data || []) }}
                    renderInput={(params) => <TextField {...params} label="Topic" />}
                />
                {/* <Autocomplete
                    disablePortal
                    options={[10, 20, 30]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Time (s)" />}
                /> */}
                <IconButton aria-label="play" sx={{ mt: 3 }} onClick={handlePlay}
                    disabled={dataArray.length === 0}>
                    {isPlaying ? <Pause /> : <PlayArrow />}
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                }}
            >
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Time Left: {timeLeft}s
                </Typography>
                <SlideShow dataArray={dataArray} currentIndex={currentIndex} />
            </Box>
        </>
    );
}

function SlideShow({ dataArray, currentIndex }: { dataArray: string[]; currentIndex: number }) {
    if (dataArray.length === 0) {
        return <div>No slides available</div>;
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid #ccc",
                borderRadius: "8px",
            }}
        >
            <img
                src={`${baseUrl}${dataArray[currentIndex].replace(/ /g, "%20")}.png`}
                alt={`Slide ${currentIndex + 1}`}
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
        </div>
    );
}