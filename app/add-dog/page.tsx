'use client'

// Import necessary dependencies and components
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

// Define the main component for adding a new dog
export default function AddDogForm() {
  // Initialize state variables for form fields and loading state
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [breed, setBreed] = useState('')
  const [healthStatus, setHealthStatus] = useState('')
  const [status, setStatus] = useState('')
  const [notes, setNotes] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Initialize router, Supabase client, and toast hook
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Insert new dog data into Supabase
    const { error } = await supabase
      .from('dogs')
      .insert([
        {
          name,
          age: parseInt(age),
          breed,
          health_status: healthStatus,
          status,
          notes
        }
      ])

    setIsLoading(false)

    if (error) {
      // Handle error case
      toast({
        title: "Error",
        description: "Failed to add dog. Please try again.",
        variant: "destructive",
      })
      console.error("Error adding dog:", error)
    } else {
      // Handle success case
      toast({
        title: "Success",
        description: "Dog added successfully!",
      })
      // Reset form fields
      setName('')
      setAge('')
      setBreed('')
      setHealthStatus('')
      setStatus('')
      setNotes('')
      router.refresh() // Refresh the page to show updated data
    }
  }

  // Render the form
  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6 bg-card rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Add New Dog</h2>
      
      {/* Name input field */}
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Age input field */}
      <div className="space-y-2">
        <Label htmlFor="age">Age</Label>
        <Input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>

      {/* Breed input field */}
      <div className="space-y-2">
        <Label htmlFor="breed">Breed</Label>
        <Input
          id="breed"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          required
        />
      </div>

      {/* Health Status input field */}
      <div className="space-y-2">
        <Label htmlFor="healthStatus">Health Status</Label>
        <Input
          id="healthStatus"
          value={healthStatus}
          onChange={(e) => setHealthStatus(e.target.value)}
          required
        />
      </div>

      {/* Status select field */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select onValueChange={setStatus} required>
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Adoptable">Adoptable</SelectItem>
            <SelectItem value="Foster">Foster</SelectItem>
            <SelectItem value="Medical Care">Medical Care</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Notes textarea field */}
      <div className="space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      {/* Submit button */}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Dog'}
      </Button>
    </form>
  )
}
