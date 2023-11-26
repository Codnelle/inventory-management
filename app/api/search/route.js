import { MongoClient } from "mongodb";
import next from "next";
import { NextResponse } from "next/server";

export async function GET(request) {
const query = request.nextUrl.searchParams.get("query")
console.log(query, typeof query)
// // Replace the uri string with your connection string.
const uri = "mongodb+srv://<username>:<password>@cluster0.xxmxnr6.mongodb.net/";
const client = new MongoClient(uri);
try {
  const database = client.db('inventory');
  const inventory = database.collection('inv');

  const products = await inventory.aggregate([
    {
      $match: {
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { quantity: { $regex: ' ', $options: 'i' } }
        ]
      }
    }
  ]).toArray()
  
  return NextResponse.json({success: true, products})
} finally {
  // Ensures that the client will close when you finish/error
  await client.close();
}
}



