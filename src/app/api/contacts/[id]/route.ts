import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { connect } from '@/dbconfigue/dbConfigue';
import { ContactProfile } from '@/models/contactModel';

// Zod validation schema
const ContactSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
  description: z.string().max(500, 'Description must be 500 characters or less').optional()
});

function handleError(res: NextApiResponse, error: unknown) {
  console.error('API Error:', error);
  if (error instanceof z.ZodError) {
    return res.status(400).json({ error: 'Invalid data', details: error.errors });
  }
  return res.status(500).json({
    error: error instanceof Error ? error.message : 'An unexpected error occurred'
  });
}

// Dynamic route handler for GET, PUT, DELETE
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Ensure database connection
    await connect();

    const { id } = req.query;

    // GET: Retrieve a specific contact
    if (req.method === 'GET') {
      const contact = await ContactProfile.findById(id);
      if (!contact) {
        return res.status(404).json({ error: 'Contact not found' });
      }
      return res.status(200).json(contact);
    }

    // PUT: Update a contact
    if (req.method === 'PUT') {
      const body = req.body;
      const validatedData = ContactSchema.partial().parse(body);

      const updatedContact = await ContactProfile.findByIdAndUpdate(
        id,
        validatedData,
        { new: true, runValidators: true }
      );

      if (!updatedContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      return res.status(200).json(updatedContact);
    }

    // DELETE: Remove a contact
    if (req.method === 'DELETE') {
      const deletedContact = await ContactProfile.findByIdAndDelete(id);

      if (!deletedContact) {
        return res.status(404).json({ error: 'Contact not found' });
      }

      return res.status(200).json({ message: 'Contact deleted successfully' });
    }

    // Handle unsupported methods
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return handleError(res, error);
  }
}
