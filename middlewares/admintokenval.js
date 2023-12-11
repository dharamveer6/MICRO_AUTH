const jwt = require("jsonwebtoken");
const util = require("util");
const { CreateError } = require("../utils/createerror");
const { trycatch } = require("../utils/try_catch_handler");
const { producer } = require("../producer");
const knex = require("../db");



const verifyJwt = util.promisify(jwt.verify);

var admin_tokenval = async (req, res, next) => {

    try{
  const token = req.body.token;
  console.log(token,"token in admin")



  if (!token) {
    return res.send({status:0,msg:"token is empty"})
  }



  try {
    const decoded = await verifyJwt(token, process.env.secret_key);
    console.log(decoded.id);
   
    id = decoded.id;

    var { token: comp_token } = await knex("clients")
      .select("token")
      .where({ id })
      .first();

    if (token !== comp_token) {
        return res.send({status:0,msg:"invalid not match token"})
    }

    return res.send({status:1,id})
  } catch (error) {
    console.log(error)
    return res.send({status:0,msg:"invalid verify token"})
  }
}
catch(err){
    console.log(err)

    return res.send({status:0,msg:"error in master admin panel during verify the token"})
}
};


module.exports = { admin_tokenval };
