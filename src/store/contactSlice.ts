import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Contact, PaginationMeta } from './types';

// Initial state interface
interface ContactState {
  contacts: Contact[];
  pagination: PaginationMeta;
  isLoading: boolean;
  error: string | null;
}

// Initial state
const initialState: ContactState = {
  contacts: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalContacts: 0,
    pageSize: 10
  },
  isLoading: false,
  error: null
};

// Async thunks
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/contacts?page=${page}&limit=10`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async ({ contactId, password }: { contactId: string, password: string }, { rejectWithValue, dispatch, getState }) => {
    if (password !== 'youcannotdeletethis') {
      return rejectWithValue('Incorrect password');
    }

    try {
      const response = await fetch(`/api/contacts/${contactId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete contact');
      }

      // Get the current page from the state
      const state = getState() as { contacts: ContactState };
      const currentPage = state.contacts.pagination.currentPage;

      // Refetch contacts after deletion, passing the current page
      dispatch(fetchContacts(currentPage));
      return contactId;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unexpected error occurred');
    }
  }
);

// Slice
const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Contacts
    builder.addCase(fetchContacts.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      state.contacts = action.payload.contacts;
      state.pagination = action.payload.pagination;
      state.isLoading = false;
    });
    builder.addCase(fetchContacts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Delete Contact
    builder.addCase(deleteContact.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  }
});

export default contactsSlice.reducer;