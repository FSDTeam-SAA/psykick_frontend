import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

const getAuthHeader = () => {
  const token = localStorage.getItem("authToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface TMCTarget {
  _id: string;
  code: string;
  targetImage: string;
  controlImages: string[];
  revealDuration: string;
  bufferDuration: string;
  gameDuration: string;
  isActive: boolean;
  isQueued: boolean;
  isCompleted: boolean;
  startTime: string;
}

export interface TMCSubmission {
  firstChoiceImage: string;
  secondChoiceImage: string;
  TMCTargetId: string;
}

export interface TMCResult {
  status: boolean;
  message: string;
  data: {
    TMCId: string;
    firstChoiceImage: string;
    secondChoiceImage: string;
    points: number;
    submissionTime: string;
    _id: string;
  };
}

export const tmcService = {
  getActiveTarget: async (): Promise<TMCTarget> => {
    const response = await axios.get(
      `${BASE_URL}/TMCTarget/get-activeTMCTarget`,
      { headers: getAuthHeader() },
    );
    return response.data.data;
  },

  submitChoices: async (
    submission: TMCSubmission,
  ): Promise<{ status: boolean; message: string }> => {
    const response = await axios.post(
      `${BASE_URL}/userSubmission/submit-TMCTarget`,
      submission,
      { headers: getAuthHeader() },
    );
    return response.data;
  },

  getResult: async (targetId: string): Promise<TMCResult> => {
    const response = await axios.get(
      `${BASE_URL}/userSubmission/get-TMCResult/${targetId}`,
      { headers: getAuthHeader() },
    );
    return response.data;
  },
};
