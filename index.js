const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const { errorHandler, contentHandler, logHandler, responseHandler } = require('./src/middlewares');
const { initSequelize } = require('./src/config/db/postgres/seqConfig');
let { nodePort } = require('./src/config/envConfig');
nodePort = nodePort || 6000;

const StartServer = async () => {
    app.use(bodyParser.json({ limit: '200mb' }));
    app.use(cors());
    app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
    await initSequelize();
    app.use(contentHandler);
    require('./src/config/routes')(app);
    app.use(errorHandler);
    app.use(responseHandler);
    app.use(logHandler);
    app.listen(nodePort, () => {
        console.log(`listening to port ${nodePort}`);
    }).on('error', (err) => {
        console.error("error", err);
        process.exit();
    });
};

StartServer();
