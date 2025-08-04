import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  googleId: {
    type: String,
    sparse: true,
  },
}, {
  timestamps: true,
});

// Ensure either password or googleId is present
UserSchema.pre('save', function(next) {
  if (!this.password && !this.googleId) {
    next(new Error('Either password or googleId must be provided'));
  } else {
    next();
  }
});

export default mongoose.model<IUser>('User', UserSchema);