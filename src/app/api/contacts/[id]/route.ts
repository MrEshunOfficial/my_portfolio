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

function handleError(error: unknown) {
  console.error('API Error:', error);
  if (error instanceof z.ZodError) {
    return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
  }
  return NextResponse.json({
    error: error instanceof Error ? error.message : 'An unexpected error occurred'
  }, { status: 500 });
}

// GET: Retrieve a specific contact
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const contact = await ContactProfile.findById(params.id);
    
    if (!contact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    
    return NextResponse.json(contact, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

// PUT: Update a contact
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const body = await request.json();
    const validatedData = ContactSchema.partial().parse(body);

    const updatedContact = await ContactProfile.findByIdAndUpdate(
      params.id,
      validatedData,
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json(updatedContact, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}

// DELETE: Remove a contact
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const deletedContact = await ContactProfile.findByIdAndDelete(params.id);

    if (!deletedContact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Contact deleted successfully' }, { status: 200 });
  } catch (error) {
    return handleError(error);
  }
}