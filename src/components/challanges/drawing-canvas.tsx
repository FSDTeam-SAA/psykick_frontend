"use client";

import type React from "react";

import { useRef, useEffect, useState } from "react";
import { Undo2, Redo2, X, Maximize, Link2 } from "lucide-react";
import { useChallengeStore } from "@/store/use-challenge-store";

type TextBox = {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
};

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [textBoxes, setTextBoxes] = useState<TextBox[]>([]);
  const [activeTextBox, setActiveTextBox] = useState<string | null>(null);
  const [isDraggingText, setIsDraggingText] = useState(false);
  const [dragStartPos, setDragStartPos] = useState({ x: 0, y: 0 });
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInputPos, setTextInputPos] = useState({ x: 0, y: 0 });
  const [textInputValue, setTextInputValue] = useState("");
  const [originalCanvasSize, setOriginalCanvasSize] = useState({
    width: 0,
    height: 0,
  });
  const [originalDrawing, setOriginalDrawing] = useState<string | null>(null);
  const [canvasInitialized, setCanvasInitialized] = useState(false);
  const [isRedrawing, setIsRedrawing] = useState(false);

  const {
    currentTool,
    currentColor,
    brushSize,
    currentDrawing,
    drawingHistory,
    currentStep,
    updateDrawing,
    addToHistory,
    undo,
    redo,
    setTool,
    setColor,
    setBrushSize,
    // clearCanvas: storeClearCanvas,
  } = useChallengeStore();

  // Initialize canvas
  useEffect(() => {
    if (canvasInitialized) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;

    // Store original canvas size
    setOriginalCanvasSize({
      width: canvas.width,
      height: canvas.height,
    });

    const context = canvas.getContext("2d");
    if (!context) return;

    context.scale(2, 2);
    context.lineCap = "round";
    context.strokeStyle = currentColor;
    context.lineWidth = brushSize;
    contextRef.current = context;

    // Restore previous drawing if available
    if (currentDrawing) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);
        setOriginalDrawing(currentDrawing);
      };
      img.src = currentDrawing;
    } else {
      setOriginalDrawing(null);
    }

    setCanvasInitialized(true);
  }, [currentDrawing, currentColor, brushSize, canvasInitialized]);

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
        context.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
        context.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);

        // If not in fullscreen, update original drawing
        if (!fullscreen) {
          setOriginalDrawing(drawingHistory[currentStep]);
        }

        setIsRedrawing(false);
      };
      img.src = drawingHistory[currentStep];
    }
  }, [drawingHistory, currentStep, canvasInitialized, fullscreen, isRedrawing]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (fullscreen) return; // Skip resize handling in fullscreen mode

      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (!canvas || !context) return;

      // Save current drawing
      const currentImageData = canvas.toDataURL();

      // Resize canvas
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;

      // Restore context properties
      context.scale(2, 2);
      context.lineCap = "round";
      context.strokeStyle = currentColor;
      context.lineWidth = brushSize;

      // Restore drawing
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);
      };
      img.src = currentImageData;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentColor, brushSize, fullscreen]);

  // Update context when tool or color changes
  useEffect(() => {
    if (!contextRef.current || !canvasInitialized) return;
    contextRef.current.strokeStyle = currentColor;
    contextRef.current.lineWidth = brushSize;
  }, [currentColor, brushSize, canvasInitialized]);

  // Save canvas state - but don't call this inside useEffect to avoid infinite loops
  const saveCanvasState = () => {
    if (!canvasRef.current) return;
    const imageData = canvasRef.current.toDataURL();
    updateDrawing(imageData);

    // Only update original drawing when in normal mode
    if (!fullscreen) {
      setOriginalDrawing(imageData);
    }

    addToHistory();
  };

  // Clear canvas function
  // const clearCanvas = () => {
  //   if (!canvasRef.current || !contextRef.current) return

  //   contextRef.current.clearRect(0, 0, canvasRef.current.width / 2, canvasRef.current.height / 2)
  //   setTextBoxes([])
  //   storeClearCanvas()
  //   setOriginalDrawing(null)
  // }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
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
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;

    // Handle text dragging
    if (isDraggingText && activeTextBox) {
      const deltaX = offsetX - dragStartPos.x;
      const deltaY = offsetY - dragStartPos.y;

      setTextBoxes((prev) =>
        prev.map((box) => {
          if (box.id === activeTextBox) {
            return {
              ...box,
              x: box.x + deltaX,
              y: box.y + deltaY,
            };
          }
          return box;
        }),
      );

      setDragStartPos({ x: offsetX, y: offsetY });

      // Redraw canvas with updated text positions
      const canvas = canvasRef.current;
      const context = contextRef.current;
      if (!canvas || !context || !currentDrawing) return;

      // Clear canvas
      context.clearRect(0, 0, canvas.width / 2, canvas.height / 2);

      // Redraw the base image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        context.drawImage(img, 0, 0, canvas.width / 2, canvas.height / 2);

        // Draw text boxes
        textBoxes.forEach((box) => {
          context.font = `${box.fontSize}px Arial`;
          context.fillStyle = box.color;
          context.fillText(
            box.text,
            box.id === activeTextBox ? box.x + deltaX : box.x,
            box.id === activeTextBox ? box.y + deltaY : box.y,
          );
        });
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
  };

  const endDrawing = () => {
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
  };

  const handleTextSubmit = (e: React.FormEvent) => {
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

    setTextBoxes((prev) => [...prev, newTextBox]);

    // Draw text
    contextRef.current.font = `${newTextBox.fontSize}px Arial`;
    contextRef.current.fillStyle = newTextBox.color;
    contextRef.current.fillText(textInputValue, textInputPos.x, textInputPos.y);

    // Save current state to history
    saveCanvasState();

    // Reset text input
    setTextInputValue("");
    setShowTextInput(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Store original drawing before going fullscreen
      if (canvasRef.current && !fullscreen) {
        const currentImageData = canvasRef.current.toDataURL();
        setOriginalDrawing(currentImageData);
      }

      const container = containerRef.current;
      if (container) {
        container.requestFullscreen().then(() => {
          setFullscreen(true);

          // Resize canvas to fit fullscreen
          setTimeout(() => {
            if (canvasRef.current && contextRef.current) {
              // Resize canvas to full window dimensions
              canvasRef.current.style.height = "calc(100vh - 42px)";
              canvasRef.current.width = window.innerWidth * 2;
              canvasRef.current.height = (window.innerHeight - 42) * 2;

              // Restore context properties
              contextRef.current.scale(2, 2);
              contextRef.current.lineCap = "round";
              contextRef.current.strokeStyle = currentColor;
              contextRef.current.lineWidth = brushSize;

              // Redraw the original drawing at the new size
              if (originalDrawing) {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.onload = () => {
                  // Calculate scaling to maintain aspect ratio
                  const targetWidth = canvasRef.current!.width / 2;
                  const targetHeight = canvasRef.current!.height / 2;

                  // Calculate dimensions that preserve aspect ratio
                  const aspectRatio = img.width / img.height;
                  let drawWidth = targetWidth;
                  let drawHeight = targetWidth / aspectRatio;

                  if (drawHeight > targetHeight) {
                    drawHeight = targetHeight;
                    drawWidth = targetHeight * aspectRatio;
                  }

                  // Center the image
                  const offsetX = (targetWidth - drawWidth) / 2;
                  const offsetY = (targetHeight - drawHeight) / 2;

                  // Draw the image centered and scaled
                  contextRef.current?.clearRect(
                    0,
                    0,
                    targetWidth,
                    targetHeight,
                  );
                  contextRef.current?.drawImage(
                    img,
                    offsetX,
                    offsetY,
                    drawWidth,
                    drawHeight,
                  );
                };
                img.src = originalDrawing;
              }
            }
          }, 100);
        });
      }
    } else {
      document.exitFullscreen().then(() => {
        setFullscreen(false);

        // Restore canvas to original size
        setTimeout(() => {
          if (
            canvasRef.current &&
            contextRef.current &&
            originalCanvasSize.width > 0
          ) {
            // Reset canvas size to original dimensions
            canvasRef.current.style.height = "400px";
            canvasRef.current.width = originalCanvasSize.width;
            canvasRef.current.height = originalCanvasSize.height;

            // Restore context properties
            contextRef.current.scale(2, 2);
            contextRef.current.lineCap = "round";
            contextRef.current.strokeStyle = currentColor;
            contextRef.current.lineWidth = brushSize;

            // Redraw the original drawing
            if (originalDrawing) {
              const img = new Image();
              img.crossOrigin = "anonymous";
              img.onload = () => {
                contextRef.current?.clearRect(
                  0,
                  0,
                  canvasRef.current!.width / 2,
                  canvasRef.current!.height / 2,
                );
                contextRef.current?.drawImage(
                  img,
                  0,
                  0,
                  canvasRef.current!.width / 2,
                  canvasRef.current!.height / 2,
                );
              };
              img.src = originalDrawing;
            }
          }
        }, 100);
      });
    }
  };

  // Custom undo function to handle text boxes
  const handleUndo = () => {
    // Remove the last text box if it was the last action
    if (textBoxes.length > 0) {
      const lastTextBox = textBoxes[textBoxes.length - 1];
      const lastTextTime = new Date(Number.parseInt(lastTextBox.id)).getTime();
      const currentTime = Date.now();

      // If the last text box was added recently (within 1 second of the last action)
      // and there's a drawing history, assume it was the last action
      if (currentTime - lastTextTime < 1000 && drawingHistory.length > 0) {
        setTextBoxes((prev) => prev.slice(0, -1));
      }
    }

    // Call the store's undo function
    undo();
  };

  // Custom redo function
  const handleRedo = () => {
    redo();
  };

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
        {/* Toolbar - Exact match to the screenshot */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-2 z-10 bg-black">
          <div className="flex items-center space-x-4">
            {/* Undo/Redo buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleUndo}
                className="p-1 text-white hover:bg-gray-800 rounded"
              >
                <Undo2 size={18} />
              </button>
              <button
                onClick={handleRedo}
                className="p-1 text-white hover:bg-gray-800 rounded"
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
            >
              <div className="w-6 h-6 flex items-center justify-center bg-white text-black font-bold">
                T
              </div>
            </button>

            {/* Eraser */}
            <button
              onClick={() => setTool("eraser")}
              className={`p-1 text-white hover:bg-gray-800 rounded ${currentTool === "eraser" ? "bg-gray-700" : ""}`}
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
                >
                  <div className="w-1 h-full bg-white rounded-full"></div>
                </button>
              ))}
            </div>

            {/* Link tool */}
            <button className="p-1 text-white hover:bg-gray-800 rounded">
              <Link2 size={18} />
            </button>

            {/* Color selection with smart color picker */}
            <div className="relative group">
              <button
                onClick={() => {
                  const colorPicker = document.getElementById("color-picker");
                  if (colorPicker) {
                    colorPicker.click();
                  }
                }}
                className="flex items-center justify-center p-1 text-white hover:bg-gray-800 rounded"
              >
                <div
                  className="w-5 h-5 rounded"
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
                />
              </button>

              {/* Color palette dropdown */}
              <div className="absolute left-0 mt-1 hidden group-hover:flex flex-wrap bg-gray-800 p-1 rounded shadow-lg z-20 w-32">
                {colorPalette.map((color) => (
                  <button
                    key={color}
                    onClick={() => {
                      setColor(color);
                      setTool("pencil");
                    }}
                    className="w-6 h-6 m-1 rounded border border-gray-600 hover:border-white"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Brush size slider */}
          <div className="flex items-center bg-white rounded-lg px-4 py-2 w-64 mx-4">
            <div className="text-purple-600 mr-2">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8L8 13M8 13L13 8M8 13V21M21 11V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V11"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={(e) => setBrushSize(Number.parseInt(e.target.value))}
              className="flex-1 accent-purple-600"
            />
          </div>

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            className="p-1 text-white hover:bg-gray-800 rounded"
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
