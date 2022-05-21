import { model, Schema } from 'mongoose';
import { RegistrationDetails } from '../models/registration-details';
import { ParkingSlotModel } from './parking-slot.schema';
import { UserModel } from './user.schema';

const registrationSchema = new Schema<RegistrationDetails>({
    assignedParkingLot: { type: Schema.Types.ObjectId, ref: ParkingSlotModel, required: true },
    assignedUser: { type: Schema.Types.ObjectId, ref: UserModel, required: true },
    assignedTimeStamp: { type: Schema.Types.Date, required: true }
});

export const RegistrationModel = model<RegistrationDetails>('Registration', registrationSchema);