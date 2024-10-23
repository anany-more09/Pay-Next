
const zod  = require("zod");
const { User } = require("../Models/user");
const { Acount } = require("../Models/acount");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//const JWT_SECRET = require("../config");



// this is same as signupbody for validating the user inputs
const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()

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
        });
    }

    const existingUser = await User.findOne({username: req.body.username})

    if(existingUser)
    {
        return res.status(411).json({
            message: "Email already taken"
        });
    }



const user = await User.create({ 
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName

})

const userId = user._id;

await Acount.create({
    userId,
    balance: parseInt(1 + Math.random() * 10000)
})

const token = jwt.sign({
    userId
}, process.env.JWT_SECRET);
// const userId = User._id;

res.json({
    messsage: "User created successfully",
    token: token
});


}



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
            userId: req.userId
        }, process.env.JWT_SECRET)

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
    firstName:  zod.string().optional(), 
    lastName: zod.string().optional(),
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
    
    const filter = req.query.filter || "";
    const user = await User.find({
        // these are the quriesfor searching the user by thier firstname or lastname
        $or:[
            {firstname : {"$regex": filter}},  //this syntax we can use for matching the subsstring either from the firstname "or" from the last name.
            {lastname: {"$regex": filter} }
        ]
    })

    // $or:[
    //     {firstname : {"$regex": filter, "$options":"i"}},  //this syntax we can use for 
    //     {lastname: {"$regex": filter, "$options": "i"} }
    // ] we can use this as well

    res.json({
        user: user.map(user =>({
            username: user.name,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

}

 module.exports = {
    handleUserSignUp,
    handleUserSignIn,
    handleUpdateUser, 
    filterUsers
 }













 