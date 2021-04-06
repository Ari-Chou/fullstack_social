/**
 * Session Configuration
 * (sails.config.session)
 *
 * Use the settings below to configure session integration in your app.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For all available options, see:
 * https://sailsjs.com/config/session
 */

module.exports.session = {
  cookie: {
    maxAge: 365 * 24 * 60 * 60 * 1000
    // _expires: 365 * 24 * 60 * 60 * 1000
  },
  secret: "0304f6ca28a4d8c0383b05575b27a068",
  adapter: "connect-mongo",
  url: "mongodb://fullstack:qezjIr-jyqber-7hiwbo@cluster0-shard-00-00.osyqc.mongodb.net:27017,cluster0-shard-00-01.osyqc.mongodb.net:27017,cluster0-shard-00-02.osyqc.mongodb.net:27017/fullstack?ssl=true&replicaSet=atlas-a0zv4i-shard-0&authSource=admin&retryWrites=true&w=majority",
  collection: "sessions",
};

