const Joi = require('joi');
const { CreateError } = require('../utils/createerror');
const { trycatch } = require('../utils/try_catch_handler');
const { transaction } = require('objection');


var add_client=async(req,res,next,transaction)=>{
    const data=req.body;


    const schema = Joi.object({
        email:Joi.string().max(50).required(),
        password:Joi.string().max(50).required(),
        name:Joi.string().max(50).required(),
        phn_no:Joi.string().max(10).required(),

       
      });
      
      
      
      const { error } =  await schema.validateAsync(req.body);

      const ins=await transaction("clients").insert(data);

      res.send({status:1,msg:"client add successfully"})

}

add_client=trycatch(add_client);

module.exports={add_client}