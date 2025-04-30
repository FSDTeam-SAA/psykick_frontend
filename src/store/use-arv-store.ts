/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ImageChoice = {
  id: number;
  src: string;
  selected: boolean;
};

export type EventInfo = {
  id: string;
  description: string;
  outcome: string;
  outcomeImage: string;
};

type TextBox = {
  id: string;
  text: string;
  x: number;
  y: number;
  color: string;
  fontSize: number;
};

type ARVState = {
  // Challenge data
  challengeCode: string;
  revealTime: string;
  timer: {
    hours: number;
    minutes: number;
    seconds: number;
  };

  // Drawing state
  currentDrawing: string | null;
  drawingHistory: string[];
  currentStep: number;
  textBoxes: TextBox[];

  // Tool state
  currentTool: "pencil" | "text" | "eraser";
  currentColor: string;
  brushSize: number;

  // Modal states
  showARVInfo: boolean;
  dontShowARVAgain: boolean;
  showShareModal: boolean;

  // Challenge flow states
  stage: "drawing" | "selection" | "waiting" | "results";

  // Image selection
  imageChoices: ImageChoice[];
  selectedImageId: number | null;

  // Event info
  eventInfo: EventInfo;

  // Results
  isCorrect: boolean;
  pointsEarned: number;

  // Active target
  activeTarget: {
    targetId: string;
    code: string;
    eventName: string;
    eventDescription: string;
    image1: { url: string; description: string };
    image2: { url: string; description: string };
    image3: { url: string; description: string };
    controlImage: string;
  } | null;

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
  toggleARVInfo: () => void;
  setDontShowARVAgain: (value: boolean) => void;
  closeARVInfo: () => void;
  selectImage: (id: number) => void;
  submitImpression: () => void;
  submitSelection: () => void;
  revealResults: () => void;
  toggleShareModal: () => void;
  resetChallenge: () => void;
  updateTextBoxes: (textBoxes: TextBox[]) => void;
  addTextBox: (textBox: TextBox) => void;
  updateTextBox: (id: string, updates: Partial<TextBox>) => void;
  removeTextBox: (id: string) => void;
  resetCanvasState: () => void;
  setActiveTarget: (target: any) => void;
};

export const useARVStore = create<ARVState>()(
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

      currentDrawing: null,
      drawingHistory: [],
      currentStep: -1,
      textBoxes: [],

      currentTool: "pencil",
      currentColor: "#000000",
      brushSize: 5,

      showARVInfo: false,
      dontShowARVAgain: false,
      showShareModal: false,

      stage: "drawing",

      imageChoices: [
        { id: 1, src: "/assets/challenges/Rectangle 54.png", selected: false },
        { id: 2, src: "/assets/challenges/Rectangle 52.png", selected: false },
        { id: 3, src: "/assets/challenges/house.png", selected: false },
        { id: 4, src: "/assets/challenges/Rectangle 57.png", selected: false },
      ],
      selectedImageId: null,

      eventInfo: {
        id: "ABC-25G",
        description:
          "While Liverpool's form has been impeccable, Arsenal's home advantage and recent performances against top-tier opponents make them a formidable prospect.",
        outcome:
          "While Liverpool's form has been impeccable, Arsenal's home advantage and recent performances against top-tier opponents make them a formidable prospect.",
        outcomeImage: "/assets/challenges/Rectangle 57.png",
      },

      isCorrect: false,
      pointsEarned: 0,

      activeTarget: null,

      // Actions
      setTimer: (hours, minutes, seconds) =>
        set({ timer: { hours, minutes, seconds } }),

      updateDrawing: (drawing) => set({ currentDrawing: drawing }),

      addToHistory: () => {
        const { drawingHistory, currentDrawing, currentStep } = get();
        // Only add to history if the drawing has changed
        if (
          currentStep >= 0 &&
          drawingHistory[currentStep] === currentDrawing
        ) {
          return;
        }
        // Filter out null values before creating new history
        const newHistory = [
          ...drawingHistory.slice(0, currentStep + 1),
          currentDrawing,
        ].filter((item): item is string => item !== null);
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

      toggleARVInfo: () =>
        set((state) => ({ showARVInfo: !state.showARVInfo })),

      closeARVInfo: () => {
        set({ showARVInfo: false });
      },

      setDontShowARVAgain: (value) => set({ dontShowARVAgain: value }),

      selectImage: (id) => {
        const { imageChoices } = get();

        const updatedChoices = imageChoices.map((img) => ({
          ...img,
          selected: img.id === id,
        }));

        set({
          imageChoices: updatedChoices,
          selectedImageId: id,
        });
      },

      submitImpression: () => {
        // Show ARV info if user hasn't opted out
        if (!get().dontShowARVAgain) {
          set({ showARVInfo: true });
        } else {
          // If user opted out, go straight to selection
          set({ stage: "selection" });
        }
      },

      submitSelection: () => {
        set({
          stage: "waiting",
          showShareModal: false,
        });
      },

      revealResults: () => {
        const { selectedImageId, imageChoices } = get();
        const correctImageId =
          imageChoices.findIndex(
            (img) => img.src === get().eventInfo.outcomeImage,
          ) + 1;
        const isCorrect = selectedImageId === correctImageId;

        set({
          stage: "results",
          isCorrect,
          pointsEarned: isCorrect ? 30 : -10,
        });
      },

      toggleShareModal: () =>
        set((state) => ({ showShareModal: !state.showShareModal })),

      resetChallenge: () =>
        set({
          currentDrawing: null,
          drawingHistory: [],
          currentStep: -1,
          textBoxes: [],
          stage: "drawing",
          selectedImageId: null,
          imageChoices: get().imageChoices.map((img) => ({
            ...img,
            selected: false,
          })),
        }),

      // Text box actions
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
        // Clear the persisted state
        localStorage.removeItem("psykick-arv-storage");
      },

      setActiveTarget: (target) => {
        set({
          activeTarget: target,
          imageChoices: [
            { id: 1, src: target.image1.url, selected: false },
            { id: 2, src: target.image2.url, selected: false },
            { id: 3, src: target.image3.url, selected: false },
          ],
          challengeCode: target.code,
          eventInfo: {
            id: target.code,
            description: target.eventDescription,
            outcome: "", // Will be set when results are available
            outcomeImage: "", // Will be set when results are available
          },
        });
      },
    }),
    {
      name: "psykick-arv-storage",
      partialize: (state) => ({
        dontShowARVAgain: state.dontShowARVAgain,
        currentDrawing: state.currentDrawing,
        drawingHistory: state.drawingHistory,
        currentStep: state.currentStep,
        textBoxes: state.textBoxes,
      }),
    },
  ),
);
