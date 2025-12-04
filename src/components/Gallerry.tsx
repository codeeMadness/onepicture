import { CrueltyFree } from "@mui/icons-material";
import {
  Box,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ImageDisplay from "./ImageDisplay";

export default function Gallery({ topic, data }: { topic: string, data: string[] }) {

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
      <Box sx={{ display: "block", justifyContent: "center", position: "sticky", top: 0, left: 0, zIndex: 1000, bgcolor: "background.paper",}}>
        <Typography variant="h3" sx={{marginLeft: 2}}>{topic}</Typography>
        <TextField
          variant="outlined"
          label="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query dynamically
          sx={{
            margin: 2, // Add margin/padding top
            width: "90%", // Reduce the width to make it smaller
          }}
        />
      </Box>
      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        {filteredTopics.length > 0 ? (
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            {filteredTopics.map((item) => (
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleOpen(item)}>
                    <ListItemIcon>
                      <CrueltyFree />
                    </ListItemIcon>
                    <ListItemText primary={item} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </>
            ))}
          </Box>
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
