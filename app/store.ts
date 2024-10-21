import { create } from 'zustand'
import { VeterinaryAppointment } from '@/types/Dog'

// Define the structure of the state managed by this store
type State = {
  vetAppointments: VeterinaryAppointment[] // Array to store veterinary appointments
  setVetAppointments: (appointments: VeterinaryAppointment[]) => void // Function to update veterinary appointments
}

// Create a Zustand store to manage veterinary appointments
const useVetAppointmentStore = create<State>((set) => ({
  // Initialize vetAppointments as an empty array
  vetAppointments: [],
  
  // Function to update the vetAppointments state
  // This allows for batch updates of multiple veterinary appointments
  setVetAppointments: (appointments: VeterinaryAppointment[]) => set({ vetAppointments: appointments }),
}))

export default useVetAppointmentStore
