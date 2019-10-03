const secrets = {
  dbUri: process.env.DB_URI || "mongodb://localhost/gspdb"
};

//remote datatbase mongodb://tg:1some2thing@ds217678.mlab.com:17678/gsp-api

//local db mongodb://localhost/gspdb

const getSecret = key => secrets[key];

module.exports = { getSecret };
