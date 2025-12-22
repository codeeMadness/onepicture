import { CrueltyFree, Visibility } from "@mui/icons-material";
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
import { useQuery } from "@tanstack/react-query";
import { Fragment, useEffect, useState } from "react";
import fetchApi, { ApiResponse } from "../api";
import { Picture } from "./data/data";
import { Topic } from "./data/topics";
import LoadingIndicator from "./LoadingIndicator";
import { dispatchEventWithParams } from "../event/useEventToPassParam";
import { OPEN_DRAWER_EVENT } from "../event/events";

export default function Gallery({ topic }: { topic: Topic | null }) {

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTopics, setFilteredTopics] = useState<Picture[]>([]);

  const { data: pictures , isLoading, refetch } = useQuery({ 
    queryKey: ['images', topic?.ID],
    queryFn: async () => {
      const res = await fetchApi<ApiResponse<Picture[]>>("/images", { method: "POST", body: JSON.stringify({topic_id: topic ? topic.ID : ''})});
      return Array.isArray(res.data) ? res.data : [];
    }  
  });

  const handleOpen = (image: Picture) => {
    //update views count
    fetchApi<ApiResponse<Picture>>("/image/view", { method: "POST", body: JSON.stringify({image_id: image.ID})})
    .then(() => refetch())

    dispatchEventWithParams<Picture>(OPEN_DRAWER_EVENT, image)
  };

  // Update filtered topics whenever the search query changes
  useEffect(() => {
    if(!pictures) return;

    const newFilteredTopics = pictures.filter((item) =>
      item.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTopics(newFilteredTopics); // Update filtered topics state

  }, [pictures, searchQuery]);

  if (isLoading) return <LoadingIndicator />;

  return (
    <>
      {/* Search Bar */}
      <Box sx={{ display: "block", justifyContent: "center", position: "sticky", top: 0, left: 0, zIndex: 1000, bgcolor: "background.paper",}}>
        <Typography variant="h3" sx={{marginLeft: 2}}>{topic ? topic.Name : ''}</Typography>
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
            {filteredTopics.sort((a,b) => b.Views - a.Views).map((item) => (
              <Fragment key={item.ID}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => handleOpen(item)}>
                    <ListItemIcon>
                      <CrueltyFree />
                    </ListItemIcon>
                    <ListItemText primary={item.Name} 
                      secondary={ 
                      <Box sx={{ display: "flex", alignItems: "center" }}> 
                        <Visibility fontSize="small" sx={{ mr: 0.5 }} /> 
                        <Typography variant="body2">{item.Views}</Typography> 
                      </Box> }
                    />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </Fragment>
            ))}
          </Box>
        ) : (
          <Typography sx={{ textAlign: "center", mt: 2 }}>
            No results found!
          </Typography>
        )}
      </Box>
    </>
  );
}
