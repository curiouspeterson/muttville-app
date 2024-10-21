'use client'

import { useEffect, useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import Filter from '@/components/Filter'
import { Dog } from '@/types/Dog'

// Main component for displaying and managing dogs
export default function DogsPage() {
  // State variables for managing dogs, new dog input, editing, and filtering
  const [dogs, setDogs] = useState<Dog[]>([])
  const [newDog, setNewDog] = useState({ name: '', breed: '' })
  const [editingDogId, setEditingDogId] = useState<string | null>(null)
  const [editedDog, setEditedDog] = useState({ name: '', breed: '' })
  const [filter, setFilter] = useState('')

  // Function to fetch dogs from the database
  const fetchDogs = useCallback(async () => {
    let query = supabase.from('dogs').select('id, name, breed, temperament, age, health_status, status, notes, created_at')
    // Apply filter if set
    if (filter) {
      query = query.eq('temperament', filter)
    }
    const { data, error } = await query
    if (error) console.error('Error fetching dogs:', error)
    else setDogs(data as Dog[] || [])
  }, [filter])

  // Fetch dogs on component mount and when filter changes
  useEffect(() => {
    fetchDogs()
  }, [fetchDogs])

  // Set up real-time subscription to dog changes
  useEffect(() => {
    const channel = supabase.channel('dogs_channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'dogs' },
        payload => {
          setDogs(prevDogs => [...prevDogs, payload.new as Dog])
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'dogs' },
        payload => {
          setDogs(prevDogs =>
            prevDogs.map(dog => (dog.id === payload.new.id ? payload.new as Dog : dog))
          )
        }
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'dogs' },
        payload => {
          setDogs(prevDogs => prevDogs.filter(dog => dog.id !== payload.old.id))
        }
      )
      .subscribe()

    // Cleanup function to unsubscribe from the channel
    return () => {
      channel.unsubscribe()
    }
  }, [filter])

  // Function to start editing a dog
  const startEdit = (dog: Dog) => {
    setEditingDogId(dog.id.toString())
    setEditedDog({ name: dog.name, breed: dog.breed })
  }

  // Function to cancel editing
  const cancelEdit = () => {
    setEditingDogId(null)
    setEditedDog({ name: '', breed: '' })
  }

  // Function to save edited dog details
  const saveEdit = async (dogId: string) => {
    const { error } = await supabase
      .from('dogs')
      .update({ name: editedDog.name, breed: editedDog.breed })
      .eq('id', dogId)
    
    if (error) {
      console.error('Error updating dog:', error)
    } else {
      setEditingDogId(null)
      fetchDogs()
    }
  }

  // Function to add a new dog
  const addDog = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase.from('dogs').insert(newDog)
    if (error) {
      console.error('Error adding dog:', error)
    } else {
      setNewDog({ name: '', breed: '' })
      fetchDogs()
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dogs</h1>
      <Filter onFilter={setFilter} />
      
      {/* Form for adding a new dog */}
      <form onSubmit={addDog} className="mb-4">
        <input
          type="text"
          placeholder="Dog Name"
          value={newDog.name}
          onChange={(e) => setNewDog({ ...newDog, name: e.target.value })}
          className="mr-2 p-2 border rounded"
          required
          id="dogName"
          name="dogName"
        />
        <input
          type="text"
          placeholder="Dog Breed"
          value={newDog.breed}
          onChange={(e) => setNewDog({ ...newDog, breed: e.target.value })}
          className="mr-2 p-2 border rounded"
          required
          id="dogBreed"
          name="dogBreed"
        />
        <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add Dog
        </button>
      </form>

      {/* Table to display dogs */}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Breed</th>
            <th className="py-2">Temperament</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dogs.map((dog) => (
            <tr key={dog.id}>
              <td className="border px-4 py-2">{dog.name}</td>
              <td className="border px-4 py-2">{dog.breed}</td>
              <td className="border px-4 py-2">{dog.temperament}</td>
              <td className="border px-4 py-2">
                {editingDogId === dog.id ? (
                  // Editing mode
                  <>
                    <input
                      type="text"
                      value={editedDog.name}
                      onChange={(e) => setEditedDog({ ...editedDog, name: e.target.value })}
                      className="mr-2 p-1 border rounded"
                      id="editDogName"
                      name="editDogName"
                    />
                    <input
                      type="text"
                      value={editedDog.breed}
                      onChange={(e) => setEditedDog({ ...editedDog, breed: e.target.value })}
                      className="mr-2 p-1 border rounded"
                      id="editDogBreed"
                      name="editDogBreed"
                    />
                    <button
                      onClick={() => saveEdit(dog.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
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
                  // View mode
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
