export type PrivacyPolicyData = {
    status: boolean;
    message: string;
    data: Array<{
      _id: string;
      content: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    }>;
  };
  