import { NextFunction, Request, Response } from 'express';
import { HttpResponse } from '../dto/http-response';
import { ParkingSlot } from '../models/parking-lot';
import { RegistrationDetails } from '../models/registration-details';
import { User } from '../models/user';
import { ParkinglotService } from '../service/parking-lot.service';
import { Constants } from '../utils/constants';

export class ParkinglotController {

    private parkinglotService!: ParkinglotService;

    public constructor() {
        this.parkinglotService = new ParkinglotService();
    }

    public getAvailableParkingSlots = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const availableParkingSlots: ParkingSlot[] = await this.parkinglotService.getAvailableParkingSlots();

            if (availableParkingSlots.length === 0) {
                response.status(Constants.NOT_FOUND_HTTP_CODE).send(new HttpResponse(Constants.NOT_FOUND_HTTP_CODE_STRING, 'There are no parking slots available'));
            } else {
                response.status(Constants.SUCCESS_HTTP_CODE).send(availableParkingSlots);
            }
        } catch (e) {
            next(e);
        }
    }

    public getOccupiedParkingSlots = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const occupiedParkingSlots: ParkingSlot[] = await this.parkinglotService.getOccupiedParkingSlots();

            if (occupiedParkingSlots.length === 0) {
                response.status(Constants.NOT_FOUND_HTTP_CODE).send(new HttpResponse(Constants.NOT_FOUND_HTTP_CODE_STRING, 'There are no occupied parking slots'));
            } else {
                response.status(Constants.SUCCESS_HTTP_CODE).send(occupiedParkingSlots);
            }
        } catch (e) {
            next(e);
        }
    }

    public getRegisteredUsers = async (request: Request, response: Response, next: NextFunction): Promise<void> => {

        try {
            const registeredUsers: User[] = await this.parkinglotService.getTotalRegisteredUsers();

            if (registeredUsers.length === 0) {
                response.status(Constants.NOT_FOUND_HTTP_CODE).send(new HttpResponse(Constants.NOT_FOUND_HTTP_CODE_STRING, 'There are no registered users'));
            } else {
                response.status(Constants.SUCCESS_HTTP_CODE).send(registeredUsers);
            }
        } catch (e) {
            console.error('Failed to fetch registered users', e);
            next(e);
        }
    }

    public createParkingSlot = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const parkingSlot: ParkingSlot = request.body;
            response.send(await this.parkinglotService.createParkingSlot(parkingSlot));
        } catch (e) {
            next(e);
        }
    }

    public createUser = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const user: User = request.body;
            response.send(await this.parkinglotService.createUser(user));
        } catch (e) {
            next(e);
        }
    }

    public assignSlots = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
        try {
            const registration: RegistrationDetails = request.body;
            response.send(await this.parkinglotService.assignSlot(registration));
        } catch (e) {
            next(e);
        }
    }
}