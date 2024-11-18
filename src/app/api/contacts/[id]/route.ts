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

// Dynamic route handler for GET, PUT, DELETE
export async function handler(
  req: NextRequest, 
  { params }: { params: { id: string } }
) {
  try {
    // Ensure database connection
    await connect();

    const { id } = params;
    
    // GET: Retrieve a specific contact
    if (req.method === 'GET') {
      const contact = await ContactProfile.findById(id);
      if (!contact) {
        return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
      }
      return NextResponse.json(contact);
    }

    // PUT: Update a contact
    if (req.method === 'PUT') {
      const body = await req.json();
      const validatedData = ContactSchema.partial().parse(body);

      const updatedContact = await ContactProfile.findByIdAndUpdate(
        id, 
        validatedData, 
        { new: true, runValidators: true }
      );

      if (!updatedContact) {
        return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
      }

      return NextResponse.json(updatedContact);
    }

    // DELETE: Remove a contact
    if (req.method === 'DELETE') {
      const deletedContact = await ContactProfile.findByIdAndDelete(id);
      
      if (!deletedContact) {
        return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
      }

      return NextResponse.json({ message: 'Contact deleted successfully' });
    }

    // Handle unsupported methods
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  } catch (error) {
    return handleError(error);
  }
}

export { handler as GET, handler as PUT, handler as DELETE };