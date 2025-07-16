/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TMCTarget } from "@/lib/tmc-service";

export type ImageChoice = {
  id: string;
  src: string;
  selected: boolean;
  order: number | null;
};

type TextBox = {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
};

type ChallengeState = {
  // Challenge data from API
  targetId: string | null;
  challengeCode: string;
  revealTime: string;
  gameTime: string;
  bufferTime: string;

  // Timer state
  timer: {
    hours: number;
    minutes: number;
    seconds: number;
  };

  // Drawing state
  drawingHistory: string[];
  currentDrawing: string | null;
  currentStep: number;
  textBoxes: TextBox[];

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
  selectedChoices: {
    firstChoice: string | null;
    secondChoice: string | null;
  };

  // Results
  submitted: boolean;
  waitingForResults: boolean;
  targetMatched: boolean;
  pointsEarned: number;
  targetImage: string | null;

  // Active tab
  activeTab: "tmc" | "arv" | "leaderboard";
};

type ChallengeActions = {
  setTargetData: (target: TMCTarget) => void;
  setTimer: (hours: number, minutes: number, seconds: number) => void;
  setSelectedChoices: (choices: {
    firstChoice: string | null;
    secondChoice: string | null;
  }) => void;
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
  selectImage: (id: string) => void;
  submitImpression: () => void;
  submitChoices: () => void;
  revealResults: () => void;
  closeTMCInfo: () => void;
  updateTextBoxes: (textBoxes: TextBox[]) => void;
  addTextBox: (textBox: TextBox) => void;
  updateTextBox: (id: string, updates: Partial<TextBox>) => void;
  removeTextBox: (id: string) => void;
  resetCanvasState: () => void;
  setActiveChallenge: (
    code: string,
    revealTime: string,
    targetId: string,
  ) => void;
  setActiveTab: (tab: "tmc" | "arv" | "leaderboard") => void;
};

export const useChallengeStore = create<ChallengeState & ChallengeActions>()(
  persist(
    (set, get) => ({
      // Initial state
      targetId: null,
      challengeCode: "",
      revealTime: "",
      gameTime: "",
      bufferTime: "",
      timer: {
        hours: 0,
        minutes: 0,
        seconds: 0,
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
      imageChoices: [],
      showImageSelection: false,
      selectedChoices: {
        firstChoice: null,
        secondChoice: null,
      },
      submitted: false,
      waitingForResults: false,
      targetMatched: false,
      pointsEarned: 0,
      targetImage: null,
      activeTab: "tmc",

      // Actions
      setTargetData: (target: TMCTarget) => {
        // Calculate time remaining from gameTime
        const gameTimeDate = new Date(target.gameDuration);
        const now = new Date();
        const diffMs = gameTimeDate.getTime() - now.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMinutes = Math.floor(
          (diffMs % (1000 * 60 * 60)) / (1000 * 60),
        );
        const diffSeconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        set({
          targetId: target._id,
          challengeCode: target.code,
          revealTime: target.revealDuration,
          gameTime: target.gameDuration,
          bufferTime: target.bufferDuration,

          timer: {
            hours: Math.max(0, diffHours),
            minutes: Math.max(0, diffMinutes),
            seconds: Math.max(0, diffSeconds),
          },
          imageChoices: [
            {
              id: "target",
              src: target.targetImage,
              selected: false,
              order: null,
            },
            ...target.controlImages.map((src, index) => ({
              id: `control-${index}`,
              src,
              selected: false,
              order: null,
            })),
          ].sort(() => Math.random() - 0.5), // Shuffle images
        });
      },

      setTimer: (hours, minutes, seconds) =>
        set({
          timer: {
            hours: Math.max(0, hours),
            minutes: Math.max(0, minutes),
            seconds: Math.max(0, seconds),
          },
        }),

      setSelectedChoices: (choices) => set({ selectedChoices: choices }),

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

      toggleTMCInfo: () =>
        set((state) => ({ showTMCInfo: !state.showTMCInfo })),
      closeTMCInfo: () => {
        set({
          showTMCInfo: false,
          showImageSelection: true, // Show image selection when closing the modal
        });
      },

      setDontShowTMCAgain: (value) => set({ dontShowTMCAgain: value }),

      selectImage: (id: string) =>
        set((state) => {
          // Get current selected images
          const firstChoice = state.selectedChoices.firstChoice;
          const secondChoice = state.selectedChoices.secondChoice;

          // If clicking an already selected image, deselect it
          if (id === firstChoice) {
            // If deselecting first choice, move second choice to first if it exists
            return {
              selectedChoices: {
                firstChoice: secondChoice,
                secondChoice: null,
              },
              imageChoices: state.imageChoices.map((img) => ({
                ...img,
                selected: img.id === secondChoice,
                order: img.id === secondChoice ? 1 : null,
              })),
            };
          }

          if (id === secondChoice) {
            return {
              selectedChoices: {
                ...state.selectedChoices,
                secondChoice: null,
              },
              imageChoices: state.imageChoices.map((img) => ({
                ...img,
                selected: img.id === firstChoice,
                order: img.id === firstChoice ? 1 : null,
              })),
            };
          }

          // Handle new selection
          if (!firstChoice) {
            // First selection
            return {
              selectedChoices: {
                ...state.selectedChoices,
                firstChoice: id,
              },
              imageChoices: state.imageChoices.map((img) => ({
                ...img,
                selected: img.id === id,
                order: img.id === id ? 1 : null,
              })),
            };
          }

          if (!secondChoice) {
            // Second selection
            return {
              selectedChoices: {
                ...state.selectedChoices,
                secondChoice: id,
              },
              imageChoices: state.imageChoices.map((img) => ({
                ...img,
                selected: img.id === id || img.id === firstChoice,
                order: img.id === firstChoice ? 1 : img.id === id ? 2 : null,
              })),
            };
          }

          return state;
        }),
      submitImpression: () => {
        const state = get();
        if (!state.dontShowTMCAgain) {
          set({ showTMCInfo: true });
        } else {
          set({ showImageSelection: true });
        }
      },

      submitChoices: () => {
        set({
          submitted: true,
          waitingForResults: true,
          showImageSelection: false,
        });
      },

      revealResults: () => {
        set({
          waitingForResults: false,
          targetMatched: true,
          pointsEarned: 25,
        });
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

      resetCanvasState: () => {
        set({
          currentDrawing: null,
          drawingHistory: [],
          currentStep: -1,
          textBoxes: [],
        });
        localStorage.removeItem("psykick-challenge-storage");
      },

      setActiveChallenge: (code, revealTime, targetId) =>
        set({
          challengeCode: code,
          revealTime: revealTime,
          targetId: targetId,
          submitted: false,
          showImageSelection: false,
          imageChoices: [],
        }),

      setActiveTab: (tab) => set({ activeTab: tab }),
    }),
    {
      name: "psykick-challenge-storage",
      partialize: (state) => ({
        dontShowTMCAgain: state.dontShowTMCAgain,
        currentDrawing: state.currentDrawing,
        drawingHistory: state.drawingHistory,
        currentStep: state.currentStep,
        textBoxes: state.textBoxes,
        activeTab: state.activeTab,
      }),
    },
  ),
);
