import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Box } from "@mui/material";

export default function Topics() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
      }}
    >
      <ImageList
        sx={{ width: '80%' }}
        variant="woven"
        cols={4} rowHeight={164}
      >
        {topics.map((item) => (
          <ImageListItem key={item.img}>
            <img
              srcSet={`${process.env.PUBLIC_URL}/topics/${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
              src={`${process.env.PUBLIC_URL}/topics/${item.img}?w=161&fit=crop&auto=format`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

const topics = [
  {
    img: "java.png",
    title: "Java",
  },
  {
    img: "spring.png",
    title: "Spring",
  },
  {
    img: "hibernate.png",
    title: "Hibernate",
  },
  {
    img: "database.png",
    title: "Database",
  },
  {
    img: "design pattern.png",
    title: "Design Patterns",
  },
  {
    img: "system design.png",
    title: "System Designs",
  },
  {
    img: "microservices.png",
    title: "Microservices",
  },
  {
    img: "dsa.png",
    title: "Data Structure & Algorithms",
  },
];
