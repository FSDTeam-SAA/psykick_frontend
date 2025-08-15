"use client";

import type React from "react";
import { useRef, useEffect, useState, useCallback } from "react";
import { Undo2, Redo2, X, Maximize } from "lucide-react";

type TextBox = {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
};

type DrawingCanvasProps = {
  onDrawingChange?: (drawing: string) => void;
  disabled?: boolean;
};

export function EnhancedDrawingCanvas({
  onDrawingChange,
  disabled = false,
}: DrawingCanvasProps) {
  // Local state for drawing functionality
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentTool, setCurrentTool] = useState<"pencil" | "eraser" | "text">(
    "pencil",
  );
  const [currentColor, setCurrentColor] = useState("#000000");
  const [brushSize, setBrushSize] = useState(4);
  const [isDrawing, setIsDrawing] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  const [activeTextBox, setActiveTextBox] = useState<string | null>(null);
  const [isDraggingText, setIsDraggingText] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInputPos, setTextInputPos] = useState({ x: 0, y: 0 });
  const [textInputValue, setTextInputValue] = useState("");
  const [canvasInitialized, setCanvasInitialized] = useState(false);
  const [canvasScale, setCanvasScale] = useState(2);
  const [drawingHistory, setDrawingHistory] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(-1);

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

    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return;

    context.scale(scale, scale);
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = currentColor;
    context.lineWidth = brushSize;
    contextRef.current = context;

    setCanvasInitialized(true);
  }, [canvasInitialized, currentColor, brushSize]);

  // Initialize canvas on component mount
  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  // Update context when tool or color changes
  useEffect(() => {
    if (!contextRef.current || !canvasInitialized) return;
    contextRef.current.strokeStyle = currentColor;
    contextRef.current.lineWidth = brushSize;
  }, [currentColor, brushSize, canvasInitialized]);

  // Save canvas state and notify parent
  const saveCanvasState = useCallback(() => {
    if (!canvasRef.current) return;
    const imageData = canvasRef.current.toDataURL();

    // Add to history
    const newHistory = drawingHistory.slice(0, currentStep + 1);
    newHistory.push(imageData);
    setDrawingHistory(newHistory);
    setCurrentStep(newHistory.length - 1);

    // Notify parent component
    if (onDrawingChange) {
      onDrawingChange(imageData);
    }
  }, [drawingHistory, currentStep, onDrawingChange]);

  // Undo function
  const undo = useCallback(() => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);

      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (!canvas || !context) return;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
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
      };
      img.src = drawingHistory[newStep];
    }
  }, [currentStep, drawingHistory, canvasScale, redrawTextBoxes]);

  // Redo function
  const redo = useCallback(() => {
    if (currentStep < drawingHistory.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);

      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (!canvas || !context) return;

      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
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
      };
      img.src = drawingHistory[newStep];
    }
  }, [currentStep, drawingHistory, canvasScale, redrawTextBoxes]);

  // Start drawing
  const startDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (disabled) return;

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
    [currentTool, textBoxes, disabled],
  );

  // Draw
  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (disabled) return;

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

        setTextBoxes(updatedTextBoxes);
        setDragStartPos({ x: offsetX, y: offsetY });
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
      isDrawing,
      currentTool,
      disabled,
    ],
  );

  // End drawing
  const endDrawing = useCallback(() => {
    if (disabled) return;

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
  }, [isDraggingText, isDrawing, saveCanvasState, disabled]);

  // Handle text submission
  const handleTextSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (
        disabled ||
        !contextRef.current ||
        !canvasRef.current ||
        !textInputValue.trim()
      ) {
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

      setTextBoxes((prev) => [...prev, newTextBox]);

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
      saveCanvasState,
      disabled,
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
                disabled={disabled || currentStep <= 0}
                className="p-1 text-white hover:bg-gray-800 rounded disabled:opacity-50"
                aria-label="Undo"
              >
                <Undo2 size={18} />
              </button>
              <button
                onClick={redo}
                disabled={disabled || currentStep >= drawingHistory.length - 1}
                className="p-1 text-white hover:bg-gray-800 rounded disabled:opacity-50"
                aria-label="Redo"
              >
                <Redo2 size={18} />
              </button>
            </div>

            {/* Text tool */}
            <button
              onClick={() => setCurrentTool("text")}
              disabled={disabled}
              className={`p-1 text-white hover:bg-gray-800 rounded disabled:opacity-50 ${currentTool === "text" ? "bg-gray-700" : ""}`}
              aria-label="Text tool"
              aria-pressed={currentTool === "text"}
            >
              <div className="w-6 h-6 flex items-center justify-center bg-white text-black font-bold">
                T
              </div>
            </button>

            {/* Eraser */}
            <button
              onClick={() => setCurrentTool("eraser")}
              disabled={disabled}
              className={`p-1 text-white hover:bg-gray-800 rounded disabled:opacity-50 ${currentTool === "eraser" ? "bg-gray-700" : ""}`}
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
                    setCurrentTool("pencil");
                    setBrushSize(pencil.size);
                  }}
                  disabled={disabled}
                  className={`${pencil.width} ${pencil.height} flex items-center justify-center disabled:opacity-50 ${
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

            {/* Color selection */}
            <div className="relative group">
              <button
                className="flex items-center justify-center p-1 text-white hover:bg-gray-800 rounded disabled:opacity-50"
                disabled={disabled}
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
                    setCurrentColor(e.target.value);
                    setCurrentTool("pencil");
                  }}
                  disabled={disabled}
                  className="absolute opacity-0 w-0 h-0"
                  aria-hidden="true"
                />
              </button>

              {/* Color palette dropdown */}
              <div className="absolute left-0 mt-2 hidden group-hover:grid grid-cols-4 gap-1 bg-gray-800 p-2 rounded-lg shadow-lg z-20 w-32">
                {colorPalette.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setCurrentColor(color);
                      setCurrentTool("pencil");
                    }}
                    disabled={disabled}
                    className="w-6 h-6 rounded-full hover:scale-110 transition-transform disabled:opacity-50"
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
              disabled={disabled}
              className="flex-1 accent-purple-600 disabled:opacity-50"
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
            className={`w-full ${fullscreen ? "h-[calc(100vh-42px)]" : "h-[400px]"} bg-white transition-all duration-300 ${
              disabled ? "cursor-not-allowed opacity-50" : "cursor-crosshair"
            }`}
            style={{ marginTop: "42px" }}
          />

          {/* Disabled overlay */}
          {disabled && (
            <div
              className="absolute inset-0 bg-gray-500/20 flex items-center justify-center"
              style={{ marginTop: "42px" }}
            >
              <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                <p className="text-gray-700 font-medium">
                  Drawing disabled outside game time
                </p>
              </div>
            </div>
          )}

          {/* Text input overlay */}
          {showTextInput && !disabled && (
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
