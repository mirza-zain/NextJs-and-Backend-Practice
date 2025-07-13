// app/api/hello/route.js

import { NextResponse } from 'next/server';

export async function GET(request) {
  // In the App Router, we export functions named after HTTP methods (GET, POST, etc.)
  // We use the new `NextResponse` object to send back a response.
  return NextResponse.json({ message: 'Hello from the App Router API!' });
}