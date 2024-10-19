'use client'
import React from 'react'
import { Dog } from '@/types/Dog'

const DogProfileClient: React.FC<{ dog: Dog }> = ({ dog }) => {
  return (
    <div>
      <h1>{dog.name}</h1>
      <p>Breed: {dog.breed}</p>
      <p>Age: {dog.age}</p>
      {/* Add more dog properties as needed */}
    </div>
  );
};

export default DogProfileClient
