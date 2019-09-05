const secrets = {
    dbUri: process.env.DB_URI || 'mongodb://localhost/gspdb',
};

const getSecret = (key) => secrets[key];

module.exports = { getSecret };