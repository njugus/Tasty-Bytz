import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "./middleware.js";

const router_3 = Router();
const prisma = new PrismaClient();

router_3.post("/",  authMiddleware, async (req, res) => {
    const { title, ingredients, video_url, category_id } = req.body;
    const user_id = req.user.id;

    const ingredientsString = JSON.stringify(ingredients);

    let videoId = video_url.split('v=')[1];
    if (videoId) {
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
    } else {
        return res.status(400).json({ success: false, message: "Invalid video URL" });
    }

    try {
        const newRecipe = await prisma.recipe.create({
            data: {
                title: title,
                ingredients: ingredientsString,
                video_url: videoId,
                category_id: category_id,
                user_id: user_id,
            },
        });
        res.status(201).json({ success: true, message: "Recipe Created Successfully", details: newRecipe });
    } catch (e) {
        res.status(500).json({ success: false, message: e.message });
    }
});

router_3.get("/",  async(req, res) => {
    try{
        const allRecipees = await prisma.recipe.findMany();
        res.status(200).json({success : true, details : allRecipees})
    }catch(e){
        res.status(500).json({success : false, message: e.message})
    }
})

router_3.get("/:id", async(req, res) => {
    const recipe_id = req.params.id;
    try{
        const response = await prisma.recipe.findUnique({
            where : {
                id : recipe_id
            }
        })
        res.status(200).json({success : true, details : response})
    }catch(error){
        res.status(500).json({success : false, message : e.message})
    }
})

router_3.patch("/:id" , async(req, res) => {

    const recipe_id = req.params.id;
    const { title, ingredients } = req.body;
    const ingredientsString = JSON.stringify(ingredients);
    try{
        const response = await prisma.recipe.update({
            where : {
                id : recipe_id
            },
            data : {
                title : title,
                ingredients : ingredientsString
            },
        })
        res.status(200).json({success : true, details : response})
    }catch(error){
        res.status(500).json({success : false, message : error.message})
    }
}) 

export default router_3;


