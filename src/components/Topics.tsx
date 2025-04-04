import { Box, Card, CardActionArea, CardContent } from "@mui/material";
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
    <Gallery
      data={topics[selectedCard].data || []}
    /> // Pass the selected topic to Gallery
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
