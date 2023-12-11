const jwt = require("jsonwebtoken");
const util = require("util");
const { CreateError } = require("../utils/createerror");
const { trycatch } = require("../utils/try_catch_handler");
const { producer } = require("../producer");



const verifyJwt = util.promisify(jwt.verify);

var master_admin_tokenval = async (req, res, next, transaction) => {
  const token = req.header("authorization");
  const tokenParts = token ? token.split(" ") : [];
  if (!tokenParts) {
    throw new CreateError("TokenError", "Header is Empty");
  }

  try {
    const decoded = await verifyJwt(tokenParts[1], process.env.secret_key);
    console.log(decoded.id);
   
    req.id = decoded.id;

    var { token: comp_token } = await transaction("master_admins")
      .select("token")
      .where({ id: decoded.id })
      .first();

    if (tokenParts[1] !== comp_token) {
      throw new CreateError("TokenError", "Invalid Token");
    }

    next();
  } catch (error) {
    throw new CreateError("TokenError", "Invalid Token");
  }
};

master_admin_tokenval = trycatch(master_admin_tokenval);

module.exports = { master_admin_tokenval };
