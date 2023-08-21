const router = require("express").Router();
const { verifyTokenAndAdmin, verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");
const Cart = require("../models/Cart");

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(403).json(err);
  }
});

// //UPDATE CART

router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIAndUpdated(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(403).json(err);
  }
});

//delete
router.delete("/:id", verifyTokenAndAuthorization, async (res, req) => {
  try {
    await Cart.findOneAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted");
  } catch (err) {
    res.status(403).json(err);
  }
});
//GET USER CART

router.get("/find:userId", async (res, req) => {
  try {
    const cart = await Cart.findOne({userId:req.params.userId});

    res.status(200).json(cart);
  } catch (err) {
    res.status(403).json(err);
  }
});

//GET ALL CART
router.get("/",verifyTokenAndAdmin , async(req ,res)=>{

    try {
        const carts =await Cart.find();
        res.status(200).json(carts)



        
    } catch (err) {
        res.status(403).json(err)
        
    }

})




module.exports = router;
