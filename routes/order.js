const router = require("express").Router();
const {
    verifyTokenAndAdmin,
    verifyToken,
    verifyTokenAndAuthorization,
} = require("./verifyToken");
const Order = require("../models/Order");

//CREATE
router.post("/", verifyToken, async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(403).json(err);
    }
});

// //UPDATE ORDER

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIAndUpdated(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(403).json(err);
    }
});

//delete
router.delete("/:id", verifyTokenAndAdmin, async (res, req) => {
    try {
        await Order.findOneAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");
    } catch (err) {
        res.status(403).json(err);
    }
});
//GET USER ORDER

router.get("/find:userId", async (res, req) => {
    try {
        const Orders = await Order.find({ userId: req.params.userId });

        res.status(200).json(Orders);
    } catch (err) {
        res.status(403).json(err);
    }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const Orders = await Order.find();
        res.status(200).json(Orders);
    } catch (err) {
        res.status(403).json(err);
    }
});


//GET MONTHLY INCOME
router.get("/income" ,verifyTokenAndAdmin , async (res ,req)=>{
    const date =new Date();
    const lastMonth =new Date(date.setMonth(date.getMonth()-1));
    const previousMonth =new Date(date.l(lastMonth.getMonth()-1));

    try {
        const income =await Order.aggregate([
            {$match:{createdAt:{$gte:previousMonth}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount",
                },
                
                    $group:{
                        _id:"$month",
                        total:{$sum:"$sales"},

                    }
            
            },
        ]);
        res.status(200).json(income);

        
    } catch (err) {
        res.status(403).json(err)
        
    }



})

module.exports = router;
