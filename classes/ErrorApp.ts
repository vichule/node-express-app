interface ErrorAppInterface {
    status: number,
    message: string
}

export class ErrorApp extends Error {
    status: number;

    constructor({status, message} : ErrorAppInterface) {
        super(message);
        this.status = status;
    }
}