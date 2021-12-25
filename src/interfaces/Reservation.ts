export interface Reservation {
  id: string;
  client_id: string;
  restaurant_id: string;
  date: string;
  time: string;
  canceled: boolean | null;
  rated: boolean | null;
}
