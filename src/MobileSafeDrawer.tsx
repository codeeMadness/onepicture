import { Close, Toc } from "@mui/icons-material";
import { IconButton, Tab } from "@mui/material";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import baseUrl from "./components/data/constant";
import { AISummary } from "./components/ImageDisplay";
import { useNav } from "./context/NavContext";

export default function IosSafeDrawer({
    open,
    handleClose,
    selectedImage,
    tab,
    setTab,
  }: any) {

    const { nav, setNav } = useNav();

    if (!open) return null;
  
    return (
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 1300,
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
        onClick={handleClose}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              bgcolor: "background.paper",
              borderBottom: 1,
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ flex: 1 }}>
                <Tab label="Image" />
                <Tab label="AI Summary" />
              </Tabs>

              <IconButton onClick={() => { setNav(0); handleClose() }} title="Topics">
                <Toc />
              </IconButton>
  
              <IconButton onClick={handleClose}>
                <Close />
              </IconButton>
            </Box>
          </Box>
  
          {/* Content */}
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            {tab === 0 && selectedImage && (
              <Box sx={{ p: 2 }}>
                <img
                  src={`${baseUrl}${selectedImage.URL.replace(/ /g, "%20")}.png`}
                  alt={selectedImage.Name}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
              </Box>
            )}
  
            {tab === 1 && selectedImage && (
              <Box sx={{ p: 2 }}>
                <AISummary prompt={selectedImage.Prompt} active />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
  