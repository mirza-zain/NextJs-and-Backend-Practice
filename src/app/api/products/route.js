// app/api/products/route.js

import { NextResponse } from 'next/server';

const products = [
  { id: 1, name: 'Classic T-Shirt', price: 15.99, stock: 150 },
  { id: 2, name: 'Stylish Jeans', price: 49.99, stock: 100 },
  { id: 3, name: 'Comfortable Sneakers', price: 89.99, stock: 75 }
];

export async function GET(request) {
  return NextResponse.json(products);
}