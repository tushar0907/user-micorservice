import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  surname: String,
  username: { type: String, unique: true },
  birthdate: Date,
  blockedBy: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export interface User extends Document {
  id: string;
  name: string;
  surname: string;
  username: string;
  birthdate: Date;
  blockedBy: string[];
}
