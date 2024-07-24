import { response, Router } from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "./middleware.js";
import bcrypt from 'bcrypt';
const route_7 = Router();
const prisma = new PrismaClient();

route_7.get("/", authMiddleware , async(req, res) => {
    const user_id = req.user.id;
    try{
        const response = await prisma.recipe.findMany({
            where : {
                user_id : user_id
            }
        })
        res.status(200).json({success : true, details : response})
    }catch(error){
        res.status(500).json({success : false, message : error.message})
    }
})



route_7.delete("/:id", authMiddleware, async(req, res) => {
    const recipe_id = req.params.id;
    const user_id = req.user.id;
    try{
        const result = await prisma.recipe.findUnique({
            where : {
                id : recipe_id
            },
        })
        if(!result || result.user_id !== user_id){
            return res.status(404).json({success : false, message : "Unauthorized User"})
        }

        const response = await prisma.recipe.delete({
           where : {
            id : recipe_id
           },
        }) 
        res.status(200).json({success : true, message : "Recipee Deleted Successfully", details : response})   
    }catch(error){
        res.status(500).json({success : false, message : error.message})
    }
})

// route_7.update("/", async(req, res) => {
//     try{
//         const response = await prisma.recipe.update({
//             where : {
//                 user_id : user_id
//             },
//             data : {
//             }
//         })
//     }catch(error){
//         res.status(500).json({success : false, message : error.message})
//     }
// })
export default route_7;