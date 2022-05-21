import { ParkingSlot } from '../models/parking-lot';
import { RegistrationDetails } from '../models/registration-details';
import { User } from '../models/user';
import { ParkingSlotModel } from '../schema/parking-slot.schema';
import { RegistrationModel } from '../schema/registration.schema';
import { UserModel } from '../schema/user.schema';

export class ParkinglotService {

    public constructor() {

    }

    public async getAvailableParkingSlots(): Promise<ParkingSlot[]> {
        const availableparkingSLots: ParkingSlot[] = [];

        const allParkingSlots: ParkingSlot[] = await this.getAllParkingSlots();
        const occupiedparkingSLots: ParkingSlot[] = await this.getOccupiedParkingSlots();

        if (occupiedparkingSLots.length === 0) {
            return allParkingSlots;
        }

        for (const parkingSlot of allParkingSlots) {
            let slot: ParkingSlot | undefined = undefined;

            for (const occupiedSlot of occupiedparkingSLots) {
                if (occupiedSlot.parkingLotNumber === parkingSlot.parkingLotNumber) {
                    slot = parkingSlot;
                    break;
                }
            }

            if (slot === undefined) {
                availableparkingSLots.push(parkingSlot);
            }
        }

        return availableparkingSLots;
    }

    public async getOccupiedParkingSlots(): Promise<ParkingSlot[]> {
        const occupiedparkingSLots: ParkingSlot[] = [];

        const registrations: any[] = await RegistrationModel.find().populate('assignedParkingLot').populate('assignedUser');

        registrations.forEach((data: any) => {
            occupiedparkingSLots.push({
                parkingLotNumber: data.assignedParkingLot.parkingLotNumber,
                isResereved: data.assignedParkingLot.isResereved
            });
        });

        return occupiedparkingSLots;
    }

    public async getTotalRegisteredUsers(): Promise<User[]> {
        const users: User[] = [];

        const userModels = await UserModel.find();

        userModels.forEach(data => users.push({
            userId: data.userId,
            firstName: data.firstName,
            lastName: data.lastName,
            departmentName: data.departmentName,
            emailId: data.emailId
        }));

        return users;
    }

    public async getAllParkingSlots(): Promise<ParkingSlot[]> {

        const parkingSlots: ParkingSlot[] = [];

        const parkingSlotModels: any[] = await ParkingSlotModel.find();

        parkingSlotModels.forEach((data: any) => {
            parkingSlots.push({
                parkingLotNumber: data.parkingLotNumber,
                isResereved: data.isResereved
            });
        });

        return parkingSlots;
    }

    public async createParkingSlot(parkingSlot: ParkingSlot): Promise<any> {
        return await new ParkingSlotModel({
            'parkingLotNumber': parkingSlot.parkingLotNumber,
            'isResereved': parkingSlot.isResereved
        }).save();
    }

    public async createUser(user: User): Promise<any> {
        return await new UserModel({
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            departmentName: user.departmentName,
            emailId: user.emailId
        }).save();
    }

    public async assignSlot(registration: RegistrationDetails): Promise<any> {

        const userModel = await UserModel.find({ 'userId': registration.assignedUser.userId });
        const parkingSlotModel = await ParkingSlotModel.find({ 'parkingLotNumber': registration.assignedParkingLot.parkingLotNumber });

        return await new RegistrationModel({
            assignedParkingLot: parkingSlotModel[0],
            assignedUser: userModel[0],
            assignedTimeStamp: new Date()
        }).save();
    }
}