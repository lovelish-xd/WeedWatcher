import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Report from '@/models/Report';
import mongoose from 'mongoose';

export async function GET(req, { params }) {
  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid report ID" }, { status: 400 });
  }

  try {
    const report = await Report.findById(new mongoose.Types.ObjectId(id));
    if (!report) {
      return NextResponse.json({ message: "Report not found" }, { status: 404 });
    }
    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
