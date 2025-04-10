import { Box, Modal, useMediaQuery, useTheme } from "@mui/material";
import baseUrl from "./data/constant";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  width: "50vw", // Set the maximum width of the modal
  height: "90vh", // Set the maximum height of the modal
  overflowY: "auto", // Enable vertical scrolling
  overflowX: "hidden", // Avoid horizontal scrolling unless necessary
};

interface ImageDisplayProps {
  open: boolean; // Modal open state
  handleClose: () => void; // Function to close the modal
  selectedImage: string | null; // Image URL to display
}

export default function ImageDisplay({
  open,
  handleClose,
  selectedImage,
}: ImageDisplayProps) {

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        ...style,
        width: isXs ? "90vw" : "50vw", // Adjust width for mobile
        height: isXs ? "80vh" : "90vh", // Adjust height for mobile
        p: isXs ? 2 : 4, // Adjust padding for mobile
      }}>
        {selectedImage && (
          <>
            <img
              src={`${baseUrl}${selectedImage.replace(/ /g, "%20")}.png`}
              alt={selectedImage || "Image"}
              style={{ width: "100%", height: "auto" }}
            />
            )
          </>
        )}
      </Box>
    </Modal>
  );
}
