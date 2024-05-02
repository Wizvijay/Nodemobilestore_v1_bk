const express= require('express')
const router=express.Router()

const ProductController=require("../Controller/ProductController")


router.post("/product/insert",ProductController.insertProduct)
router.get("/product/list",ProductController.list)
router.put("/product/:id",ProductController.update)
router.delete("/product/:id",ProductController.delete)





module.exports=router