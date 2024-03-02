const Sequelize = require('sequelize');
const retrieveDBSecrets = require('./dbConfig');
const models = {};
let sequelize = null;

const initSequelize = async () => {
  if (!sequelize) {
    const dbSecrets = await retrieveDBSecrets();

    sequelize = new Sequelize(
      dbSecrets.database,
      dbSecrets.username,
      dbSecrets.password,
      {
        host: dbSecrets.host,
        dialect: dbSecrets.dialect,
        port: dbSecrets.port,
        pool: {
          max: dbSecrets.pool.max,
          min: dbSecrets.pool.minmin,
          // acquire: dbSecrets.pool.acquire,
          // idle: dbSecrets.pool.idle,
          acquire: 10000 * 10000,
          idle: 10000
        },
        define: {
          timestamps: dbSecrets.define.timestamps,
        },
      }
    );
    await sequelize
      .authenticate()
      .then(() => { 
        console.log("database connected successfully");
      })
      .catch((err) => {
        console.log(err);
        console.log("error while connecting database");
       });
  }

  models.sequelize = sequelize;
  models.Sequelize = Sequelize;

  // Models
  require('../../../models/postgresModels')(models, sequelize, Sequelize);

  // await sequelize.sync();

};

module.exports = { models, initSequelize };
