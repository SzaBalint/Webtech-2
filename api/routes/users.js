const express = require('express')
const router = express.Router()
const User = require('../models/user')

router.get('/', async (req, res) => {
    try{
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// router.post('/login', async (req, res, next) => {
//     res.status(200).json({message:"login"});



//     // const user = new User({
//     //     username: req.body.username,
//     //     password: req.body.password,
//     // })
//     // try{
//     //     const newUser = await user.save()
//     //     res.status(201).json(newUser)
//     // } catch(err) { 
//     //     res.status(400).json({ message: err.message })
//     // }
// })

router.post("/login", async (req, res,next) => {
    try {
        // check if the user exists
        const user = await User.findOne({ username: req.body.username });
        if (user) {
          //check if password matches
        //   console.log(user);
          const result = req.body.password === user.password;
          if (result) {
            res.status(200).json(user);
          } else {
            res.status(400).json({ error: "password doesn't match" });
          }
        } else {
          res.status(400).json({ error: "User doesn't exist" });
        }
      } catch (error) {
        res.status(400).json({ error });
      }
});

//Register
router.post('/register', async (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    })
    try{
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch(err) { 
        res.status(400).json({ message: err.message })
    }
})



module.exports = router