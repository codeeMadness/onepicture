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
import { java } from "./data/java";
import ImageDisplay from "./ImageDisplay";

export default function Gallery({ topic }: { topic: string }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTopics, setFilteredTopics] = useState(java);
  const [open, setOpen] = useState(false); // Modal open state
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Selected image URL
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null); // Selected image title

  const handleOpen = (image: string, title: string) => {
    setSelectedImage(image); // Set selected image
    setSelectedTitle(title); // Set selected title
    setOpen(true); // Open the modal
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
    setSelectedImage(null); // Reset the image
    setSelectedTitle(null); // Reset the title
  };

   // Update filtered topics whenever the search query changes
   useEffect(() => {
    const newFilteredTopics = java.filter((topic) =>
      topic.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTopics(newFilteredTopics); // Update filtered topics state
  }, [searchQuery]);


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
            cols={10} // Specify 4 images per row
            gap={20} // Control spacing between images
          >
            {filteredTopics.map((item) => {
              return (
                <ImageListItem key={item.img}>
                  <img
                    id={topic}
                    srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=248&fit=crop&auto=format`}
                    alt={item.title}
                    loading="lazy"
                  />
                  <ImageListItemBar
                    title={item.title}
                    actionIcon={
                      <IconButton
                        sx={{ color: "white" }}
                        aria-label={`info about ${item.title}`}
                        onClick={() => handleOpen(item.img, item.title)}
                      >
                        <Visibility />
                      </IconButton>
                    }
                  />
                </ImageListItem>
              );
            })}
          </ImageList>
        ) : (
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            No results found for "{searchQuery}"
          </Typography>
        )}
        <ImageDisplay
          open={open}
          handleClose={handleClose}
          selectedImage={selectedImage}
          title={selectedTitle}
        />
      </Box>
    </>
  );
}
