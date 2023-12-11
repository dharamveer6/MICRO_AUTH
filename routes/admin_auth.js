const express=require('express');
const { admin_tokenval } = require('../middlewares/admintokenval');
const { admin_login, admin_logout } = require('../controller/admin_auth_controller');

const axios=require("axios");
const { CreateError } = require('../utils/createerror');
const { admin_token_val_middleware } = require('../utils/admin_token_val_middlware');





const adminauthenticationroutes= express.Router();

adminauthenticationroutes.route('/login').post(admin_login);
adminauthenticationroutes.route('/token/val').post(admin_tokenval);
adminauthenticationroutes.route('/logout').get(admin_token_val_middleware,admin_logout);


module.exports={adminauthenticationroutes};