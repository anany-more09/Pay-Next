
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
        }, process.env.JWT_SECRET, {expiresIn: '20min'})

        res.json({
            token: token
        })
        return
    }

    res.status(411).json({
        message: "Incorrect password"
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

async function getUsers(req, res) {

    // console.log('Query Params:', req.query);
    const { firstName, lastName, showAll } = req.query;
    console.log(showAll)

    try {
        // If showAll is true, return all users without filtering
        if (!showAll) {
            const allUsers = await User.find();
            return res.json({
                user: allUsers.map(user => ({
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    _id: user._id
                }))
            });
        }

        // If no filters are provided, return an error message
        if (!firstName && !lastName) {
            return res.status(400).json({
                message: "Please provide either firstName or lastName to filter users."
            });
        }

        // Build filter criteria based on the provided fields
        const filterCriteria = [];
        if (firstName) {
            filterCriteria.push({ firstName: { $regex: firstName, $options: "i" } });
        }
        if (lastName) {
            filterCriteria.push({ lastName: { $regex: lastName, $options: "i" } });
        }

        // Find users based on filter criteria
        const filteredUsers = await User.find({ $or: filterCriteria });
        
        return res.json({
            user: filteredUsers.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving users." });
    }
}

 module.exports = {
    handleUserSignUp,
    handleUserSignIn,
    handleUpdateUser, 
    getUsers
 }













 