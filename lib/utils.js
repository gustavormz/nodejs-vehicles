const constructCustomErrorByType = (type, message) => {
    const error = new Error(message);
    error.message = message;
    error.type = type;
    throw error;
};

module.exports = {
    constructCustomErrorByType
};
