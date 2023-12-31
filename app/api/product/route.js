import { MongoClient } from "mongodb";
import next from "next";
import { NextResponse } from "next/server";

export async function GET(request) {

// // Replace the uri string with your connection string.
const uri = "mongodb+srv://<username>:<password>@cluster0.xxmxnr6.mongodb.net/";
const client = new MongoClient(uri);
try {
  const database = client.db('inventory');
  const inventory = database.collection('inv');
  
  const query = {};
  const products = await inventory.find(query).toArray();
  
  return NextResponse.json({success: true, 
    products})
} finally {
  // Ensures that the client will close when you finish/error
  await client.close();
}
}




export async function POST(request) {
   
    let body = await request.json();

// // Replace the uri string with your connection string.
const uri = "mongodb+srv://admin:admin@cluster0.xxmxnr6.mongodb.net/";
const client = new MongoClient(uri);
  try {
    const database = client.db('inventory');
    const inventory = database.collection('inv');

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const products = await inventory.insertOne(body);
    
    return NextResponse.json({products, ok: true})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


