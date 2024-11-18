import mongoose, { Document, Schema, Model } from 'mongoose';

// Interface for the UserProfile document
interface IContact extends Document {
  _id: string;
  email: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IContact>(
  {
    email: { 
      type: String, 
      required: true, 
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    name:  {
      type: String, 
      required: true,
      trim: true,
      maxlength: 50 
    },
    description: { 
      type: String,
      maxlength: 500,
      trim: true 
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Optional: Add email validation
ProfileSchema.path('email').validate(function(value) {
  // Additional custom email validation if needed
  return value.includes('@');
}, 'Invalid email format');

// Model creation with error handling
let ContactProfile: Model<IContact>;
try {
  ContactProfile = mongoose.model<IContact>('ContactProfile');
} catch {
  ContactProfile = mongoose.model<IContact>('ContactProfile', ProfileSchema);
}

export { ContactProfile };
export type { IContact };
