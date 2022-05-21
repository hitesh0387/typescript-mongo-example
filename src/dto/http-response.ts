export class HttpResponse<T> {

    public constructor(code: string, response: T) {
        this.code = code;
        this.response = response;
    }

    public code!: string;
    public response!: T;
}