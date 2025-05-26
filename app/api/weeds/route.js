import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Get all weeds
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const { db } = await dbConnect();
    
    // If userId is provided, get weeds for that user
    if (userId) {
      const weeds = await db.collection('weeds')
        .find({ userId })
        .sort({ createdAt: -1 })
        .toArray();
      
      return NextResponse.json(weeds.map(weed => ({
        ...weed,
        id: weed._id.toString(),
        _id: undefined
      })));
    }
    
    // Otherwise get all weeds (could be admin-only in production)
    const weeds = await db.collection('weeds')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return NextResponse.json(weeds.map(weed => ({
      ...weed,
      id: weed._id.toString(),
      _id: undefined
    })));
  } catch (error) {
    console.error('Error fetching weeds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weeds' },
      { status: 500 }
    );
  }
}

// Create a new weed
export async function POST(request) {
  try {
    const data = await request.json();
    const { imageUrl } = data;
    let userId = data.userId;
    
    if (!imageUrl || !userId) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Missing required fields' 
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 400
      });
    }

    // Convert userId to ObjectId
    userId = new ObjectId(userId);
    
    // Get the 'weeds' collection
    const { db } = await dbConnect();
    if (!db) {
      console.error('Database connection failed');
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Database connection failed' 
      }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500
      });
    }

    //Date formatting
    const createdAt = new Date();
    const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}-${(createdAt.getMonth() + 1).toString().padStart(2, '0')}-${createdAt.getFullYear()}`;

    
    // Create new weed entry in database
    const weedResult = await db.collection('weeds').insertOne({
      imageUrl,
      userId,
      date: formattedDate,
    });
    
    return new Response(JSON.stringify({ 
      success: true, 
      data: {
        id: weedResult.insertedId,
        imageUrl,
        userId,
      }
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 201
    });
  } catch (error) {
    console.error('Error creating weed entry:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
}