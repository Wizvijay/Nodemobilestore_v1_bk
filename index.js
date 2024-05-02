const express=require('express')
const app = express()
const cors=require('cors')
app. use (express.json())
const router= express.Router()
const mongoose=require('mongoose')

const PORT = process.env.PORT ||8000
const MONGODB_URL="mongodb://localhost:27017/NewProduct"

mongoose.connect(MONGODB_URL)
    .then(()=>{
        console.log(`${MONGODB_URL} connection Sucessfully....`)
    })
    .catch((err)=>{
        console.error("Error in connecting to mongodb",err.message)
    })
    // external middleware
    app.use(cors({
        origin:"*"
    }));

    // Static Files
app.use("/public", express.static(__dirname + "/public"));
// Routes
app.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'public', 'data', 'uploads', filename));
  });

    app.use(router)
    const productRouter=require("./Routes/ProductRouter")
    app.use(productRouter)

    const userRoutes=require("./Routes/UserRoutes")
    app.use('/',userRoutes)


    app.listen(PORT,()=>{
        console.log(`server listening on ${PORT}....`)
    })