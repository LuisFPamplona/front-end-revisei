export type ApiResponse<T> =
  | {
      success: true;
      message: string;
      data: T;
      rewards?: { gemReward: number; experienceReward: number };
    }
  | {
      success: false;
      message: string;
      data?: never;
      rewards?: never;
    };
