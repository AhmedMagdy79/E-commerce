exports.validationError = (message) => {
    message = message || "wrong Data";
    const error = new Error(message);
    error.statusCode = 422;
    throw error;
}

exports.unauthorizedError = (message) => {
    message = message || "Unauthorized";
    const error = new Error(message);
    error.statusCode = 401;
    throw error;
};


exports.forbiddenError = (message) => {
    message = message || "Forbidden access";
    const error = new Error(message);
    error.statusCode = 403;
    throw error;
};


exports.notFoundError = () =>{
    message = "not found";
    const error = new Error(message);
    error.statusCode = 404;
    throw error;
}

exports.badRequestError = (message) => {
    message = message || "Error occurred";
    const error = new Error(message);
    error.statusCode = 400;
    throw error;
};