export class Constants {

    public static readonly AVAILBLE_PARKING_SLOTS_URI: string = '/available-parking-slots';
    public static readonly OCCUPIED_PARKING_SLOTS_URI: string = '/occupied-parking-slots';
    public static readonly REGISTERED_USERS_URI: string = '/registered-users';
    public static readonly CREATE_PARKING_SLOT_URI: string = '/slots';
    public static readonly CREATE_USER_URI: string = '/users';
    public static readonly ASSIGN_PARKING_SLOT_URI: string = '/registrations';


    public static readonly SUCCESS_HTTP_CODE: number = 200;
    public static readonly NOT_FOUND_HTTP_CODE: number = 404;
    public static readonly INTERNAL_SERVER_ERROR_CODE: number = 500;

    public static readonly NOT_FOUND_HTTP_CODE_STRING: string = 'Entity not found';
    public static readonly INTERNAL_SERVER_ERROR_HTTP_CODE_STRING: string = 'Internal server error';
}