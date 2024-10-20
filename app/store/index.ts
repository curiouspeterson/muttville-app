import { create } from 'zustand'
import { HealthStatusUpdate } from '@/app/store/types'

type State = {
  healthUpdates: HealthStatusUpdate[]
  setHealthUpdates: (healthUpdates: HealthStatusUpdate[]) => void
}

create<State>((set) => ({
  healthUpdates: [],
  setHealthUpdates: (healthUpdates: HealthStatusUpdate[]) => set({ healthUpdates }),
}))
