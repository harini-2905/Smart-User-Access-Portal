import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  userId: string;
  name: string;
  email: string;
  password: string;
  role: 'General User' | 'Admin';
  department: string;
  status: 'active' | 'inactive';
  createdAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    userId: { type: String, unique: true },
    name: { type: String, required: true, trim: true },
    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
},
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['General User', 'Admin'], default: 'General User' },
    department: { type: String, default: 'General' },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  },
  { timestamps: true }
);

// Auto-generate userId
UserSchema.pre<IUser>('save', async function () {

  if (!this.userId) {

    const count = await mongoose
      .model<IUser>('User')
      .countDocuments();

    this.userId =
      `USR${String(count + 1).padStart(4,'0')}`;

  }

  if (this.isModified('password')) {

    this.password =
      await bcrypt.hash(this.password,10);

  }

});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);