export interface Dog {
  id: string;
  name: string;
  age: number;
  breed: string;
  health_status: string;
  status: string;
  notes: string;
  created_at: string;
}

export interface Activity {
  id: string;
  dog_id: string;
  walker_id: string;
  activity_type: string;
  notes: string;
  created_at: string;
}
