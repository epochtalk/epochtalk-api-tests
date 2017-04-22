require('dotenv').load({ slient: true });
module.exports = {
  emailerHost: process.env.EMAILER_HOST,
  host: process.env.HOST
};
