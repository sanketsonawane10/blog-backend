/*
 * Author Name : Sanket Sonawanr
 * Description : script for performing migrations
 */

// index.js
require('dotenv').config();
const { Sequelize } = require('sequelize');
const { Umzug, SequelizeStorage } = require('umzug');

const retrieveSecrets = require("./src/providers/aws/secretManager");
const postgresConfig = require('./src/config/db/postgres/postgresql.config.json');

(async () => {
  const env = process.env.NODE_ENV;

  let dbConfig;

  // load db configurations according to environment
  if (['local'].includes(env)) {
    dbConfig = postgresConfig[env];
  } else {
    const dbSecrets = await retrieveSecrets();
    dbConfig = dbSecrets;
    dbConfig.dialect = dbConfig.engine;
    dbConfig.database = dbConfig.dbInstanceIdentifier;
  }

  // initialize db connection
  const sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
    },
    dbConfig
  );
  await sequelize.authenticate();

  // initialize umzug instance for migrations
  const umzug = new Umzug({
    migrations: { glob: './src/db/postgresql/migrations/*.js' },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize, tableName: 'sequelizeMetaBlog' }),
    logger: console,
  });

  const args = process.argv.slice(2);
  switch (args[0]) {
    case '--up': {
      const options = {};
      if (args[1]) {
        const o = args[1].split(':');
        options[o[0]] = o[1];
      }
      await umzug.up(options);
      break;
    }
    case '--down': {
      const options = {};
      if (args[1]) {
        const o = args[1].split(':');
        if (o[0] === 'to' && o[1] === '0') options.to = 0;
        else options[o[0]] = o[1];
      }
      await umzug.down(options);
      break;
    }
    default:
      // eslint-disable-next-line no-console
      console.error('unsupported argument');
  }
})();
