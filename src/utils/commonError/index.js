
const commonError = ({ statusCode = 500, message = "Something went wrong!", data = {} }) => {
    const error = new Error(`${message}`)
    error.statuscode = statusCode;
    error.data = data;
console.error("error",error);
    throw error;
};



module.exports = commonError;