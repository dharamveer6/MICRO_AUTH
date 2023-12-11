const Joi = require('joi');
const { CreateError } = require('../utils/createerror');
const { trycatch } = require('../utils/try_catch_handler');
const { transaction } = require('objection');
const jwt = require("jsonwebtoken");

const util = require("util");
const { producer } = require('../producer');

const signAsync = util.promisify(jwt.sign);
 

var admin_login=async(req,res,next,transaction)=>{
    const data=req.body;

    const schema = Joi.object({
        email:Joi.string().max(50).required(),
        password:Joi.string().max(50).required(),
       
       
      });
      
      
      
      const { error } =  await schema.validateAsync(req.body);

      const query = await transaction
      .select("*")
      .from("clients")
      .where("email", data.email)
      .first();
    if (!query) {
      throw new CreateError("CustomError","Invalid Email")
    }

    const plainpass = data.password;
    var hashpass = query.password;

    
    if (plainpass == hashpass) {
        const payload = {
          id: query.id
         
        };
  
       
          const tok = await signAsync(payload, process.env.secret_key, { expiresIn: "365d" });
      
          await transaction("clients")
            .where("id", query.id)
            .update({ token: tok });
      
          return res.send({
            status: 1,
            token: tok,
            userName: query.name,
          });
      
      }else {
        throw new CreateError("CustomError","Invalid Password")
      }



}


var admin_logout=async(req,res,next,transaction)=>{
    let inst = await transaction("clients")
        .where("id", req.id)
        .update({ token: null });
     
      res.send({ status: 1, message: "You have successfully logged out." });
 }

 admin_login=trycatch(admin_login)
 admin_logout=trycatch(admin_logout);

 module.exports={admin_login,admin_logout}

