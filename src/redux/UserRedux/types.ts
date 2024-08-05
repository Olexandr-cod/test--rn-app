export interface UserState {
  loading: boolean;
  users: User[];
  page: number;
  count: number;
  totalPages: number;
  hasNextPage: boolean;
  error: any;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  position_id: string;
  registration_timestamp: number;
  photo: string;
}

export interface Links {
  next_url: string | null;
  prev_url: string | null;
}

export interface ApiResponse {
  success: boolean;
  page: number;
  total_pages: number;
  total_users: number;
  count: number;
  links: Links;
  users: User[];
}

export interface BodyUser {
  page: number;
  count: number;
}
