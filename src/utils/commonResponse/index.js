const commonResponse = (req, data, status, message) => {
    req.status = status;
    req.response = {
      success: true,
      message,
      data,
    };
};

module.exports = commonResponse;