import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { promises } from "node:dns";

const JWT_SECRET = process.env.JWT_SECRET||"Sporton123";

export const signin = async (req: Request, res: Response): Promise<void> =>{
    try{
        const {email, password}= req.body;

        // check user exists or not
        const user = await User.findOne({email})
        if (!user){
            res.status (400).json({message:"Invalid Credentials, Email not found"});
            return;
        }

        // validasi password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({message:" Invalid Credentials, wrong password"});
            return;
        }

        // generate JWT
        const token = jwt.sign({id: user._id, email:user.email}, JWT_SECRET,{
            expiresIn: "1d"
        })

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch(error){
        console.error("Signin Error: ", error);
        res.status(500).json({message:"Internal Server Error"});
    }
};

export const initiateAdmin = async (req: Request, res: Response): Promise<void> =>{
    try{
        const {email, password, name} = req.body;

        // check if user data / entry is exist
        const count = await User.countDocuments({});
        if(count > 0){
            res.status(400).json({
                message: "we can only have 1 admin user, if you want to create new admin user, please delete the user manually from the database11"
            })
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            email,
            password: hashPassword,
            name
        })

        await newUser.save();

        res.status(201). json({message: "Admin User Created Succesfully!"});
    } catch(error){
        console.error("Initiate new admin user error", error);
        res.status(500).json({message: "Internal server error"});
    }
};