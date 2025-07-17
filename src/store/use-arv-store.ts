/* eslint-disable */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TextBox {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
}

interface ImageChoice {
  id: number;
  src: string;
  description: string;
  selected: boolean;
}

interface ImageData {
  url: string;
  description: string;
}

interface Target {
  gameDuration: any;
  revealDuration: any;
  targetId: string;
  code: string;
  eventName: string;
  eventDescription: string;
  image1: ImageData;
  image2: ImageData;
  image3: ImageData;
  controlImage: string;
  resultImage?: string;
  gameTime: string;
  revealTime: string;
  outcomeTime: string;
}

interface ARVState {
  // User and game identification
  currentUserId: string | null;
  currentGameId: string | null;

  // Canvas state
  currentTool: "pencil" | "text" | "eraser";
  currentColor: string;
  brushSize: number;
  currentDrawing: string | null;
  drawingHistory: string[];
  currentStep: number;
  textBoxes: TextBox[];

  // Game state
  stage: "drawing" | "selection" | "waiting" | "reveal" | "results";
  imageChoices: ImageChoice[];
  selectedImageId: number | null;
  activeTarget: Target | null;
  submissionId: string | null;
  hasSubmitted: boolean;
  isLoading: boolean;
  error: string | null;
}

interface ARVActions {
  // User and game management
  setCurrentUser: (userId: string) => void;
  setCurrentGame: (gameId: string, userId?: string) => void;
  resetCanvasForNewSession: () => void;

