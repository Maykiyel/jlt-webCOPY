import { Box, Text, ActionIcon, Paper, Group } from "@mantine/core";
import {
  Download,
  Print,
  PictureAsPdf,
} from "@nine-thirty-five/material-symbols-react/rounded";
import { toClientFileUrl } from "@/utils/file-url";
import { printSecureFile, downloadSecureFile } from "@/utils/secureFileActions";
import { useSecureFileUrl } from "@/hooks/useSecureFileUrl";
import { PdfThumbnail } from "./PdfThumbnail"; // Assuming it's in the same folder

interface DocumentCardProps {
  file: {
    id: number;
    file_name: string;
    file_url: string;
    created_at: string;
  };
}

export function DocumentCard({ file }: DocumentCardProps) {
  const fileUrl = toClientFileUrl(file.file_url);

  const isPdf =
    file.file_name.toLowerCase().endsWith(".pdf") ||
    fileUrl.toLowerCase().includes(".pdf");

  // Securely load the image thumbnail (PDF handles its own)
  const { objectUrl, loading } = useSecureFileUrl(isPdf ? "" : fileUrl);

  const formattedDate = (() => {
    try {
      return new Date(file.created_at).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return file.created_at;
    }
  })();

  // Handlers utilizing the new shared utils
  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    printSecureFile(fileUrl);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    downloadSecureFile(fileUrl, file.file_name);
  };

  return (
    <Paper
      radius="md"
      shadow="none"
      p="0.5rem"
      style={{
        backgroundColor: "rgba(190, 190, 190, 0.5)",
        width: "8.5rem",
        height: "12.25rem",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Header ── */}
      <Group justify="space-between" mb="0.35rem" wrap="nowrap" align="center">
        <Group
          gap="0.25rem"
          wrap="nowrap"
          style={{ flex: 1, overflow: "hidden" }}
        >
          <PictureAsPdf
            width={16}
            height={16}
            style={{ color: "var(--mantine-color-red-6)", flexShrink: 0 }}
          />
          <Text
            size="0.65rem"
            fw={600}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={file.file_name}
          >
            {file.file_name}
          </Text>
        </Group>
        <ActionIcon
          variant="subtle"
          color="dark"
          size="xs"
          onClick={handlePrint}
          style={{ flexShrink: 0 }}
        >
          <Print width={16} height={16} />
        </ActionIcon>
      </Group>

      {/* ── Thumbnail Area ── */}
      <Box
        onClick={handlePrint}
        style={{
          flex: 1,
          display: "block",
          overflow: "hidden",
          boxShadow: "var(--mantine-shadow-md)",
          cursor: "pointer",
          transition: "opacity 120ms ease",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.opacity = "0.85")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.opacity = "1")
        }
      >
        {isPdf ? (
          <PdfThumbnail url={fileUrl} />
        ) : loading ? (
          <Box
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "var(--mantine-color-gray-2)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        ) : (
          <img
            src={objectUrl}
            alt={file.file_name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </Box>

      {/* ── Footer ── */}
      <Group justify="space-between" align="center" mt="0.35rem">
        <ActionIcon
          variant="subtle"
          color="dark"
          size="xs"
          onClick={handleDownload}
        >
          <Download width={16} height={16} />
        </ActionIcon>
        <Text size="0.6rem" c="dimmed">
          {formattedDate}
        </Text>
      </Group>
    </Paper>
  );
}
