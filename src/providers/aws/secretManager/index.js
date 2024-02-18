const AWS = require("aws-sdk");
let { accessKeyId, secretAccessKey, nodeEnv } = require("../../../config/envConfig");
const awsSecrets = require("../../../utils/constants/aws");

module.exports = () => {
  let region, SecretId;
  region = awsSecrets[nodeEnv].awsRegion;
  SecretId = awsSecrets[nodeEnv].dbSecret;

  const client = new AWS.SecretsManager({ region, accessKeyId, secretAccessKey }); //Local
  // const client = new AWS.SecretsManager({ region });
  return new Promise((resolve, reject) => {
    //retrieving secrets from secrets manager
    client.getSecretValue({ SecretId }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        //parsing the fetched data into JSON
        const secretsJSON = JSON.parse(data.SecretString);
        // let secretsString = "";
        // Object.keys(secretsJSON).forEach((key) => {
        // 	secretsString += `${key}=${secretsJSON[key]}\n`;
        // });
        //
        console.log(secretsJSON);
        resolve(secretsJSON);
      }
    });
  });
};