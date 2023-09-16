import React, { useCallback, useEffect, useRef } from "react";
import { fixIndex } from "iztro/lib/utils";

type LineProps = {
  soulIndex: number;
};

export const Line = ({ soulIndex }: LineProps) => {
  const line = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const idx = soulIndex;
    const canvasDom = line.current;

    if (!canvasDom || idx < 0) {
      return;
    }

    const { height, width } = (
      canvasDom as HTMLElement
    ).getBoundingClientRect();

    canvasDom.width = width;
    canvasDom.height = height;

    const w = width / 2;
    const h = height / 2;
    const points = [
      [0, h * 2],
      [0, h * 1.5],
      [0, h * 0.5],
      [0, 0],
      [w * 0.5, 0],
      [w * 1.5, 0],
      [w * 2, 0],
      [w * 2, h * 0.5],
      [w * 2, h * 1.5],
      [w * 2, h * 2],
      [w * 1.5, h * 2],
      [w * 0.5, h * 2],
    ];

    //第二步：获取上下文
    const canvasCtx = canvasDom.getContext("2d");

    if (!canvasCtx) {
      return;
    }

    canvasCtx.clearRect(0, 0, canvasDom.width, canvasDom.height);

    canvasCtx.strokeStyle = "rgba(245,0,0,0.3)";
    canvasCtx.lineWidth = 1;

    const dgIdx = fixIndex(idx + 6);
    const q4Idx = fixIndex(idx + 4);
    const h4Idx = fixIndex(idx - 4);

    canvasCtx.beginPath();
    canvasCtx.moveTo(points[dgIdx][0], points[dgIdx][1]);
    canvasCtx.lineTo(points[idx][0], points[idx][1]);
    canvasCtx.lineTo(points[q4Idx][0], points[q4Idx][1]);
    canvasCtx.lineTo(points[h4Idx][0], points[h4Idx][1]);
    canvasCtx.lineTo(points[idx][0], points[idx][1]);

    canvasCtx.stroke();
  }, [soulIndex]);

  return (
    <canvas
      id="palace-line"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        userSelect: "none",
        pointerEvents: "none",
      }}
      ref={line}
    ></canvas>
  );
};
