/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useRef, useEffect, useState, useCallback } from "react";
import { Undo2, Redo2, X, Maximize } from "lucide-react";
import { useARVStore } from "@/store/use-arv-store";

type TextBox = {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
};

type DrawingCanvasProps = {
  mode: "arv";
};

export default function EnhancedDrawingCanvas({ mode }: DrawingCanvasProps) {
  // Get state and actions from the store
  const {
    currentTool,
    currentColor,
    brushSize,
    currentDrawing,
    drawingHistory,
    currentStep,
    textBoxes,
    updateDrawing,
    addToHistory,
    undo,
    redo,
    setTool,
    setColor,
    setBrushSize,
    clearCanvas,
    updateTextBoxes,
    addTextBox,
    updateTextBox,
    removeTextBox,
  } = useARVStore();

  // Local state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [activeTextBox, setActiveTextBox] = useState<string | null>(null);
  const [editingTextBox, setEditingTextBox] = useState<string | null>(null);
  const [editingTextValue, setEditingTextValue] = useState("");
  const [isDraggingText, setIsDraggingText] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInputPos, setTextInputPos] = useState({ x: 0, y: 0 });
  const [textInputValue, setTextInputValue] = useState("");
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [canvasInitialized, setCanvasInitialized] = useState(false);
  const [isRedrawing, setIsRedrawing] = useState(false);
  const [canvasScale, setCanvasScale] = useState(2); // For high DPI screens

  // Function to redraw all text boxes
  const redrawTextBoxes = useCallback(() => {
    const context = contextRef.current;
    if (!context || !textBoxes.length) return;

    textBoxes.forEach((box) => {
      context.font = `${box.fontSize}px Arial`;
      context.fillStyle = box.color;
      context.fillText(box.text, box.x, box.y);
    });
  }, [textBoxes]);

  // Initialize canvas with proper scaling for high DPI displays
  const initializeCanvas = useCallback(() => {
    if (canvasInitialized) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions with proper scaling
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;

    // Scale for high DPI displays
    const scale = window.devicePixelRatio || 1;
    setCanvasScale(scale);

    canvas.width = displayWidth * scale;
    canvas.height = displayHeight * scale;

    // Store canvas size
    setCanvasSize({
      width: canvas.width,
      height: canvas.height,
    });

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    context.scale(scale, scale);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = currentColor;
    context.lineWidth = brushSize;
    contextRef.current = context;

    // Restore previous drawing if available
    if (currentDrawing) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (context && canvas) {
          context.clearRect(0, 0, canvas.width / scale, canvas.height / scale);
          context.drawImage(
            img,
            0,
            0,
            canvas.width / scale,
            canvas.height / scale,
          );
          redrawTextBoxes();
        }
      };
      img.src = currentDrawing;
    }

    setCanvasInitialized(true);
  }, [
    canvasInitialized,
    currentColor,
    brushSize,
    currentDrawing,
    redrawTextBoxes,
  ]);

  // Initialize canvas on component mount
  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  // Update canvas when drawing history changes (for undo/redo)
  useEffect(() => {
    if (!canvasInitialized || isRedrawing) return;

    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    // If we have a current drawing from history, redraw it
    if (
      drawingHistory.length > 0 &&
      currentStep >= 0 &&
      drawingHistory[currentStep]
    ) {
      setIsRedrawing(true);
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        if (context && canvas) {
          context.clearRect(
            0,
            0,
            canvas.width / canvasScale,
            canvas.height / canvasScale,
          );
          context.drawImage(
            img,
            0,
            0,
            canvas.width / canvasScale,
            canvas.height / canvasScale,
          );
          redrawTextBoxes();
          setIsRedrawing(false);
        }
      };
      img.src = drawingHistory[currentStep];
    }
  }, [
    drawingHistory,
    currentStep,
    canvasInitialized,
    isRedrawing,
    canvasScale,
    redrawTextBoxes,
  ]);

  // Update context when tool or color changes
  useEffect(() => {
    if (!contextRef.current || !canvasInitialized) return;
    contextRef.current.strokeStyle = currentColor;
    contextRef.current.lineWidth = brushSize;
  }, [currentColor, brushSize, canvasInitialized]);

  // Save canvas state
  const saveCanvasState = useCallback(() => {
    if (!canvasRef.current) return;
    const imageData = canvasRef.current.toDataURL();
    updateDrawing(imageData);
    addToHistory();
  }, [updateDrawing, addToHistory]);

  // Start drawing
  const startDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const { offsetX, offsetY } = e.nativeEvent;

      // If text tool is active, place text input at click position
      if (currentTool === "text") {
        setTextInputPos({ x: offsetX, y: offsetY });
        setShowTextInput(true);
        return;
      }

      // Check if clicking on a text box
      const clickedTextBox = textBoxes.find((box) => {
        const textWidth = contextRef.current?.measureText(box.text).width || 0;
        return (
          offsetX >= box.x - 5 &&
          offsetX <= box.x + textWidth + 5 &&
          offsetY >= box.y - box.fontSize &&
          offsetY <= box.y + 5
        );
      });

      if (clickedTextBox) {
        setActiveTextBox(clickedTextBox.id);
        setIsDraggingText(true);
        setDragStartPos({ x: offsetX, y: offsetY });
        return;
      }

      if (!contextRef.current) return;

      contextRef.current.beginPath();
      contextRef.current.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    },
    [currentTool, textBoxes],
  );

  // Draw
  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const { offsetX, offsetY } = e.nativeEvent;

      // Handle text dragging
      if (isDraggingText && activeTextBox) {
        const deltaX = offsetX - dragStartPos.x;
        const deltaY = offsetY - dragStartPos.y;

        const updatedTextBoxes = textBoxes.map((box) => {
          if (box.id === activeTextBox) {
            return {
              ...box,
              x: box.x + deltaX,
              y: box.y + deltaY,
            };
          }
          return box;
        });

        updateTextBoxes(updatedTextBoxes);
        setDragStartPos({ x: offsetX, y: offsetY });

        // Redraw canvas with updated text positions
        const canvas = canvasRef.current;
        const context = contextRef.current;
        if (!canvas || !context || !currentDrawing) return;

        // Clear canvas
        context.clearRect(
          0,
          0,
          canvas.width / canvasScale,
          canvas.height / canvasScale,
        );

        // Redraw the base image
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          if (context && canvas) {
            context.drawImage(
              img,
              0,
              0,
              canvas.width / canvasScale,
              canvas.height / canvasScale,
            );

            // Draw text boxes
            updatedTextBoxes.forEach((box) => {
              context.font = `${box.fontSize}px Arial`;
              context.fillStyle = box.color;
              context.fillText(box.text, box.x, box.y);
            });
          }
        };
        img.src = currentDrawing;

        return;
      }

      if (!contextRef.current || !isDrawing) return;

      if (currentTool === "pencil") {
        contextRef.current.globalCompositeOperation = "source-over";
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
      } else if (currentTool === "eraser") {
        contextRef.current.globalCompositeOperation = "destination-out";
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
      }
    },
    [
      isDraggingText,
      activeTextBox,
      textBoxes,
      dragStartPos,
      currentDrawing,
      isDrawing,
      currentTool,
      canvasScale,
      updateTextBoxes,
    ],
  );

  // End drawing
  const endDrawing = useCallback(() => {
    if (isDraggingText) {
      setIsDraggingText(false);
      setActiveTextBox(null);
      saveCanvasState();
      return;
    }

    if (!contextRef.current || !isDrawing) return;

    contextRef.current.closePath();
    setIsDrawing(false);

    // Reset composite operation
    contextRef.current.globalCompositeOperation = "source-over";

    // Save current state to history
    saveCanvasState();
  }, [isDraggingText, isDrawing, saveCanvasState]);

  // Handle text submission
  const handleTextSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!contextRef.current || !canvasRef.current || !textInputValue.trim()) {
        setShowTextInput(false);
        return;
      }

      // Add text box
      const newTextBox: TextBox = {
        id: Date.now().toString(),
        text: textInputValue,
        x: textInputPos.x,
        y: textInputPos.y,
        color: currentColor,
        fontSize: brushSize * 2,
      };

      addTextBox(newTextBox);

      // Draw text
      contextRef.current.font = `${newTextBox.fontSize}px Arial`;
      contextRef.current.fillStyle = newTextBox.color;
      contextRef.current.fillText(
        textInputValue,
        textInputPos.x,
        textInputPos.y,
      );

      // Save current state to history
      saveCanvasState();

      // Reset text input
      setTextInputValue("");
      setShowTextInput(false);
    },
    [
      textInputValue,
      textInputPos,
      currentColor,
      brushSize,
      addTextBox,
      saveCanvasState,
    ],
  );

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      const container = containerRef.current;
      if (container) {
        container.requestFullscreen().then(() => {
          setFullscreen(true);
        });
      }
    } else {
      document.exitFullscreen().then(() => {
        setFullscreen(false);
      });
    }
  }, []);

  // Define pencil sizes for the toolbar
  const pencilSizes = [
    { size: 2, width: "w-4", height: "h-4" },
    { size: 4, width: "w-5", height: "h-5" },
    { size: 6, width: "w-6", height: "h-6" },
    { size: 8, width: "w-7", height: "h-7" },
  ];

  // Available colors for the color palette
  const colorPalette = [
    "#000000", // Black
    "#ff0000", // Red
    "#00ff00", // Green
    "#0000ff", // Blue
    "#ffff00", // Yellow
    "#ff00ff", // Magenta
    "#00ffff", // Cyan
    "#ffffff", // White
  ];

  return (
    <div className="flex flex-col w-full" ref={containerRef}>
      <div className="relative w-full">
        {/* Toolbar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-2 z-10 bg-black">
          <div className="flex items-center space-x-4">
            {/* Undo/Redo buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={undo}
                className="p-1 text-white hover:bg-gray-800 rounded"
                aria-label="Undo"
              >
                <Undo2 size={18} />
              </button>
              <button
                onClick={redo}
                className="p-1 text-white hover:bg-gray-800 rounded"
                aria-label="Redo"
              >
                <Redo2 size={18} />
              </button>
            </div>

            {/* Text tool */}
            <button
              onClick={() => {
                setTool("text");
              }}
              className={`p-1 text-white hover:bg-gray-800 rounded ${currentTool === "text" ? "bg-gray-700" : ""}`}
              aria-label="Text tool"
              aria-pressed={currentTool === "text"}
            >
              <div className="w-6 h-6 flex items-center justify-center bg-white text-black font-bold">
                T
              </div>
            </button>

            {/* Eraser */}
            <button
              onClick={() => setTool("eraser")}
              className={`p-1 text-white hover:bg-gray-800 rounded ${currentTool === "eraser" ? "bg-gray-700" : ""}`}
              aria-label="Eraser tool"
              aria-pressed={currentTool === "eraser"}
            >
              <X size={18} />
            </button>

            {/* Pencil sizes */}
            <div className="flex items-center space-x-1">
              {pencilSizes.map((pencil) => (
                <button
                  key={pencil.size}
                  onClick={() => {
                    setTool("pencil");
                    setBrushSize(pencil.size);
                  }}
                  className={`${pencil.width} ${pencil.height} flex items-center justify-center ${
                    currentTool === "pencil" && brushSize === pencil.size
                      ? "border border-white"
                      : ""
                  }`}
                  aria-label={`Pencil size ${pencil.size}`}
                  aria-pressed={
                    currentTool === "pencil" && brushSize === pencil.size
                  }
                >
                  <div className="w-1 h-full bg-white rounded-full"></div>
                </button>
              ))}
            </div>

            {/* Color selection with modern color picker */}
            <div className="relative group">
              <button
                className="flex items-center justify-center p-1 text-white hover:bg-gray-800 rounded"
                onClick={() => {
                  const colorPicker = document.getElementById("color-picker");
                  if (colorPicker) {
                    colorPicker.click();
                  }
                }}
                aria-label="Color picker"
              >
                <div
                  className="w-5 h-5 rounded-full border border-white"
                  style={{ backgroundColor: currentColor }}
                />
                <input
                  id="color-picker"
                  type="color"
                  value={currentColor}
                  onChange={(e) => {
                    setColor(e.target.value);
                    setTool("pencil");
                  }}
                  className="absolute opacity-0 w-0 h-0"
                  aria-hidden="true"
                />
              </button>

              {/* Modern color palette dropdown */}
              <div className="absolute left-0 mt-2 hidden group-hover:grid grid-cols-4 gap-1 bg-gray-800 p-2 rounded-lg shadow-lg z-20 w-32">
                {colorPalette.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setColor(color);
                      setTool("pencil");
                    }}
                    className="w-6 h-6 rounded-full hover:scale-110 transition-transform"
                    style={{
                      backgroundColor: color,
                      boxShadow:
                        color === currentColor ? "0 0 0 2px white" : "none",
                    }}
                    aria-label={`Select color ${color}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Brush size slider */}
          <div className="flex items-center bg-white rounded-lg px-4 py-2 w-64 mx-4">
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="flex-1 accent-purple-600"
              aria-label="Brush size"
            />
          </div>

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            className="p-1 text-white hover:bg-gray-800 rounded"
            aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            <Maximize size={18} />
          </button>
        </div>

        {/* Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={endDrawing}
            onMouseLeave={endDrawing}
            className={`w-full ${fullscreen ? "h-[calc(100vh-42px)]" : "h-[400px]"} bg-white cursor-crosshair transition-all duration-300`}
            style={{ marginTop: "42px" }} // Add space for the toolbar
          />

          {/* Text input overlay */}
          {showTextInput && (
            <div
              className="absolute bg-white border-2 border-purple-600 p-2 rounded shadow-lg z-20"
              style={{
                left: textInputPos.x + "px",
                top: textInputPos.y + 42 + "px",
                transform: "translate(-50%, -100%)",
              }}
            >
              <form onSubmit={handleTextSubmit} className="flex flex-col">
                <input
                  type="text"
                  value={textInputValue}
                  onChange={(e) => setTextInputValue(e.target.value)}
                  className="border border-gray-300 p-1 mb-2"
                  placeholder="Enter text"
                  autoFocus
                />
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setShowTextInput(false)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-2 py-1 bg-purple-600 text-white rounded"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
