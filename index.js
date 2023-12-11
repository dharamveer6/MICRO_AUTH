const express = require('express');
// const db = require('./db');
const ejs = require('ejs');


const cors=require('cors');
require('dotenv').config();
const rateLimit = require('express-rate-limit');
const path=require('path');
const knex = require('./db');


const { authenticationroutes}=require("./routes/loginroutes.js");
const { consumer } = require('./consumer/create_admin_consum.js');













const app = express();
app.use(cors())
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public', 'views'));
app.use(express.json({ limit: '5mb' }));
app.use(express.json());
app.use('/',express.static(path.join(__dirname,'public')));

app.use('/master/admin/authentication',authenticationroutes)

















// routes for the Hostel





app.get("/check",async(req,res)=>{
  res.send({status:"8421",Backend_Error:"url is working"});
});

app.use("*",async(req,res)=>{
   res.send({status:"6320",Backend_Error:"there is no routes like this hit the correct route"});
 });


app.listen(process.env.port, ()=>{
  console.log(`server started on port ${process.env.port}`)
});
