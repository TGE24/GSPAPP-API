const secrets = {
    dbUri: process.env.DB_URI || 'mongodb://DSC-Calabar:calabar001@ds121814.mlab.com:21814/universities-api',
};

//remote datatbase mongodb://<dbuser>:<dbpassword>@ds217678.mlab.com:17678/gsp-api

//local db mongodb://localhost/gspdb

const getSecret = (key) => secrets[key];

module.exports = { getSecret };
