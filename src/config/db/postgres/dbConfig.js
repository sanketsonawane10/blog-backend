const { database, username, password, dialect, host, port, nodeEnv, } = require('../../envConfig');
const retrieveSecrets = require('../../../../src/providers/aws/secretManager');

module.exports = async () => {

  let dbConnectionConfig = {};
  if (nodeEnv === 'local') {
    dbConnectionConfig = {
      database,
      username,
      password,
      host,
      dialect,
      port,
    };
  }
   else {
    // const dbSecrets = await retrieveSecrets();
    // dbConnectionConfig = {
    //   database: dbSecrets.dbInstanceIdentifier,
    //   username: dbSecrets.username,
    //   password: dbSecrets.password,
    //   host: dbSecrets.host,
    //   dialect: dbSecrets.engine,
    //   port: dbSecrets.port,
    // };
  }

  dbConfig = {
    ...dbConnectionConfig,
    pool: {
      max: 5,
      min: 0,
      acquire: 10000,
      idle: 10000,
    },
    define: {
      timestamps: true,
    },
  };
  return dbConfig;
};