  updateDrawing: (drawing: string) => void;
  addToHistory: () => void;
  undo: () => void;
  redo: () => void;
  setTool: (tool: "pencil" | "text" | "eraser") => void;
  setColor: (color: string) => void;
  setBrushSize: (size: number) => void;
  clearCanvas: () => void;
  selectImage: (id: number) => void;
  submitImpression: () => void;
  submitSelection: () => void;
  updateTextBoxes: (textBoxes: TextBox[]) => void;
  addTextBox: (textBox: TextBox) => void;
  updateTextBox: (id: string, updates: Partial<TextBox>) => void;
  removeTextBox: (id: string) => void;
  setActiveTarget: (target: any) => void;
  setSubmissionId: (id: string) => void;
  setStage: (
    stage: "drawing" | "selection" | "waiting" | "reveal" | "results",
  ) => void;
  setHasSubmitted: (submitted: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updatePoints: () => Promise<void>;
  moveToReveal: () => void;
  moveToResults: () => void;
  resetGameState: () => void;
  checkAndResetForNewGame: (newTargetId: string) => void;
}

// Helper function to generate storage key
const getStorageKey = (userId: string | null, gameId: string | null) => {
  if (!userId || !gameId) {
    return "arv-prediction-storage-temp";
  }
  return `arv-prediction-storage-${userId}-${gameId}`;
};

// Helper function to get initial canvas state
function getInitialCanvasState() {
  return {
    currentDrawing: null,
    drawingHistory: [],
    currentStep: -1,
    textBoxes: [],
    currentTool: "pencil" as const,
    currentColor: "#000000",
    brushSize: 2,
    stage: "drawing" as const,
    imageChoices: [],
    selectedImageId: null,
    submissionId: null,
    hasSubmitted: false,
  };
}

export const useARVStore = create<ARVState & ARVActions>()(
  persist(
    (set, get) => ({
      // Initial state
      currentUserId: null,
      currentGameId: null,

      // Initial canvas state
      currentTool: "pencil",
      currentColor: "#000000",
      brushSize: 2,
      currentDrawing: null,
      drawingHistory: [],
      currentStep: -1,
      textBoxes: [],

      // Initial game state
      stage: "drawing",
      imageChoices: [],
      selectedImageId: null,
      activeTarget: null,
      submissionId: null,
      hasSubmitted: false,
      isLoading: false,
      error: null,

      // User and game management actions
      setCurrentUser: (userId: string) => {
        const currentState = get();
        if (currentState.currentUserId !== userId) {
          // User changed, reset canvas state
          set({
            currentUserId: userId,
            currentGameId: null,
            ...getInitialCanvasState(),
          });
        }
      },

      setCurrentGame: (gameId: string, userId?: string) => {
        const currentState = get();
        const newUserId = userId || currentState.currentUserId;

        if (
          currentState.currentGameId !== gameId ||
          currentState.currentUserId !== newUserId
        ) {
          // Game or user changed, reset canvas state
          set({
            currentUserId: newUserId,
            currentGameId: gameId,
            ...getInitialCanvasState(),
          });
        }
      },

      resetCanvasForNewSession: () => {
        set(getInitialCanvasState());
      },

      // Actions implementation
      updateDrawing: (drawing) => set({ currentDrawing: drawing }),

      addToHistory: () => {
        const { drawingHistory, currentDrawing, currentStep } = get();
        if (
          !currentDrawing ||
          (currentStep >= 0 && drawingHistory[currentStep] === currentDrawing)
        ) {
          return;
        }
        const newHistory = [
          ...drawingHistory.slice(0, currentStep + 1),
          currentDrawing,
        ];
        set({
          drawingHistory: newHistory,
          currentStep: newHistory.length - 1,
        });
      },

      undo: () => {
        const { currentStep, drawingHistory } = get();
        if (currentStep > 0) {
          set({
            currentStep: currentStep - 1,
            currentDrawing: drawingHistory[currentStep - 1],
          });
        }
      },

      redo: () => {
        const { currentStep, drawingHistory } = get();
        if (currentStep < drawingHistory.length - 1) {
          set({
            currentStep: currentStep + 1,
            currentDrawing: drawingHistory[currentStep + 1],
          });
        }
      },

      setTool: (tool) => set({ currentTool: tool }),
      setColor: (color) => set({ currentColor: color }),
      setBrushSize: (size) => set({ brushSize: size }),
      clearCanvas: () =>
        set({
          currentDrawing: null,
          drawingHistory: [],
          currentStep: -1,
          textBoxes: [],
        }),

      selectImage: (id) =>
        set((state) => ({
          selectedImageId: id,
          imageChoices: state.imageChoices.map((img) => ({
            ...img,
            selected: img.id === id,
          })),
        })),

      submitImpression: () => {
        console.log("Moving from drawing to selection stage");
        set({ stage: "selection" });
      },

      submitSelection: () => {
        console.log("Moving from selection to waiting stage");
        set({ stage: "waiting" });
      },

      updateTextBoxes: (textBoxes) => set({ textBoxes }),
      addTextBox: (textBox) =>
        set((state) => ({
          textBoxes: [...state.textBoxes, textBox],
        })),

      updateTextBox: (id, updates) =>
        set((state) => ({
          textBoxes: state.textBoxes.map((box) =>
            box.id === id ? { ...box, ...updates } : box,
          ),
        })),

      removeTextBox: (id) =>
        set((state) => ({
          textBoxes: state.textBoxes.filter((box) => box.id !== id),
        })),

      setActiveTarget: (targetData) => {
        // Set the current game when target data is loaded
        const currentState = get();
        if (currentState.currentGameId !== targetData._id) {
          get().setCurrentGame(targetData._id, currentState.currentUserId);
        }

        // Map the API response to our Target interface
        const target: Target = {
          targetId: targetData._id,
          code: targetData.code,
          eventName: targetData.eventName || "",
          eventDescription: targetData.eventDescription || "",
          image1: targetData.image1 || {
            url: "/placeholder.svg?height=300&width=400",
            description: "",
          },
          image2: targetData.image2 || {
            url: "/placeholder.svg?height=300&width=400",
            description: "",
          },
          image3: targetData.image3 || {
            url: "/placeholder.svg?height=300&width=400",
            description: "",
          },
          controlImage:
            targetData.controlImage || "/placeholder.svg?height=300&width=400",
          resultImage: targetData.resultImage,
          gameTime: targetData.gameTime,
          revealTime: targetData.revealTime,
          outcomeTime: targetData.outcomeTime,
        };

        // Create image choices from the target images
        const imageChoices: ImageChoice[] = [
          {
            id: 1,
            src: target.image1.url,
            description: target.image1.description,
            selected: false,
          },
          {
            id: 2,
            src: target.image2.url,
            description: target.image2.description,
            selected: false,
          },
          {
            id: 3,
            src: target.image3.url,
            description: target.image3.description,
            selected: false,
          },
          {
            id: 4,
            src: target.controlImage,
            description: "Control Image",
            selected: false,
          },
        ];

        set({
          activeTarget: target,
          imageChoices,
        });

        console.log("Active target set:", target);
        console.log("Image choices set:", imageChoices);
      },

      setSubmissionId: (id) => set({ submissionId: id }),
      setStage: (stage) => set({ stage }),
      setHasSubmitted: (submitted) => set({ hasSubmitted: submitted }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      moveToReveal: () => {
        console.log("Moving to reveal stage");
        set({ stage: "reveal" });
      },

      moveToResults: () => {
        console.log("Moving to results stage");
        set({ stage: "results" });
      },

      updatePoints: async () => {
        const { submissionId, activeTarget, stage } = get();

        // Don't proceed if already in results stage to prevent duplicate API calls
        if (stage === "results") return;

        if (!submissionId || !activeTarget) return;

        try {
          set({ isLoading: true });
          const token = localStorage.getItem("authToken");

          console.log("Updating points with submission ID:", submissionId);
          console.log("Active target ID:", activeTarget.targetId);

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/userSubmission/update-ARVPoints/${submissionId}`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                ARVTargetId: activeTarget.targetId,
              }),
            },
          );

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Failed to update points");
          }

          console.log("Points updated successfully:", data);

          // Immediately transition to results stage
          get().moveToResults();
        } catch (error) {
          console.error("Error updating points:", error);
          set({ error: (error as Error).message });

          // Even if there's an error, still show results
          get().moveToResults();
        } finally {
          set({ isLoading: false });
        }
      },

      resetGameState: () => {
        console.log("Resetting game state for new game");
        set(getInitialCanvasState());
      },

      checkAndResetForNewGame: (newTargetId: string) => {
        const { currentGameId } = get();

        // If this is a different game than the one we have saved
        if (currentGameId !== newTargetId) {
          console.log(
            "New game detected. Previous:",
            currentGameId,
            "New:",
            newTargetId,
          );
          get().resetGameState();
          set({ currentGameId: newTargetId });
        } else {
          console.log("Same game detected, keeping existing state");
        }
      },
    }),
    {
      name: "arv-prediction-storage",
      partialize: (state) => ({
        currentDrawing: state.currentDrawing,
        drawingHistory: state.drawingHistory,
        currentStep: state.currentStep,
        textBoxes: state.textBoxes,
        submissionId: state.submissionId,
        hasSubmitted: state.hasSubmitted,
        stage: state.stage,
        currentGameId: state.currentGameId,
        currentUserId: state.currentUserId,
        selectedImageId: state.selectedImageId,
      }),
      // Dynamic storage key based on user and game
      storage: {
        getItem: (name) => {
          const state = useARVStore.getState();
          const key = getStorageKey(state.currentUserId, state.currentGameId);
          const item = localStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          const state = useARVStore.getState();
          const key = getStorageKey(state.currentUserId, state.currentGameId);
          localStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: (name) => {
          const state = useARVStore.getState();
          const key = getStorageKey(state.currentUserId, state.currentGameId);
          localStorage.removeItem(key);
        },
      },
    },
  ),
);
