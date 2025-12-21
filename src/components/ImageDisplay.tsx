import {
  Box,
} from "@mui/material";
import { Picture } from "./data/data";
import fetchApi, { ApiResponse } from "../api";
import { useEffect, useState } from "react";
import LoadingIndicator from "./LoadingIndicator";
import { useQuery } from "@tanstack/react-query";
import Markdown from "react-markdown";
import MuiDrawerDesktop from "../MuiDrawerDesktop";

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
  const [tab, setTab] = useState(0);

  useEffect(() => {
    setTab(0);
  }, [selectedImage]);

  return <MuiDrawerDesktop
  open={open}
  handleClose={handleClose}
  selectedImage={selectedImage}
  tab={tab}
  setTab={setTab}
/>
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
      <Markdown>
        {summary || "No Summary Yet!"}
      </Markdown>
    </Box>
  );
}
