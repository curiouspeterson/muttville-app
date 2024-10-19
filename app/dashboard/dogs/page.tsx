'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// Define the Dog type
type Dog = {
  id: string
  name: string
  breed: string
}

export default function DogsPage() {
  const [dogs, setDogs] = useState<Dog[]>([])
  const [newDog, setNewDog] = useState({ name: '', breed: '' })
  const [editingDogId, setEditingDogId] = useState<string | null>(null)
  const [editedDog, setEditedDog] = useState({ name: '', breed: '' })

  // Define fetchDogs function
  const fetchDogs = async () => {
    const { data, error } = await supabase
      .from('dogs')
      .select('id, name, breed')
    if (error) console.error('Error fetching dogs:', error)
    else setDogs(data || [])
  }

  useEffect(() => {
    // Use the fetchDogs function here
    fetchDogs()

    // Set up real-time subscription
    const subscription = supabase
      .channel('dogs_channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'dogs' }, fetchDogs)
      .subscribe()

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // Function to add a new dog
  const addDog = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase
      .from('dogs')
      .insert([newDog])
    if (error) console.error('Error adding dog:', error)
    else {
      setNewDog({ name: '', breed: '' }) // Reset form
      // Fetch dogs again to update the list
      const { data: updatedDogs } = await supabase.from('dogs').select('id, name, breed')
      setDogs(updatedDogs || [])
    }
  }

  // Add function to handle editing
  const startEdit = (dog: Dog) => {
    setEditingDogId(dog.id.toString())
    setEditedDog({ name: dog.name, breed: dog.breed })
  }

  const cancelEdit = () => {
    setEditingDogId(null)
    setEditedDog({ name: '', breed: '' })
  }

  const saveEdit = async (dogId: string) => {
    const { error } = await supabase
      .from('dogs')
      .update({ name: editedDog.name, breed: editedDog.breed })
      .eq('id', dogId)
    
    if (error) {
      console.error('Error updating dog:', error)
    } else {
      setEditingDogId(null)
      // Now fetchDogs is accessible here
      fetchDogs()
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dogs</h1>
      
      {/* Add new dog form */}
      <form onSubmit={addDog} className="mb-4">
        <input
          type="text"
          placeholder="Dog Name"
          value={newDog.name}
          onChange={(e) => setNewDog({ ...newDog, name: e.target.value })}
          className="mr-2 p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Dog Breed"
          value={newDog.breed}
          onChange={(e) => setNewDog({ ...newDog, breed: e.target.value })}
          className="mr-2 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Dog
        </button>
      </form>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Breed</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {dogs.map((dog) => (
            <tr key={dog.id}>
              <td className="py-2 px-4 border-b">
                {editingDogId === dog.id ? (
                  <input
                    type="text"
                    value={editedDog.name}
                    onChange={(e) => setEditedDog({ ...editedDog, name: e.target.value })}
                    className="p-1 border rounded"
                    required
                  />
                ) : (
                  dog.name
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingDogId === dog.id ? (
                  <input
                    type="text"
                    value={editedDog.breed}
                    onChange={(e) => setEditedDog({ ...editedDog, breed: e.target.value })}
                    className="p-1 border rounded"
                    required
                  />
                ) : (
                  dog.breed
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingDogId === dog.id ? (
                  <>
                    <button
                      onClick={() => saveEdit(dog.id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <Link href={`/dashboard/dogs/${dog.id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
                        View Dog
                      </button>
                    </Link>
                    <button
                      onClick={() => startEdit(dog)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Edit
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
