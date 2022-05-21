import { model, Schema } from 'mongoose';
import { ParkingSlot } from '../models/parking-lot';

const parkingSlotSchema = new Schema<ParkingSlot>({
    parkingLotNumber: { type: Schema.Types.String, required: true },
    isResereved: { type: Schema.Types.Boolean, required: true }
});

export const ParkingSlotModel = model<ParkingSlot>('ParkingSlot', parkingSlotSchema);