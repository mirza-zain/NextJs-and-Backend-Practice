'use client'

import React, { useEffect, useState } from 'react'


export default function page() {
    const [product, setProduct] = useState(null);
    const [user, setUser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    const [name, setName] = useState('');
    const [title, setTitle] = useState('');

    async function handleSubmit(e) {
        e.preventDefault()
        try{
            const response = await fetch('http://localhost:8000/api/user.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({
                    name: name,
                    title: title
                })
            });
            const result = await response.json();
            if(!response.ok) {
                throw new Error(result.error);
            }

            alert(result.message);

            setName('');
            setTitle('');

        } catch(error) {
            alert("Error Creating Product" + error.message);
        }
    }

    useEffect(() => {
        async function getProduct() {
            try {
                const [prodRes, userRes] = await Promise.all([fetch("http://localhost:8000/api/product.php"), fetch("http://localhost:8000/api/user.php")]);
                const prodData = await prodRes.json();
                const userData = await userRes.json();

                setProduct(prodData);
                setUser(userData);
            }
            catch(error) {
                console.error('There is error: ', error);
                setError(error);
            }
            finally {
                setIsLoading(false);
            }
        }

        getProduct();

    }, []);

    if (isLoading) return <p>Loading....</p>;
    if (error) return <p>Error: {String(error)}</p>;

  return (
    <div style={{ padding: '2rem' }}>
        <h1>Welcome <strong>{user.name}</strong>, our <strong>{user.title}!</strong></h1>
        <h2>Our Products</h2>
        <p>This data is coming from our very own modern API route!</p>
        <ul>
            {product.map((products) => (
            <li key={products.id}>
                <strong>{products.name}</strong> - ${products.price} (Stock: {products.stock})
            </li>
            ))}
        </ul>

        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} />
            <label>Title:</label>
            <input type="text" placeholder='Enter Title' value={title} onChange={(e) => setTitle(e.target.value)} />
            <button type='submit' className='px-4 py-2 bg-orange-500 text-white'>Add User</button>
        </form>
    </div>
  )
}
