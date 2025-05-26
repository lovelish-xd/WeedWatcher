import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Report from '@/models/Report';
import { verifyToken } from '@/lib/jwt';
import { ObjectId } from 'mongodb';

// Get all reports (with optional filtering)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId || !ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 }
      );
    }

    const { db } = await dbConnect();

    // Convert userId to ObjectId
    const reports = await db
      .collection("reports")
      .find({ userId: new ObjectId(userId) })
      .sort({ date: -1 }) // Sort by latest date
      .toArray();

    return NextResponse.json(
      reports.map((report) => ({
        ...report,
        _id: report._id.toString(),
        userId: report.userId.toString(),
        weedId: report.weedId.toString(),
      }))
    );
  } catch (error) {
    console.error("Error fetching reports:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reports" },
      { status: 500 }
    );
  }
}

// Create a new report
export async function POST(request) {
  try {
    console.log("Report POST");
    await dbConnect();
    
    // Get user ID from token
    const token = request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      );
    }
    

    // Get report data from request
    const reportData = await request.json();
    
    // Add user ID to report data
    reportData.userId = new ObjectId(decoded.id);
    
    // Create report
    const report = await Report.create(reportData);
    
    return NextResponse.json({
      success: true,
      data: report
    }, { status: 201 });
  } catch (error) {
    console.error('Create report error:', error);
    
    return NextResponse.json(
      { success: false, message: error.message || 'Failed to create report' },
      { status: 500 }
    );
  }
} 