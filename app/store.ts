import { create } from 'zustand'
import { VeterinaryAppointment } from '@/types/Dog'

type State = {
  vetAppointments: VeterinaryAppointment[]
  setVetAppointments: (appointments: VeterinaryAppointment[]) => void
}

create<State>((set) => ({
  vetAppointments: [],
  setVetAppointments: (appointments: VeterinaryAppointment[]) => set({ vetAppointments: appointments }),
}))
