import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signupUser = async (req , res) => {
    try {
        const { fullname , username , password , confirmPassword , gender} = req.body;

        if (password !== confirmPassword){ // checks whether the password and confirm password field are same
            return res.status(400).json({error:"password don't match"});
        }
        const user = await User.findOne({username})
        if(user){ // checks for any other user in this username
            return res.status(400).json({error:"username already exists"})
        }


        const salt = await bcrypt.genSalt(10); // generating salt for hasing , greater the salt greater the time taken
        const hashedpassword = await bcrypt.hash( password , salt ) // creating hashed password
        
        // setting default and unique profile pic for their username and gender

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser = new User(
            {
                fullname,
                username,
                password : hashedpassword,
                gender,
                profilepic : gender === "male" ? boyProfilePic : girlProfilePic 
            }
        )

        if (newUser){
            generateTokenAndSetCookie(newUser._id , res);
            await newUser.save()
            res.status(201).json({_id : newUser._id , fullname : newUser.fullname , username : newUser.username , profilepic : newUser.profilepic})
        }
        else{
            res.status(400).json({error : "invalid userdata or missing fields"})
        }
        
       
    }catch(error){

        console.log(`error in internal signup controller` , error.message);
        res.status(500).json({error : `internal server error`});
    }
}

export const loginUser = async (req , res) => {
    try {
        const {username , password} = req.body;
        const user = await User.findOne({username})
        const iscorrectpassword = await bcrypt.compare(password , user?.password || "");
        if (!user || !iscorrectpassword){
            return res.status(400).json({error : "invalid userid or password"})
        }
        generateTokenAndSetCookie(user._id , res);

        res.status(200).json({_id : user._id , fullname : user.fullname , username : user.username , profilepic : user.profilepic})

    } catch (error) {

        console.log(`error in internal login controller` , error.message);
        res.status(500).json({error : `internal server error`});
    }
}

export const logoutUser = async (req , res) => {
    try {
        res.cookie("jwt" , "" , {maxAge : 0});
        res.status(200).json({message : "logged out successfully"});
    } catch (error) {

        console.log(`error in internal logout controller` , error.message);
        res.status(500).json({error : `internal server error`}); 
        
    }
    
}

