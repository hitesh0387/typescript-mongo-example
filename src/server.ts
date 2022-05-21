import e, { NextFunction, Request, response, Response } from 'express';
import { connect } from 'mongoose';
import { HttpResponse } from './dto/http-response';
import { Routes } from './routes/routes';
import { appConfig } from './utils/config-loader';
import { Constants } from './utils/constants';

const errorHandler = (error: any, request: Request, respose: Response, next: NextFunction): void => {
    console.error('Error occurred while processing URI: {}', request.url, e);

    response.status(Constants.INTERNAL_SERVER_ERROR_CODE).send(new HttpResponse(Constants.INTERNAL_SERVER_ERROR_HTTP_CODE_STRING, 'Error occurred while performing operation. Please contact system admin'));
};

export class Server {

    private application!: e.Application;

    public constructor() {
        this.application = e();
    }

    public initializeAppServer(): void {
        this.connectMongoDB();
        this.configureMiddleWare();
        this.configureRoutes();
        this.startAppServer();
    }

    private connectMongoDB(): void {
        connect(appConfig.mongoURL)
            .then(() => console.log('Successfully connected to mongo DB'))
            .catch(error => {
                console.error('Failed to connect to mongo. Shutting down the app-server', error);
                process.exit(2);
            });
    }

    private configureMiddleWare(): void {
        this.application.use(e.urlencoded({ extended: true }));
        this.application.use(e.json());
        this.application.use(errorHandler);
    }

    private configureRoutes(): void {
        const routes: Routes = new Routes(this.application);
        routes.configureRoutes();
    }

    private startAppServer(): void {
        this.application.listen(appConfig.port, appConfig.host, () => {
            console.log('Started application on port ', appConfig.port);
        })
    }
};

const server: Server = new Server();
server.initializeAppServer();
