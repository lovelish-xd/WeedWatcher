import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/jwt';

export async function GET(request) {
  try {
    await dbConnect();
    
    // Get token from header
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Find user by ID
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Return user data
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          profilePic: user.profilePic,
          createdAt: user.createdAt
        }
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to get user profile' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();

    // Get token from header
    const token = request.headers.get('authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Parse request body
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const profilePic = formData.get('profilePic');

    // Find user
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;

    // Handle profile picture upload (assuming you store images in a cloud service or base64)
    if (profilePic) {
      // Assuming profilePic is a URL from Cloudinary
      user.profilePic = profilePic;
    }

    await user.save();

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to update profile' },
      { status: 500 }
    );
  }
}
