import { create } from "zustand";

export interface ARVEvent {
  _id: string;
  code: string;
  eventName: string;
  eventDescription: string;
  gameTime: string; // ISO timestamp when game time starts
  revealTime: string; // ISO timestamp when reveal time starts
  outcomeTime: string; // ISO timestamp when outcome time starts
  image1: {
    url: string;
    description: string;
  };
  image2: {
    url: string;
    description: string;
  };
  image3: {
    url: string;
    description: string;
  };
  controlImage?: string;
  resultImage?: string;
  isActive: boolean;
  isPartiallyActive: boolean;
  isQueued: boolean;
  isCompleted: boolean;
  status: string;
  isResultRevealed: boolean;
  activeARVGameTime?: string;
}

export type GamePhase = "waiting" | "game" | "reveal" | "outcome";
export type GameStage = "draw" | "select" | "waiting" | "reveal" | "results";

interface ARVStore {
  currentEvent: ARVEvent | null;
  currentStage: GameStage;
  userDrawing: string | null;
  selectedImage: { url: string; description: string } | null;
  hasParticipated: boolean;

  // Actions
  setActiveTarget: (event: ARVEvent) => void;
  setCurrentStage: (stage: GameStage) => void;
  setUserDrawing: (drawing: string) => void;
  setSelectedImage: (image: { url: string; description: string }) => void;
  setHasParticipated: (participated: boolean) => void;

  getCurrentPhase: () => GamePhase;
  isGameTimeActive: () => boolean;
  isRevealTimeActive: () => boolean;
  isOutcomeTimeActive: () => boolean;
  getPhaseEndTime: () => string | null;
  shouldForceExit: () => boolean;
  getGameTimeRemaining: () => number;
  getRevealTimeRemaining: () => number;
  getImages: () => Array<{ url: string; description: string }>;
}

export const useARVStore = create<ARVStore>((set, get) => ({
  currentEvent: null,
  currentStage: "draw",
  userDrawing: null,
  selectedImage: null,
  hasParticipated: false,

  setActiveTarget: (event) => {
    // Reset game state if this is a new event
    const currentEvent = get().currentEvent;
    if (!currentEvent || currentEvent._id !== event._id) {
      set({
        currentEvent: event,
        currentStage: "draw",
        userDrawing: null,
        selectedImage: null,
        hasParticipated: false,
      });
    } else {
      set({ currentEvent: event });
    }
  },

  setCurrentStage: (stage) => set({ currentStage: stage }),
  setUserDrawing: (drawing) => {
    set({ userDrawing: drawing, hasParticipated: true });
  },
  setSelectedImage: (image) => {
    set({ selectedImage: image, hasParticipated: true });
  },
  setHasParticipated: (participated) => set({ hasParticipated: participated }),

  getCurrentPhase: () => {
    const { currentEvent } = get();
    if (!currentEvent) return "waiting";

    const now = new Date().getTime();
    const gameTime = new Date(currentEvent.gameTime).getTime();
    const revealTime = new Date(currentEvent.revealTime).getTime();
    const outcomeTime = new Date(currentEvent.outcomeTime).getTime();

    if (now < gameTime) return "waiting";
    if (now >= gameTime && now < revealTime) return "game";
    if (now >= revealTime && now < outcomeTime) return "reveal";
    return "outcome";
  },

  isGameTimeActive: () => {
    const { currentEvent } = get();
    if (!currentEvent) return false;

    const now = new Date().getTime();
    const gameTime = new Date(currentEvent.gameTime).getTime();
    const revealTime = new Date(currentEvent.revealTime).getTime();

    return now >= gameTime && now < revealTime;
  },

  isRevealTimeActive: () => {
    const { currentEvent } = get();
    if (!currentEvent) return false;

    const now = new Date().getTime();
    const revealTime = new Date(currentEvent.revealTime).getTime();
    const outcomeTime = new Date(currentEvent.outcomeTime).getTime();

    return now >= revealTime && now < outcomeTime;
  },

  isOutcomeTimeActive: () => {
    const { currentEvent } = get();
    if (!currentEvent) return false;

    const now = new Date().getTime();
    const outcomeTime = new Date(currentEvent.outcomeTime).getTime();

    return now >= outcomeTime;
  },

  getGameTimeRemaining: () => {
    const { currentEvent } = get();
    if (!currentEvent) return 0;

    const now = new Date().getTime();
    const revealTime = new Date(currentEvent.revealTime).getTime();

    return Math.max(0, revealTime - now);
  },

  getRevealTimeRemaining: () => {
    const { currentEvent } = get();
    if (!currentEvent) return 0;

    const now = new Date().getTime();
    const outcomeTime = new Date(currentEvent.outcomeTime).getTime();

    return Math.max(0, outcomeTime - now);
  },

  getPhaseEndTime: () => {
    const { currentEvent } = get();
    if (!currentEvent) return null;

    const phase = get().getCurrentPhase();
    switch (phase) {
      case "game":
        return currentEvent.revealTime;
      case "reveal":
        return currentEvent.outcomeTime;
      default:
        return null;
    }
  },

  shouldForceExit: () => {
    const { hasParticipated } = get();
    const phase = get().getCurrentPhase();
    return !hasParticipated && (phase === "reveal" || phase === "outcome");
  },

  getImages: () => {
    const { currentEvent } = get();
    if (!currentEvent) return [];

    return [
      currentEvent.image1,
      currentEvent.image2,
      currentEvent.image3,
      currentEvent.controlImage,
    ]
      .filter(Boolean)
      .map((image) => {
        // If image is already in correct format, return as is
        if (typeof image === "object" && image.url && image.description) {
          return image;
        }
        // If image is a string, convert to required format
        if (typeof image === "string") {
          return {
            url: image,
            description: "", // provide a default empty description
          };
        }
        // If neither, return null and filter it out
        return null;
      })
      .filter(
        (image): image is { url: string; description: string } => image !== null
      );
  },
}));
