import { FlutterDash } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { Fragment } from "react";
import fetchApi, { ApiResponse } from "../api";
import { Topic } from "./data/Topic";

import Gallery from "./Gallerry";
import LoadingIndicator from "./LoadingIndicator";

interface TopicsProps {
  selectedCard: string; // Value passed from parent
  setSelectedCard: React.Dispatch<React.SetStateAction<string>>; // Function to update selectedCard in parent
}

export default function Topics({ selectedCard, setSelectedCard }: TopicsProps) {

  const handleCardClick = (topidId: string): void => {
    setSelectedCard(topidId); // Update the state in parent
  };

  const { data: topics , isLoading } = useQuery({ 
    queryKey: ['topics'], 
    queryFn: async () => {
      const res = await fetchApi<ApiResponse<Topic[]>>("/topics");
      return Array.isArray(res.data) ? res.data : [];
    }    
  });

  if (isLoading) return <LoadingIndicator />;

  return selectedCard.length > 0 ? (
    <Gallery topic={topics?.find(t => t.ID == selectedCard) ?? null} /> // Pass the selected topic to Gallery
  ) : (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <List>
        {Array.isArray(topics) && topics.sort((a, b) => a.Priority - b.Priority).map((item, index) => (
          <Fragment key={item.ID}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleCardClick(item.ID)}>
                <ListItemIcon>
                  <FlutterDash />
                </ListItemIcon>
                <ListItemText primary={item.Name} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </Fragment>
        ))}
      </List>
    </Box>
  );
}
