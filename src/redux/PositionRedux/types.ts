export interface PositionState {
  loading: boolean;
  positions: PositionItem[];
  error: any;
}

export interface PositionItem {
  id: number;
  name: string;
}

export interface PositionsResponse {
  success: boolean;
  positions: PositionItem[];
}
