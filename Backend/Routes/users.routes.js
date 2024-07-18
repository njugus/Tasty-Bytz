import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
const route_1 = Router();
const prisma = new PrismaClient();

route_1.post("/", async(req, res) => {
    const {first_name, last_name, email, password} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try{
        const result = await prisma.user.create({
            data : {
                first_name : first_name,
                last_name : last_name,
                email : email,
                password : hashedPassword
            }
        })
        res.status(201).json({success : true, message : "Record Created Successfully", record : result})
    }catch(e){
        res.status(500).json({success : false, message: e.message});
    }
   

})

export default route_1;

