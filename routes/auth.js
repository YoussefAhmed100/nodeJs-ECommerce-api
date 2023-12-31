const router = require("express").Router();
const User = require("../models/User");
const cryptoJs = require("crypto-js");
const jwt =require ('jsonwebtoken')

//REGISTER
router.post("/register", async (res, req) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(404).json({ message: "invalid password or user name" + err });
  }
});
//LOGIN
router.post('/login',async(res,req )=>{
    try {
        const user = await User.findOne({username:req.body.username});

        !user &&res.status(401).json("invalid username")
        const hashedPassword =CryptoJS.AES.decrypt(user.password , process.env.PASS_SEC);

        const originalPassword =hashedPassword.toString(cryptoJs.enc,Utf8);

        originalPassword !==req.body.password && res.status(401).json("invalid password");

        const accessToken =jwt.sign({
            id:user._id,
            isAdmin :user.isAdmin,

        },
        process.env.JWT_SEC,
        {expiresIn:"3d"}
        )

        

        const{password ,...others} =user._duc;


        


        res.status(200).json({...others , accessToken});


        
    } catch (err) {
        res.status(404).json(err)
        
    }
})




module.exports = router;
