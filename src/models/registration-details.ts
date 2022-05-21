import { ParkingSlot } from './parking-lot';
import { User } from './user';

export class RegistrationDetails {
    public assignedParkingLot!: ParkingSlot;
    public assignedUser!: User;
    public assignedTimeStamp!: Date;
}