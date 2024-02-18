const bodyparser = require('body-parser');
require('body-parser-xml')(bodyparser);

const contentHandler = (req, res, next) => {
  try {
    const contentType = req.headers['content-type'];
    if (req.method !== 'GET') {
      switch (contentType) {
        case 'application/json':
          return bodyparser.json()(req, res, next);
        case 'application/xml':
          return bodyparser.xml({
            xmlParseOptions: {
              explicitArray: false,
              explicitRoot: false,
              explicitChildren: false,
              explicitCharkey: false,
            },
          })(req, res, next);
        default:
          next({ statuscode: 415, message: 'Content Type not supported' });
      }
    }
    next();
  } catch (e) {
    next();
  }
};

module.exports = contentHandler;
