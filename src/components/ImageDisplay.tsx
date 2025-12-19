import { Close } from "@mui/icons-material";
import { Box, Drawer, IconButton, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import baseUrl from "./data/constant";
import { Picture } from "./data/data";
import { useQuery } from "@tanstack/react-query";
import fetchApi, { ApiResponse, url } from "../api";
import { useEffect, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const DRAWER_WIDTH = "50%";

interface ImageDisplayProps {
  open: boolean; // Modal open state
  handleClose: () => void; // Function to close the modal
  selectedImage: Picture | null; // Image URL to display
}

export default function ImageDisplay({
  open,
  handleClose,
  selectedImage,
}: ImageDisplayProps) {


  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTab(0);
  }, [selectedImage]);

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
  )
}

const aiHtmlStyles = {
  "& h1": { fontSize: "1.4rem", mt: 2 },
  "& h2": { fontSize: "1.2rem", mt: 2 },
  "& p": { lineHeight: 1.7, mb: 1 },
  "& ul": { pl: 3 },
  "& li": { mb: 0.5 },
  "& code": {
    bgcolor: "grey.100",
    px: 0.5,
    borderRadius: 1,
    fontFamily: "monospace",
  },
  "& pre": {
    bgcolor: "grey.100",
    p: 2,
    borderRadius: 2,
    overflowX: "auto",
  },
};

function AISummary({ prompt, active }: { prompt: string | null, active: boolean }) {

  const { data: summary, isLoading, isFetching } = useQuery({
    queryKey: ['ai-summary', prompt],
    enabled: active && !!prompt,
    queryFn: async () => {
      const res = await fetchApi<ApiResponse<string>>(url("/summarize"), { method: "POST", body: JSON.stringify({ prompt: prompt?.concat(". Structure response in markdown, not specify this format in response") }) });
      return res.data;
    },
    
  });

  if (isLoading || isFetching) return <LoadingIndicator />;

  return <Box
    sx={aiHtmlStyles}>
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {summary ?? 'No Summary Yet!'}
    </ReactMarkdown>
  </Box>
}
