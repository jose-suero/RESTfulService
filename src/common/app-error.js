class AppError extends Error {

    constructor(message = 'An application error has ocurred!', statusCode = 500) {
        super(message);

        this.statusCode = statusCode;
        this.date = new Date();
        this.errorId = `${this.date.getTime()}-${Math.random() * 10000 }`;
    }

}

module.exports = {
    AppError
}