import config from '../conf/config.json';
import { AppConfig } from '../dto/app-config';

export class ConfigLoader {

    private static configLoader: ConfigLoader;
    private activeProfile: string = process.env.ACTIVE_PROFILE || 'local';
    private appConfig!: AppConfig;

    private constructor() {
        this.loadAppConfig();
    }

    private loadAppConfig(): void {
        this.appConfig = (config as any)[this.activeProfile];
    }

    public getAppConfig(): AppConfig {
        return this.appConfig;
    }

    public static getConfigLoaderInstance(): ConfigLoader {
        if (this.configLoader === undefined) {
            this.configLoader = new ConfigLoader();
        }

        return this.configLoader;
    }
}

const configLoader: ConfigLoader = ConfigLoader.getConfigLoaderInstance();
export const appConfig: AppConfig = configLoader.getAppConfig();