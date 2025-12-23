import {
  Box,
  Drawer,
  IconButton,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Picture } from "./data/Picture";
import fetchApi, { ApiResponse, image_host } from "../api";
import { useState } from "react";
import LoadingIndicator from "./LoadingIndicator";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import { Close } from "@mui/icons-material";
import { useEventToPassParams } from "../event/useEventToPassParam";
import { CLOSE_DRAWER_EVENT, OPEN_DRAWER_EVENT } from "../event/events";
import { useEventToTriggerAction } from "../event/useEventToTriggerAction";

export default function ImageDisplay() {

  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const DRAWER_WIDTH = "50%";
  const BOTTOM_NAV_HEIGHT = 56;
  const [selectedImage, setSelectedImage] = useState<Picture | null>(null);

  useEventToPassParams<Picture>(OPEN_DRAWER_EVENT, item => {
    setOpen(true);
    setTab(0);
    setSelectedImage(item);

  }, [])

  useEventToTriggerAction({
    events: [CLOSE_DRAWER_EVENT],
    triggerFn: () => {
      handleClose();
    }
  })

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  }

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
          bottom: `${BOTTOM_NAV_HEIGHT}px`,   // ✅ key line
          height: `calc(100vh - ${BOTTOM_NAV_HEIGHT}px)`, // ✅ key line
        },
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
            <IconButton onClick={() => handleClose()}>
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
                src={`${image_host}${selectedImage.URL.replace(/ /g, "%20")}.png`}
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

export function AISummary({
  prompt,
  active,
}: {
  prompt: string | null;
  active: boolean;
}) {
  const aiHtmlStyles = {
    /* ===== Typography ===== */
    "& h1": { fontSize: "1.4rem", mt: 2 },
    "& h2": { fontSize: "1.2rem", mt: 2 },
    "& p": { lineHeight: 1.7, mb: 1 },

    "& ul": { pl: 3 },
    "& li": { mb: 0.5 },

    /* ===== Code ===== */
    "& code": {
      bgcolor: "grey.100",
      px: 0.5,
      borderRadius: 1,
      fontFamily: "monospace",
      whiteSpace: "pre-wrap",
      wordBreak: "break-word",
    },

    "& pre": {
      bgcolor: "grey.100",
      p: 2,
      borderRadius: 2,
      overflowX: "auto",
      maxWidth: "100%",
      WebkitOverflowScrolling: "touch",
    },

    /* ===== Mobile CRITICAL FIXES ===== */
    color: "text.primary",
    minHeight: "1px", // 🔥 prevents Safari collapse

    "& *": {
      maxWidth: "100%",
      wordBreak: "break-word",
      overflowWrap: "anywhere",
    },

    /* ❌ DO NOT use display:block on table */
    "& table": {
      width: "100%",
      overflowX: "auto",
    },
  };

  const {
    data: summary,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["ai-summary", prompt],
    enabled: active && !!prompt,
    queryFn: async () => {
      const res = await fetchApi<ApiResponse<string>>("/summarize", {
        method: "POST",
        body: JSON.stringify({ prompt: prompt }),
      });
      return await res.data;
    },
  });

  if (isLoading || isFetching) return <LoadingIndicator />;

  return (
    <Box
      sx={{
        ...aiHtmlStyles,
      }}
    >
      <Markdown>
        {summary || "No Summary Yet!"}
      </Markdown>
    </Box>
  );
}
