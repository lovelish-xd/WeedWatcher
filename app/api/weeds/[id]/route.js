import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// Get a single weed by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    const { db } = await connectToDatabase();
    
    // Find the weed entry by ID
    const weed = await db.collection('weeds').findOne({ 
      _id: new ObjectId(id) 
    });
    
    if (!weed) {
      return NextResponse.json(
        { error: 'Weed entry not found' },
        { status: 404 }
      );
    }
    
    // Get the associated user
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(weed.userId) },
      { projection: { password: 0 } } // Exclude sensitive data
    );
    
    return NextResponse.json({
      ...weed,
      id: weed._id.toString(),
      _id: undefined,
      user: user ? {
        ...user,
        id: user._id.toString(),
        _id: undefined
      } : null
    });
  } catch (error) {
    console.error('Error fetching weed entry:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weed entry' },
      { status: 500 }
    );
  }
}

// Update a weed
export async function PUT(request, { params }) {
  try {
    await prisma.weed.update({
      where: { id: params.id },
      data: await request.json(),
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update weed error:', error);
    
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update weed' },
      { status: 500 }
    );
  }
}

// Delete a weed
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    
    const { db } = await connectToDatabase();
    
    const result = await db.collection('weeds').deleteOne({ 
      _id: new ObjectId(id) 
    });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Weed entry not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting weed entry:', error);
    return NextResponse.json(
      { error: 'Failed to delete weed entry' },
      { status: 500 }
    );
  }
} 