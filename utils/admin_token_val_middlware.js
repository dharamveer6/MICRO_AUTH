const axios=require("axios");
const { trycatch } = require("./try_catch_handler");
const { CreateError } = require("./createerror");
var admin_token_val_middleware=async(req,res,next)=>{

 

        const token = req.header("authorization");
  const tokenParts = token ? token.split(" ") : [];

  console.log(tokenParts[1])

    

    const send_data={token:tokenParts[1]}

    const response = await axios.post('http://localhost:3001/admin/authentication/token/val', send_data);
    // console.log(response)

    // const get_data=JSON.parse(response.data)

    const {status}=response.data;

    console.log(response.data)

    if(status===0){
        throw new CreateError("TokenError",response.data.msg)
    }
    else{

        req.id=response.data.id
        next()
    }
}

admin_token_val_middleware=trycatch(admin_token_val_middleware);

module.exports={admin_token_val_middleware}


