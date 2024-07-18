import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import  bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const route_2 = Router();
const prisma = new PrismaClient();
const SECRET_KEY = "rwrwknknrw";

route_2.post("/", async(req, res) => {
    const { email, password} = req.body;
    try{
        const result = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if(!result){
            res.status(400).json({success : false, message : "Invalid User Credentials"})
        }
        const passwordMatch = await bcrypt.compare(password, result.password);
        if(passwordMatch){
            const payload = {
                id : result.id,
                email : result.email,
                first_name : result.first_name,
                last_name : result.last_name,
                role : result.role
            }
            const token = jwt.sign(payload, SECRET_KEY);
            res.cookie("access_token", token).json({success : true, data : payload});
        }
    }catch(e) {
        res.status(500).json({success : false, message : e.message})
    }
})

export default route_2;