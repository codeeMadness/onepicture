import { FlutterDash } from "@mui/icons-material";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import fetchApi, { url } from "../api";
import { Topic } from "./data/topics";

import Gallery from "./Gallerry";

interface TopicsProps {
  selectedCard: number; // Value passed from parent
  setSelectedCard: React.Dispatch<React.SetStateAction<number>>; // Function to update selectedCard in parent
}

export default function Topics({ selectedCard, setSelectedCard }: TopicsProps) {

  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    fetchApi<Topic[]>(url("/topics")).then(res => {
      setTopics(res.data || [])
    })
  },[])

  const handleCardClick = (cardIndex: number): void => {
    setSelectedCard(cardIndex); // Update the state in parent
  };

  return selectedCard >= 0 ? (
    <Gallery topic={topics[selectedCard]} /> // Pass the selected topic to Gallery
  ) : (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <List>
        {topics && topics.map((item, index) => (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleCardClick(index)}>
                <ListItemIcon>
                  <FlutterDash />
                </ListItemIcon>
                <ListItemText primary={item.name} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
}
