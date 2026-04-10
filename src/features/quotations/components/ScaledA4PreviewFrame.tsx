import { Box } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";

const BASE_A4_WIDTH_PX = 1086;
const BASE_A4_HEIGHT_PX = (BASE_A4_WIDTH_PX * 297) / 210;

interface ScaledA4PreviewFrameProps {
  children: React.ReactNode;
  viewportClassName: string;
  canvasClassName: string;
}

export function ScaledA4PreviewFrame({
  children,
  viewportClassName,
  canvasClassName,
}: ScaledA4PreviewFrameProps) {
  const { ref: viewportRef, width: viewportWidth } = useElementSize();
  const { ref: canvasRef, height: canvasHeight } = useElementSize();

  const scale = viewportWidth > 0 ? viewportWidth / BASE_A4_WIDTH_PX : 1;
  const unscaledCanvasHeight = Math.max(BASE_A4_HEIGHT_PX, canvasHeight || 0);
  const scaledCanvasHeight = unscaledCanvasHeight * scale;

  return (
    <Box ref={viewportRef} className={viewportClassName}>
      <Box style={{ height: `${scaledCanvasHeight}px` }}>
        <Box
          style={{
            width: `${BASE_A4_WIDTH_PX}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <Box
            ref={canvasRef}
            className={canvasClassName}
            style={{ minHeight: `${BASE_A4_HEIGHT_PX}px` }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
