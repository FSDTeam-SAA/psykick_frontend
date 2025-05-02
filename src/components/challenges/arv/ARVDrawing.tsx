"use client";

import { useRef, useEffect } from "react";
import { useARVStore } from "@/store/use-arv-store";

export default function ARVDrawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    currentTool,
    currentColor,
    brushSize,
    currentDrawing,
    updateDrawing,
    addToHistory,
    setStage,
  } = useARVStore();

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Set initial styles
    ctx.strokeStyle = currentTool === "eraser" ? "#ffffff" : currentColor;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = brushSize;

    // Load existing drawing if any
    if (currentDrawing) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
      };
      img.src = currentDrawing;
    } else {
      // Clear canvas
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [currentDrawing, currentColor, brushSize, currentTool]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Update stroke style based on current tool
    ctx.strokeStyle = currentTool === "eraser" ? "#ffffff" : currentColor;

    const rect = canvas.getBoundingClientRect();
    isDrawing = true;
    [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    [lastX, lastY] = [x, y];
  };

  const stopDrawing = () => {
    if (!isDrawing) return;

    isDrawing = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    updateDrawing(canvas.toDataURL());
    addToHistory();
  };

  const handleSubmit = () => {
    if (!currentDrawing) return;
    setStage("selection");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-white mb-6">
          Draw Your Prediction
        </h1>
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-4 mb-4">
            <select
              className="px-4 py-2 rounded bg-gray-800 text-white"
              value={currentTool}
              onChange={(e) =>
                useARVStore
                  .getState()
                  .setTool(e.target.value as "pencil" | "eraser")
              }
            >
              <option value="pencil">Pencil</option>
              <option value="eraser">Eraser</option>
            </select>
            <input
              type="color"
              value={currentColor}
              onChange={(e) => useARVStore.getState().setColor(e.target.value)}
              className="h-10 w-10 rounded cursor-pointer"
            />
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) =>
                useARVStore.getState().setBrushSize(Number(e.target.value))
              }
              className="w-32"
            />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4">
            <canvas
              ref={canvasRef}
              className="w-full border border-gray-300 rounded cursor-crosshair"
              style={{ touchAction: "none" }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
            />
          </div>
          <div className="flex justify-between">
            <button
              onClick={() =>
                canvasRef.current?.getContext("2d")?.clearRect(0, 0, 800, 600)
              }
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Clear
            </button>
            <button
              onClick={handleSubmit}
              disabled={!currentDrawing}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Selection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
