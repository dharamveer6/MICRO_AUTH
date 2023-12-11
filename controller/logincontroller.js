const Joi = require('joi');
const { CreateError } = require('../utils/createerror');
const { trycatch } = require('../utils/try_catch_handler');
const { transaction } = require('objection');
const jwt = require("jsonwebtoken");

const util = require("util");
const { producer } = require('../producer');

const signAsync = util.promisify(jwt.sign);
 
 
 var master_admin_login=async(req,res,next,transaction)=>{
    const data=req.body;
    const schema = Joi.object({
        email:Joi.string().max(50).required(),
        password:Joi.string().max(50).required(),
       
      });
      
      
      
      const { error } =  await schema.validateAsync(req.body);

      const query = await transaction
      .select("*")
      .from("master_admins")
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
      
          await transaction("master_admins")
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

 var master_admin_logout=async(req,res,next,transaction)=>{
    let inst = await transaction("master_admins")
        .where("id", req.id)
        .update({ token: null });
     
      res.send({ status: 1, message: "You have successfully logged out." });
 }

 var add_master_admin=async(req,res,next,transaction)=>{
  var data=req.body;

  const schema = Joi.object({
    email:Joi.string().max(50).required(),
    password:Joi.string().max(50).required(),
    name:Joi.string().max(50).required(),
   
  });
  
  
  
  const { error } =  await schema.validateAsync(req.body);

  const check=await transaction("master_admins").select("*").where({email:data.email}).first();
  if(check){
    throw new CreateError("CustomError","email is already Aloted")
  }

  const payloads = [
    {
      topic: 'create_admin', // Replace with your desired topic
      messages: JSON.stringify(data), // Message to send
    },
  ];

  producer.send(payloads, function (err, data) {
    if (err) {
      console.error('Producer error:', err);
    } else {
      console.log('Message sent:', data);
    }
  });

// var data2=await transaction("master_admins").insert(data);

  res.send({status:1,msg:"Admin asap check3 Registor Successfully"})


 }

 master_admin_login=trycatch(master_admin_login)
 master_admin_logout=trycatch(master_admin_logout)
 add_master_admin=trycatch(add_master_admin)

 module.exports={master_admin_login,master_admin_logout,add_master_admin}