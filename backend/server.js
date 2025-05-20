import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import { connectDB } from './config/db.js'
import itemRoutes from './routes/item.route.js'
import Item from '../models/item.model.js'

// This allows us to use process.env.{variable name} to read from the .env file
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5001

const __dirname = path.resolve()

app.use(express.json()) 

// we will need routes for CRUD Operations.
// this appends the path /api/cart to the end of the PORT we are 
// listening to
app.use("/api/cart", itemRoutes)
// app.get("/api/cart", async (req, res) => {
//     try {
//         // this grabs all Item objects from the database
//         const items = await Item.find({})

//         // **** newly added code ****
//         if (items === null) res.status(204).json({ success: true, data: items})

//         res.status(200).json({ success: true, data: items })
//     } catch (error) {
//         console.log("Error in fetching cart items:", error.message)
//         res.status(500).json({ success: false, message: "Server Error" })
//     }
// })


// if we are in production build, go to the correct directory
// and then send the file we want for the frontend
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend", "dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    connectDB()
    console.log(`server started at http://localhost:${PORT}`)
})