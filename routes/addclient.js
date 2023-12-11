const express=require('express');

const { master_admin_tokenval } = require('../middlewares/masteradmintokenval');
const { add_client } = require('../controller/addclientcontroller');



const addclientroutes= express.Router();

addclientroutes.route('/register/client').post(master_admin_tokenval,add_client);
// addclientroutes.route('/logout').get(master_admin_tokenval,master_admin_logout);
// addclientroutes.route('/registor/master/admin').post(master_admin_tokenval,add_master_admin);

module.exports={addclientroutes};