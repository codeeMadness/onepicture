import { Box, Card, CardActionArea, CardContent } from "@mui/material";
import { useState } from "react";
import { topics } from "./data/topics";
import Gallery from "./Gallerry";

export default function Topics() {
  const [selectedCard, setSelectedCard] = useState(-1);

  const handleCardClick = (cardIndex: number) => {
    setSelectedCard(cardIndex); // Update the selected card state
  };

  return selectedCard >=0 ? (
    <Gallery topic={topics[selectedCard].title} /> // Pass the selected topic to Gallery
  ) : (
    <Box
      sx={{
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(4, 25%)",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        padding: "1rem",
      }}
    >
      {topics.map((item, index) => (
        <Card>
          <CardActionArea
            onClick={() => handleCardClick(index)}
            data-active={selectedCard === index ? "" : undefined}
            sx={{
              height: "100%",
              "&[data-active]": {
                backgroundColor: "action.selected",
                "&:hover": {
                  backgroundColor: "action.selectedHover",
                },
              },
            }}
          >
            <CardContent>
              <img
                style={{
                  width: "100%", // Define fixed width
                  height: "100%", // Define fixed height
                  objectFit: "cover", // Ensures images are cropped appropriately
                }}
                srcSet={`${process.env.PUBLIC_URL}/topics/${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
                src={`${process.env.PUBLIC_URL}/topics/${item.img}?w=161&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
