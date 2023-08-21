const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRouter =require("./routes/user")
const authRouter =require("./routes/auth")
const cartRouter =require("./routes/cart")
const orderRouter =require("./routes/order")
const productRouter = require("./routes/product")


const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
},).then((res) => {
  console.log("MongoDb connection successfully");
}).catch(error => {
   console.log(error);
 });


  app.use("/api/auth",authRouter)
  app.use("/api/users",userRouter)
  app.use("/api/products",productRouter)
  app.use("/api/carts",cartRouter)
  app.use("/api/orders",orderRouter)




const PORT =5000;
app.listen(PORT, () => {
  
  console.log("server is running");

});
