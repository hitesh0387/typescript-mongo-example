import e from 'express';
import { ParkinglotController } from '../controllers/parking-lot.controller';
import { Constants } from '../utils/constants';

export class Routes {

    private application!: e.Application;
    private parkingLotController: ParkinglotController;

    public constructor(application: e.Application) {
        this.application = application;
        this.parkingLotController = new ParkinglotController();
    }

    public configureRoutes(): void {
        this.application.get(Constants.AVAILBLE_PARKING_SLOTS_URI, this.parkingLotController.getAvailableParkingSlots);
        this.application.get(Constants.OCCUPIED_PARKING_SLOTS_URI, this.parkingLotController.getOccupiedParkingSlots);
        this.application.get(Constants.REGISTERED_USERS_URI, this.parkingLotController.getRegisteredUsers);
        this.application.post(Constants.CREATE_PARKING_SLOT_URI, this.parkingLotController.createParkingSlot);
        this.application.post(Constants.CREATE_USER_URI, this.parkingLotController.createUser);
        this.application.post(Constants.ASSIGN_PARKING_SLOT_URI, this.parkingLotController.assignSlots);
    }
}