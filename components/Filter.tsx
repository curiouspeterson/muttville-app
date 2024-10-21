// Import React's useState hook for managing component state
import { useState } from 'react'

/**
 * Filter component for selecting dog temperaments
 * @param {Object} props - Component props
 * @param {Function} props.onFilter - Callback function to handle filter changes
 */
export default function Filter({ onFilter }: { onFilter: (filter: string) => void }) {
  // State to store the currently selected temperament
  const [temperament, setTemperament] = useState('')

  /**
   * Handle changes in the select element
   * @param {React.ChangeEvent<HTMLSelectElement>} e - The change event
   */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Update local state with the new temperament
    setTemperament(e.target.value)
    // Call the onFilter callback with the new value
    onFilter(e.target.value)
  }

  return (
    // Render a select element for temperament filtering
    <select 
      value={temperament} 
      onChange={handleChange} 
      id="temperament" 
      name="temperament"
    >
      {/* Default option for showing all temperaments */}
      <option value="">All Temperaments</option>
      {/* Specific temperament options */}
      <option value="Calm">Calm</option>
      <option value="Aggressive">Aggressive</option>
      <option value="Playful">Playful</option>
      {/* Placeholder comment for adding more options in the future */}
      {/* Add more temperament options as needed */}
    </select>
  )
}
