import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connect } from '@/dbconfigue/dbConfigue';
import { ContactProfile } from '@/models/contactModel';


// Zod validation schema
const ContactSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
  description: z.string().max(500, 'Description must be 500 characters or less').optional()
});

function handleError(error: unknown): NextResponse {
  console.error('API Error:', error);
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
  }
  return NextResponse.json(
    { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
    { status: 500 }
  );
}

// New route to get all contacts with optional pagination
export async function GET(req: NextRequest) {
  try {
    // Ensure database connection
    await connect();

    // Extract query parameters for pagination
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Retrieve contacts with pagination
    const contacts = await ContactProfile.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Sort by most recent first

    // Count total contacts for pagination metadata
    const totalContacts = await ContactProfile.countDocuments();

    return NextResponse.json({
      contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalContacts / limit),
        totalContacts,
        pageSize: limit
      }
    });
  } catch (error) {
    return handleError(error);
  }
}

// POST route to create a new contact
export async function POST(req: NextRequest) {
  try {
    // Ensure database connection
    await connect();

    // Parse and validate request body
    const body = await req.json();
    const validatedData = ContactSchema.parse(body);
    
    // Create new contact profile
    const newContact = new ContactProfile(validatedData);
    await newContact.save();

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
