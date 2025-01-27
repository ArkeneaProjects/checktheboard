require('dotenv').config();
var constants = {
  PORT: process.env.PORT,
  database: {
    url: process.env.DATABASE //value set in .env file
  },
  clientUrl: process.env.CLIENT_URL,
  dateFormat:'m/d/Y'
}

module.exports = constants