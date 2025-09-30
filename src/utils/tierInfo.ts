import { TierInfoResponse } from "@/components/types";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const tierInfoApi = {
  getProgressTracker: async (trackerId: string): Promise<TierInfoResponse> => {
    const { data } = await axios.get<TierInfoResponse>(
      `${BASE_URL}/userSubmission/get-progressTracker/${trackerId}`,
    );
    return data;
  },
};