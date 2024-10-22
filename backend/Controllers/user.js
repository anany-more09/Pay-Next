const express = require("express");
const zod = require("zod");
const User = require("../Models/user");
const Acount = require("../Models/acount");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");


// this is same as signupbody for validating the user inputs
const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()

})


//this is same as signinbody for validating the user input
const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

async function handleUserSignUp(req, res)
{
    const {success} = signupSchema.safeParse(req.body)
    if(!success)
    {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser)
    {
        return res.status(411).json({
            message: "Email alread taken"
        })
    }

    
}

const user = await User.create({ 
    username: req.body.username,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname

})

const userId = user._id;

await Acount.create({
    userId,
    balance: 1 + Math.random() * 10000
})

const token = jwt.sign({
    userId: user
}, JWT_SECRET);

res.json({
    messsage: "User created successfully",
    token: token
})


// handleing the signin route here
async function handleUserSignIn(req, res)
{
    const {success} = signinSchema.safeParse(req.body)
    if(!success)
    {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user)
    {
        const token = jwt.sign({
            userId: User._id
        }, JWT_SECRET)

        res.json({
            token: token
        })
        return
    }

    res.status(411).json({
        message: "Error while logging in"
    })

}

const updateshema = zod.object({
    password:  zod.string().optional(),
    firstname:  zod.string().optional(), 
    lastname: zod.string().optional(),
})

async function handleUpdateUser(req, res)
{
  const {success} = updateshema.safeParse(req, res)
  if(!success)
  {
    return res.status(411).json({
        message: "Error while updating details"
    })
  }

  await User.updateOne({_id: req.userId}, req.body)
  res.json({
    messsage:"Updated Successfully"
  })
}

async function filterUsers(req, res) {
    
    const filter = req.query.filter
    const user = await User.find({
        // these are the quriesfor searching the user by thier firstname or lastname
        $or:[
            {firstname : {"$regex": filter, "$options":"i"}},
            {lastname: {"$regex": filter, "$options": "i"} }
        ]
    })

}

 module.exports = {
    handleUserSignUp,
    handleUserSignIn,
    handleUpdateUser, 
    filterUsers
 }