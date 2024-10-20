import { render, screen, fireEvent } from '@testing-library/react'
import ActivityForm from './ActivityForm'

describe('ActivityForm', () => {
  it('renders form fields correctly', () => {
    render(<ActivityForm dogId="1" />)
    
    expect(screen.getByLabelText(/Activity Type/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Notes/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Temperament Notes/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Log Activity/i })).toBeInTheDocument()
  })

  it('validates form inputs', () => {
    render(<ActivityForm dogId="1" />)
    
    fireEvent.click(screen.getByRole('button', { name: /Log Activity/i }))
    
    expect(screen.getByText(/Activity type is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Notes are required/i)).toBeInTheDocument()
  })

  // Add more tests as needed
})
