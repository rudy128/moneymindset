'use client'
import React, { useEffect, useState } from 'react';
import BeginnerReads from './BeginnerReads';
import ExploreBy from './ExploreBy';
import { Loader } from 'lucide-react';

interface Blog {
  title: string;
  author: string;
  date: string;
  slug: string;
  images?: string;
  description: string; // Optional field for images
}

interface ApiResponse {
  data: Blog[];
  status?: number;
}

const HomePage = () => {
  const [data, setData] = useState<ApiResponse | undefined>(undefined); // State to store the response data
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState<Error | null>(null); // To handle errors
  
  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3000/api'); // API request to localhost:3000
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json(); // Assuming the response is JSON
        setData(result as ApiResponse); // Set the fetched data
      } catch (err) {
        setError(err as Error); // Set the error if something goes wrong
      } finally {
        setLoading(false); // Set loading to false when the request is complete
      }
    };

    fetchData(); // Call the function to fetch data
  }, []);

  if (loading) {
    return (
        <main className='w-[1100px] p-5 mx-auto flex justify-center items-center h-screen'>
            <Loader size={50} className='animate-spin duration-1000 text-yellow-600' />
        </main>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  return (
    <main className='w-[1100px] p-5 mx-auto'>
      {data && <BeginnerReads data={data?.data} />}
      <ExploreBy />
    </main>
  );
}

export { HomePage }
export type { ApiResponse }
