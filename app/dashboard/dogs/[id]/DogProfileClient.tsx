'use client'

import { Dog, Activity } from '@/types/Dog'
import { format } from 'date-fns'

interface DogProfileClientProps {
  dog: Dog
  activities: Activity[]
}

export default function DogProfileClient({ dog, activities }: DogProfileClientProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{dog.name}</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Dog Details</h2>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="font-medium text-gray-500">Age</dt>
            <dd>{dog.age} years</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Breed</dt>
            <dd>{dog.breed}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Health Status</dt>
            <dd>{dog.health_status}</dd>
          </div>
          <div>
            <dt className="font-medium text-gray-500">Status</dt>
            <dd>{dog.status}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-medium text-gray-500">Notes</dt>
            <dd>{dog.notes}</dd>
          </div>
          <div className="col-span-2">
            <dt className="font-medium text-gray-500">Created At</dt>
            <dd>{format(new Date(dog.created_at), 'PPpp')}</dd>
          </div>
        </dl>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Activities</h2>
        {activities.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {activities.map((activity) => (
              <li key={activity.id} className="py-4">
                <div className="flex justify-between">
                  <p className="font-medium">{activity.activity_type}</p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(activity.created_at), 'PPpp')}
                  </p>
                </div>
                <p className="mt-2 text-gray-600">{activity.notes}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No activities recorded for this dog.</p>
        )}
      </div>
    </div>
  )
}
