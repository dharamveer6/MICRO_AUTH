const express=require('express');
const { master_admin_login, master_admin_logout, add_master_admin } = require('../controller/master_admin_authcontroller');
const { master_admin_tokenval } = require('../middlewares/masteradmintokenval');



const authenticationroutes= express.Router();

authenticationroutes.route('/login').post(master_admin_login);
authenticationroutes.route('/logout').get(master_admin_tokenval,master_admin_logout);
authenticationroutes.route('/registor/master/admin').post(add_master_admin);

module.exports={authenticationroutes};