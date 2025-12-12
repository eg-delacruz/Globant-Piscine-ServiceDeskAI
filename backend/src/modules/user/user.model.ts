import mongoose, { Schema, Document } from 'mongoose';

// Define the User interface extending mongoose Document
export interface IUser extends Document {
  email: string;
  password: string; // hashed
  role: 'super_user' | 'standard_user' | 'service_desk_user';
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['super_user', 'standard_user', 'service_desk_user'],
      required: true,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>('User', userSchema);
