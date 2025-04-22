/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ImageChoice = {
  id: number;
  src: string;
  selected: boolean;
  order: number | null;
};

type ChallengeState = {
  // Challenge data
  challengeCode: string;
  revealTime: string;
  timer: {
    hours: number;
    minutes: number;
    seconds: number;
  };

  // Drawing state
  drawingHistory: string[];
  currentDrawing: string | null;
  currentStep: number;
  textBoxes: Array<{
    id: string;
    text: string;
    x: number;
    y: number;
    color: string;
    fontSize: number;
  }>;

  // Tool state
  currentTool: "pencil" | "text" | "eraser";
  currentColor: string;
  brushSize: number;

  // Modal state
  showTMCInfo: boolean;
  dontShowTMCAgain: boolean;

  // Image selection
  imageChoices: ImageChoice[];
  showImageSelection: boolean;

  // Results
  submitted: boolean;
  waitingForResults: boolean;
  targetMatched: boolean;
  pointsEarned: number;
  targetImage: string | null;

  // User data
  userRank: number;
  userTier: string;

  // Actions
  setTimer: (hours: number, minutes: number, seconds: number) => void;
  updateDrawing: (drawing: string) => void;
  addToHistory: () => void;
  undo: () => void;
  redo: () => void;
  setTool: (tool: "pencil" | "text" | "eraser") => void;
  setColor: (color: string) => void;
  setBrushSize: (size: number) => void;
  clearCanvas: () => void;
  toggleTMCInfo: () => void;
  setDontShowTMCAgain: (value: boolean) => void;
  selectImage: (id: number) => void;
  submitImpression: () => void;
  submitChoices: () => void;
  revealResults: () => void;
  closeTMCInfo: () => void;
  updateTextBoxes: (textBoxes: any[]) => void;
  addTextBox: (textBox: any) => void;
  updateTextBox: (id: string, updates: Partial<any>) => void;
  removeTextBox: (id: string) => void;
};

export const useChallengeStore = create<ChallengeState>()(
  persist(
    (set, get) => ({
      // Initial state
      challengeCode: "ABC-25G",
      revealTime: "20/05/2026",
      timer: {
        hours: 23,
        minutes: 34,
        seconds: 57,
      },

      drawingHistory: [],
      currentDrawing: null,
      currentStep: -1,
      textBoxes: [],

      currentTool: "pencil",
      currentColor: "#000000",
      brushSize: 5,

      showTMCInfo: false,
      dontShowTMCAgain: false,

      imageChoices: [
        {
          id: 1,
          src: "/assets/challenges/house.png",
          selected: false,
          order: null,
        },
        {
          id: 2,
          src: "/assets/challenges/Rectangle 52.png",
          selected: false,
          order: null,
        },
        {
          id: 3,
          src: "/assets/challenges/Rectangle 53.png",
          selected: false,
          order: null,
        },
        {
          id: 4,
          src: "/assets/challenges/Rectangle 54.png",
          selected: false,
          order: null,
        },
        {
          id: 5,
          src: "/assets/challenges/Rectangle 55.png",
          selected: false,
          order: null,
        },
        {
          id: 6,
          src: "/assets/challenges/Rectangle 57.png",
          selected: false,
          order: null,
        },
      ],
      showImageSelection: false,

      submitted: false,
      waitingForResults: false,
      targetMatched: false,
      pointsEarned: 0,
      targetImage: null,

      userRank: 12,
      userTier: "NOVICE SEEKER",

      // Actions
      setTimer: (hours, minutes, seconds) =>
        set({ timer: { hours, minutes, seconds } }),

      updateDrawing: (drawing) => set({ currentDrawing: drawing }),

      addToHistory: () => {
        const { drawingHistory, currentDrawing, currentStep } = get();
        // Only add to history if the drawing has changed and is not null
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

      toggleTMCInfo: () =>
        set((state) => ({ showTMCInfo: !state.showTMCInfo })),

      closeTMCInfo: () => {
        set({
          showTMCInfo: false,
          showImageSelection: true, // Show image selection after closing the modal
        });
      },

      setDontShowTMCAgain: (value) => set({ dontShowTMCAgain: value }),

      selectImage: (id) => {
        const { imageChoices } = get();

        // Count how many are already selected
        const selectedCount = imageChoices.filter((img) => img.selected).length;

        // If this image is already selected, unselect it
        const updatedChoices = imageChoices.map((img) => {
          if (img.id === id) {
            if (img.selected) {
              // If unselecting, adjust order of other selections
              // const unselectedOrder = img.order;
              return { ...img, selected: false, order: null };
            } else {
              // If selecting and we have less than 2 selected, add it
              if (selectedCount < 2) {
                return { ...img, selected: true, order: selectedCount + 1 };
              }
            }
          }
          return img;
        });

        set({ imageChoices: updatedChoices });
      },

      submitImpression: () => {
        // Show TMC info if user hasn't opted out
        if (!get().dontShowTMCAgain) {
          set({ showTMCInfo: true });
        } else {
          // If user opted out, show image selection directly
          set({ showImageSelection: true });
        }
      },

      submitChoices: () => {
        set({
          submitted: true,
          waitingForResults: true,
          showImageSelection: false,
        });

        // Simulate waiting for results
        setTimeout(() => {
          set({
            waitingForResults: false,
            targetMatched: true,
            pointsEarned: 25,
            targetImage: "/assets/challenges/house.png",
          });
        }, 3000);
      },

      revealResults: () => {
        set({
          waitingForResults: false,
          targetMatched: true,
          pointsEarned: 25,
          targetImage: "/assets/challenges/house.png",
        });
      },

      // New text box actions
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
    }),
    {
      name: "psykick-challenge-storage",
      partialize: (state) => ({
        dontShowTMCAgain: state.dontShowTMCAgain,
        currentDrawing: state.currentDrawing,
        drawingHistory: state.drawingHistory,
        currentStep: state.currentStep,
        textBoxes: state.textBoxes,
      }),
    },
  ),
);
