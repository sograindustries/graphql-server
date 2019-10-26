export type Entity<T> = T & {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};
