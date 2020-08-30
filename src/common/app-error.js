class AppError extends Error {

    constructor(message = 'An application error has ocurred!') {
        super(message);
    }

}

module.exports = {
    AppError
}