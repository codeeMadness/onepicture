
import { Close, Toc } from "@mui/icons-material";
import { Box, Drawer, IconButton, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import baseUrl from "./components/data/constant";
import { AISummary } from "./components/ImageDisplay";
import { useNav } from "./context/NavContext";

export default function MuiDrawerDesktop({
    open,
    handleClose,
    selectedImage,
    tab,
    setTab,
  }: any) {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down("sm"));
    const DRAWER_WIDTH = "50%";
    const { nav, setNav } = useNav();
  
    return (
        <Drawer
        anchor="right"
        open={open}
        variant="persistent"
        sx={{
          width: isXs ? "100%" : DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isXs ? "100%" : DRAWER_WIDTH,
            boxSizing: "border-box",
          },
          height: "100vh",
          overflow: "hidden",
        }}
        slotProps={{
          paper: {
            sx: {
              overflowY: "auto",
            },
          },
        }}
        ModalProps={{
          disablePortal: true, // 🔥 CRITICAL
          keepMounted: true,   // 🔥 prevents async remount
        }}
      >
        <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <Box sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            bgcolor: "background.paper",
            borderBottom: 1,
            borderColor: "divider",
          }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                aria-label="image tabs"
                sx={{ flex: 1 }}
              >
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
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
            }}>
            {tab === 0 && selectedImage && (
              <Box sx={{ p: 2 }}>
                <img
                  src={`${baseUrl}${selectedImage.URL.replace(/ /g, "%20")}.png`}
                  alt={selectedImage.Name}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain"
                  }}
                />
              </Box>
            )}
  
            {tab === 1 && selectedImage && (
              <Box sx={{ p: 2 }}>
                <AISummary prompt={selectedImage.Prompt} active={tab === 1} />
              </Box>
            )}
  
  
          </Box>
  
  
        </Box>
      </Drawer>
    );
  }
  