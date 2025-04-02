import { Visibility } from "@mui/icons-material";
import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { java } from "./data/java";

export default function Gallery({ topic }: { topic: string }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
      }}
    >
      <ImageList
        cols={5} // Specify 4 images per row
        gap={20} // Control spacing between images
      >
        {java.map((item) => {
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
                  >
                    <Visibility />
                  </IconButton>
                }
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </Box>
  );
}
