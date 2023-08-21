const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    userId: { type: string, required: true},
    products: [
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1,
            },

            
        },

    ],
    amount:{type:Number, required:true},
    address:{type:Object, required:true},
    status:{type:string , default:"pending"}

  },
  { timestamps: true }
);
module.exports = mongoose.model("User", orderSchema);
