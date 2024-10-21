// Import necessary testing utilities and the component to be tested
import { render, screen, fireEvent } from '@testing-library/react'
import ActivityForm from './ActivityForm'
import '@testing-library/jest-dom'

// Test suite for the ActivityForm component
describe('ActivityForm', () => {
  // Test case to ensure all form fields are rendered correctly
  it('renders form fields correctly', () => {
    // Render the ActivityForm component with a mock dog ID
    render(<ActivityForm dogId="1" />)
    
    // Check if all expected form elements are present in the document
    expect(screen.getByLabelText(/Activity Type/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Notes/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Temperament Notes/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Log Activity/i })).toBeInTheDocument()
  })

  // Test case to verify form input validation
  it('validates form inputs', () => {
    // Render the ActivityForm component with a mock dog ID
    render(<ActivityForm dogId="1" />)
    
    // Simulate a click on the submit button without filling any fields
    fireEvent.click(screen.getByRole('button', { name: /Log Activity/i }))
    
    // Check if error messages for required fields are displayed
    expect(screen.getByText(/Activity type is required/i)).toBeInTheDocument()
    expect(screen.getByText(/Notes are required/i)).toBeInTheDocument()
  })

  // Placeholder for additional tests
  // TODO: Add more test cases to cover different scenarios and edge cases
})
