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
    const corsConfig = {
        origin:"*",
        credential:true,
        methods:["GET","POST","PUT","PATCH","DELETE"]
    }
    app.options("",cors(corsConfig))
    app.use(cors(corsConfig));
    app.use(bodyParser.urlencoded({ limit: '200mb', extended: true }));
    await initSequelize();
    app.use(contentHandler);
    require('./src/config/routes')(app);
    app.use(errorHandler);
    app.use(responseHandler);
    app.use(logHandler);
    app.get("/", (req, res) => res.send("Express on Vercel"));
    app.listen(nodePort, () => {
        console.log(`listening to port ${nodePort}`);
    }).on('error', (err) => {
        console.error("error", err);
        process.exit();
    });
};

StartServer();
