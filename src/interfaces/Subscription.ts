export interface Subscription {
  tier: 'standard' | 'premium';
  start_date: string;
  end_date: string;
  user_id: string;
  price_id: string;
}
