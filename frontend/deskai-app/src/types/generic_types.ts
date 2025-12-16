// Generic API response type
export interface ApiResponse<T = any> {
  error: string;
  body: T;
  message: string;
}
