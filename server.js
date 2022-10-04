const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require('mongoose');
const dotenv= require("dotenv").config();
const app = express();
const authRoute = require('./routes/auth');
const  userRoute= require('./routes/user');
const  productRoute= require('./routes/product');
const  cartRoute= require('./routes/cart');
const  orderRoute= require('./routes/order');

 

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect(process.env.DATABASE).then(
  console.log("DB conntected successfully ")
).catch(err => console.log(err))

app.use(express.json());
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/product', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)



app.listen(process.env.port || 5000, function() {
  console.log("Server started on port 5000");
});