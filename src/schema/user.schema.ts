import { model, Schema } from 'mongoose';
import { User } from '../models/user';

const userSchema = new Schema<User>({
    userId: { type: Schema.Types.Number, required: true },
    firstName: { type: Schema.Types.String, required: true },
    lastName: { type: Schema.Types.String, required: true },
    departmentName: { type: Schema.Types.String, required: true },
    emailId: { type: Schema.Types.String, required: true },
});

export const UserModel = model<User>('User', userSchema);