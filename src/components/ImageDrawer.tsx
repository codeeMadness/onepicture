import {
  Box,
  Drawer,
  IconButton,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { isProContent, Picture } from "./data/Picture";
import fetchApi, { ApiResponse, image_host } from "../api";
import { useState } from "react";
import LoadingIndicator from "./LoadingIndicator";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import { Close } from "@mui/icons-material";
import { useEventToPassParams } from "../event/useEventToPassParam";
import {
  CLOSE_DRAWER_EVENT,
  OPEN_DRAWER_EVENT,
  RESET_SELECT_ITEM,
} from "../event/events";
import {
  describeEvents,
  useEventToTriggerAction,
} from "../event/useEventToTriggerAction";
import BlockContent from "./BlockContent";

export const DRAWER_WIDTH = "50%";
export const BOTTOM_NAV_HEIGHT = 56;

export default function ImageDrawer() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedImage, setSelectedImage] = useState<Picture | null>(null);

  useEventToPassParams<Picture>(
    OPEN_DRAWER_EVENT,
    (item) => {
      setOpen(true);
      setTab(0);
      setSelectedImage(item);
    },
    []
  );

  useEventToTriggerAction({
    events: [CLOSE_DRAWER_EVENT],
    triggerFn: () => {
      handleClose();
    },
  });

  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
    describeEvents([new Event(RESET_SELECT_ITEM)]);
  };

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
          bottom: `calc(${BOTTOM_NAV_HEIGHT}px + env(safe-area-inset-bottom))`,
          height: `calc(100dvh - ${BOTTOM_NAV_HEIGHT}px - env(safe-area-inset-bottom))`,
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
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
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
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              aria-label="image tabs"
              sx={{ flex: 1 }}
            >
              <Tab label="Image" />
              <Tab label="AI Explained" />
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
          }}
        >
          {tab === 0 && selectedImage && (
            <ImageDisplay image={selectedImage} />
          )}

          {tab === 1 && selectedImage && (
            <Box sx={{ p: 2 }}>
              <BlockContent />
              {/* <AISummary prompt={selectedImage.Prompt} active={tab === 1} /> */}
            </Box>
          )}
        </Box>
      </Box>
      )
    </Drawer>
  );
}

function ImageDisplay({ image }: { image: Picture }) {

  const isPro = isProContent(image);

  const { data: url, isLoading } = useQuery({
    queryKey: ["image", image],
    enabled: !isPro,
    queryFn: async () => {
      const res = await fetchApi<ApiResponse<string>>("/image/s3-presigned", {
        method: "POST",
        body: JSON.stringify({ object_key: image.URL.concat(".png"), bucket_name: "onepicture-assets" }),
      });
      return res.data;
    },
  });

  if (isLoading) return <LoadingIndicator />;

  return <Box sx={{ p: 2 }}>
    <img
      src={url ?? ""}
      alt={image.Name}
      style={{
        width: "100%",
        height: "auto",
        objectFit: "contain",
      }}
    />
  </Box>;
}

function AISummary({
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
      return res.data;
    },
  });

  if (isLoading || isFetching) return <LoadingIndicator />;

  return (
    <Box
      sx={{
        ...aiHtmlStyles,
      }}
    >
      <Markdown>{summary || "No Summary Yet!"}</Markdown>
    </Box>
  );
}
