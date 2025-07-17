'use client';

import { useState, useEffect } from 'react';

function EditProductForm({ product, onSave, onCancel}) {
    const [name, setName] = useState(product.name);
    const [price, setPrice] = useState(product.price);
    const [stock, setStock] = useState(product.stock);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ ...product, name, price: parseFloat(price), stock: parseInt(stock)})
    };
    return (
        <div>
            <h4>Editing: {product.name}</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name: </label>
                    <input type='text' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <label>Price: </label>
                    <input type='number' value={price} onChange={e => setPrice(e.target.value)} />
                </div>
                <div>
                    <label>Stock: </label>
                    <input type='number' value={stock} onChange={e => setStock(e.target.value)} />
                </div>
                <button type='submit' >Save Changes</button>
                <button type='button' onClick={onCancel}>Cancel</button>
            </form>
        </div>
    )
}




export default function LessonTwoPage() {
    // ... (existing state for products, user, loading, error) ...
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    // --- NEW: State for our form inputs ---
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');


    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch('http://localhost:8000/api/product.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name, // The 'name' state
                price: parseFloat(price), // The 'price' state
                stock: parseInt(stock),   // The 'stock' state
            }),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Something went wrong');
        }

        alert(result.message); // Show success message
        
        // Clear the form
        setName('');
        setPrice('');
        setStock('');
        
        // Optional: Re-fetch products to update the list instantly
        // You would need to move your fetch logic into a separate function to call it here.

    } catch (err) {
        alert('Error creating product: ' + err.message);
    }
};
async function getProduct() {
    try {
        const [prodRes, userRes] = await Promise.all([fetch("http://localhost:8000/api/product.php"), fetch("http://localhost:8000/api/user.php")]);
        const prodData = await prodRes.json();
        const userData = await userRes.json();

        setProducts(prodData);
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

    useEffect(() => {
            getProduct();    
        }, []);

    const handleUpdateProduct = async (updatedProduct) => {
        try {
            const response = await fetch(`http://localhost:8000/api/product.php?id=${updatedProduct.id}`, {
               method: 'PUT',
               headers: { 'Content-Type': 'application/json'},
               body: JSON.stringify(updatedProduct) 
            });

            if(!response.ok) {
                const errorResult = await response.json();
                throw new Error(errorResult.error || 'Failed to update product');
            }

            setEditingProduct(null);
            await getProduct();

        } catch(err) {
            alert('Error updating product: ' + err.message)
        }

    }
    
        if (isLoading) return <p>Loading....</p>;
        if (error) return <p>Error: {String(error)}</p>;
    
    // In the return statement, add the form
    return (
        <div className='p-4'>
            {/* ... (Your existing Welcome and Products List JSX) ... */}
            <h2>Our Products</h2>
        <p>This data is coming from our very own modern API route!</p>
        <ul>
            {products.map((product) => (
            <li key={product.id}>
                <strong>{product.name}</strong> - ${product.price} (Stock: {product.stock})
                <button onClick={() => setEditingProduct(product)}>Edit</button>
            </li>
            ))}
        </ul>
        {editingProduct && (
                <EditProductForm 
                    product={editingProduct} 
                    onSave={handleUpdateProduct} 
                    onCancel={() => setEditingProduct(null)} 
                />
            )}
            <hr style={{margin: '2rem 0'}} />

            {/* --- NEW: The "Add Product" Form --- */}
            <h2>Add a New Product</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product Name: </label>
                    <input className='border border-white' type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div style={{ margin: '0.5rem 0' }}>
                    <label>Price: </label>
                    <input className='border border-white' type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div style={{ margin: '0.5rem 0' }}>
                    <label>Stock: </label>
                    <input className='border border-white' type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
                </div>
                <button className='bg-yellow-300 text-black px-4 py-2' type="submit">Add Product</button>
            </form>
        </div>
    );
}