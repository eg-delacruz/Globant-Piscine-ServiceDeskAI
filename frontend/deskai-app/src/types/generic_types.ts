// Generic API response type
export interface ApiResponse<T = any> {
  error: string;
  body: T;
  message: string;
}

export type fetchStatus = 'idle' | 'loading' | 'succeeded' | 'failed';
