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
import { topics } from "./data/topics";
import Gallery from "./Gallerry";

interface TopicsProps {
  selectedCard: number; // Value passed from parent
  setSelectedCard: React.Dispatch<React.SetStateAction<number>>; // Function to update selectedCard in parent
}

export default function Topics({ selectedCard, setSelectedCard }: TopicsProps) {
  const handleCardClick = (cardIndex: number): void => {
    setSelectedCard(cardIndex); // Update the state in parent
  };

  return selectedCard >= 0 ? (
    <Gallery topic={topics[selectedCard].title} data={topics[selectedCard].data || []} /> // Pass the selected topic to Gallery
  ) : (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <List>
        {topics.map((item, index) => (
          <>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleCardClick(index)}>
                <ListItemIcon>
                  <FlutterDash />
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
}
