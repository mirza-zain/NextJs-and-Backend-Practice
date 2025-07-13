// pages/lesson-one.js

import { useState, useEffect } from 'react'; // <-- Add useEffect here

export default function LessonOnePage() {
  // Our counter state from before
  const [count, setCount] = useState(0);

  // 1. New state to hold the data we fetch
  const [todo, setTodo] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  // 2. The useEffect hook to fetch data
  useEffect(() => {
    // We define an async function inside to use await
    async function fetchAllData() {
        try 
        {
            const [todoResponse, userResponse] = await Promise.all([fetch('https://jsonplaceholder.typicode.com/todos/1'), fetch('https://jsonplaceholder.typicode.com/users/1')]);
            const Tododata = await todoResponse.json();
            const Userdata = await userResponse.json();
            
            setTodo(Tododata); 
            setUser(Userdata);
        }
        catch(error) {
            console.error('There is an error in data', error);
            setError(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    fetchAllData();

    
}, []); // <-- The empty array means "only run this once"
    if(isLoading) {
        return <p>Loading...</p>
    }

    if(error) {
        return <p> Error: {error ? String(error) : ''}</p>
    }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>My First Interactive Component</h1>
      <p>You have clicked the button {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button onClick={() => setCount(count -1)} >Minus One</button>

      <hr style={{ margin: '2rem 0' }} />

      {/* 3. Display the fetched data */}
      <h2>My Fetched To-Do Item</h2>
        <div>
          <p><strong>Title:</strong> {todo ? todo.title : ''}</p>
          <p><strong>Completed:</strong> {todo ? (todo.completed ? 'Yes' : 'No') : ''}</p>
        </div>

      {/* Displaying User Data */}
      <h2>User data fetched</h2>
            <div>
                <p><strong>User Name:</strong> {user.name}</p>
                <p><strong>User Email:</strong> {user.email}</p>
            </div>
    </div>
  );
}