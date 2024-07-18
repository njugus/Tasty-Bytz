import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router_5 = Router();
const prisma = new PrismaClient();

router_5.post("/", async(req, res) => {
    const { name, description } = req.body;
    try{
        const result = await prisma.category.create({
            data : {
                name : name,
                description : description
            }
        })
        res.status(201).json({success : true, message : "Category Created Successfully", details : result})
        
    }catch(e){
        res.status(500).json({ success : false, message : e.message})
    }
})

export default router_5;