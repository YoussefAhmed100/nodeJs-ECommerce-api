const router =require("express").Router();
const {verifyTokenAndAdmin,verifyTokenAndAuthorization} =require ('./verifyToken');
const User =require ("../models/User")


//UPDATE USER

router.put("/:id" , verifyTokenAndAuthorization, async(req,res)=>{
    if(req.body.password){
       req.body. password= CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
          ).toString();
    }
    try {

        const updatedUser =await User.findByIAndUpdated(req.params.id ,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedUser)
        
    } catch (err) {
        res.status(403).json(err)
        
    }
 

})

//delete
router.delete("/:id", verifyTokenAndAuthorization, async (res, req) => {
    try {
        await User.findOneAndDelete(req.params.id);
        res.status(200).json("user has been deleted");
    } catch (err) {
        res.status(403).json(err);
    }
});
//GET USER

router.get("/find:id", verifyTokenAndAdmin, async (res, req) => {
    try {
        const user = await User.findById(req.params.id);

        const { password, ...others } = user._duc;

        res.status(200).json({ others });
    } catch (err) {
        res.status(403).json(err);
    }
});

//GET ALL USER

router.get("/", verifyTokenAndAdmin, async (res, req) => {
    const query =req.query.new
    try {
        const users = query ?await User.find().sort({_id :-1}).limit(5)  : await User.find();


        res.status(200).json( users);
    } catch (err) {
        res.status(403).json(err);
    }
});
//GET USER STATS
router.get ("/stats", verifyTokenAndAdmin ,async(req,res)=>{
    const date =new date();
    const lastYear =new date(date.setFullYear(date. getFullYear()-1));
    try {
        const date =await User.aggregate([
            { $match:{createdAt:{ $get:lastYear}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                },
            },
            {
                $group:{
                    _id:"$month",
                    total:{$sum:1},

                }
            }
        ]);
        res.status(200).json(data)

        
    } catch (err) {
        res.status(400).json(err)
        
    }
    
})




module.exports =router;