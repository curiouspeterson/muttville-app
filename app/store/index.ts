import { create } from 'zustand'
import { HealthStatusUpdate } from '@/app/store/types'

// Define the structure of the state managed by this store
type State = {
  healthUpdates: HealthStatusUpdate[] // Array to store health status updates
  setHealthUpdates: (healthUpdates: HealthStatusUpdate[]) => void // Function to update health updates
}

// Create a Zustand store to manage health status updates
create<State>((set) => ({
  // Initialize healthUpdates as an empty array
  healthUpdates: [],
  
  // Function to update the healthUpdates state
  // This allows for batch updates of multiple health status entries
  setHealthUpdates: (healthUpdates: HealthStatusUpdate[]) => set({ healthUpdates }),
}))
