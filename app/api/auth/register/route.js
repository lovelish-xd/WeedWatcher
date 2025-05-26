import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { signToken } from '@/lib/jwt';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { name, email, password, profilePic } = await request.json();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User already exists' },
        { status: 400 }
      );
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      profilePic
    });
    
    // Generate JWT token
    const token = signToken({
      id: user._id,
      email: user.email,
      name: user.name
    });
    
    // Return user data (without password) and token
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    return NextResponse.json(
      { success: false, message: error.message || 'Registration failed' },
      { status: 500 }
    );
  }
} 