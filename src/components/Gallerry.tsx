import { Visibility } from "@mui/icons-material";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ImageDisplay from "./ImageDisplay";
import baseUrl from "./data/constant";

import { useMediaQuery, useTheme } from "@mui/material";

export default function Gallery({ data }: { data: string[] }) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const columns = isXs ? 1 : isSm ? 2 : isMd ? 3 : isLg ? 4 : 1; // Determine columns based on screen size
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTopics, setFilteredTopics] = useState<string[]>([]);
  const [open, setOpen] = useState(false); // Modal open state
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpen = (image: string) => {
    setSelectedImage(image); // Set selected image
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
    setSelectedImage(null); // Reset the image
  };

  // Update filtered topics whenever the search query changes
  useEffect(() => {
    const newFilteredTopics = data.filter((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTopics(newFilteredTopics); // Update filtered topics state
  }, [data, searchQuery]);


  return (
    <>
      {/* Search Bar */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          variant="outlined"
          label="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query dynamically
          sx={{
            mt: 3, // Add margin/padding top
            width: "30%", // Reduce the width to make it smaller
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {filteredTopics.length > 0 ? (
          <ImageList
            cols={columns} // Dynamically set the number of columns
            gap={20} // Control spacing between images
          >
            {filteredTopics.map((item) => (
              <ImageListItem key={item}>
                <img
                  srcSet={`${baseUrl}${item.replace(/ /g, "%20")}.png?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${baseUrl}${item.replace(/ /g, "%20")}.png?w=248&fit=crop&auto=format`}
                  alt={item}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={item}
                  actionIcon={
                    <IconButton
                      sx={{ color: "white" }}
                      aria-label={`info about ${item}`}
                      onClick={() => handleOpen(item)}
                    >
                      <Visibility />
                    </IconButton>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        ) : (
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            No results found!
          </Typography>
        )}
        <ImageDisplay
          open={open}
          handleClose={handleClose}
          selectedImage={selectedImage}
        />
      </Box>
    </>
  );
}
