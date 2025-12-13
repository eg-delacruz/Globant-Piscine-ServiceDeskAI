const API_URL: string =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const CLIENT_KEY: string = import.meta.env.VITE_CLIENT_HEADER_KEY;

const NODE_ENV: string = import.meta.env.VITE_NODE_ENV || 'development';

const VITE_PORT: string = import.meta.env.VITE_PORT || '5173';

export { API_URL, CLIENT_KEY, NODE_ENV, VITE_PORT };