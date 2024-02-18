const errorHandler = (err, req, res, next) => {
  let statusCode = req.statuscode ? req.statuscode : err.statuscode;
  let data = err.data ?  err.data : {};
  req.error = true;
  req.status = statusCode ? statusCode : 500;
  req.response = {
    success: false,
    error: {
      data,
      message: err.message,
      code: req.status
    }
  };
  next();
};

module.exports = errorHandler;
