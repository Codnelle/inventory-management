import { MongoClient } from "mongodb";
import next from "next";
import { NextResponse } from "next/server";

export async function GET(request) {
   

// // Replace the uri string with your connection string.
const uri = "mongodb+srv://<username>:<password>@cluster0.xxmxnr6.mongodb.net/";

const client = new MongoClient(uri);


  try {
    const database = client.db('inventory');
    const movies = database.collection('inv');

    // Query for a movie that has the title 'Back to the Future'
    const query = {};
    const movie = await movies.find(query).toArray();
    console.log(movie);
    return NextResponse.json({"a": 34, movie})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


