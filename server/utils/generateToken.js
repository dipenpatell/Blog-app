const jwt = require("jsonwebtoken");

module.exports = (user) => {
  return jwt.sign({ emailid: user.emailid, id: user._id }, process.env.JWT_KEY);
};
