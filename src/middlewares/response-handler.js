const jxon = require('jxon');

const responseHandler = (req, res, next) => {
  const contentType = req.headers['content-type'];
  switch (contentType) {
    case 'application/json':
      res.setHeader('Content-Type', 'application/json');
      res.status(req.status).send(req.response);
      break;
    case 'application/xml':
      res.setHeader('Content-Type', 'application/xml');
      res.status(req.status).send(jxon.jsToString({ root: req.response }));
      break;
    default:
      res.setHeader('Content-Type', 'application/json');
      res.status(req.status).send(req.response);
      break;
  }
  next();
};

module.exports = responseHandler;
