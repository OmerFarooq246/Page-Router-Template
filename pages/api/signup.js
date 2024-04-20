import bcryptjs from "bcryptjs"
import { mongoConnect } from "@/libs/mongodb"

export default async function handler(req, res) {
    console.log("req.body in signup: ", req.body)

    //establishing connection with db
    const client = await mongoConnect()
    const db = client.db("Temp")

    //checking if  the user already exists
    const user = await db.collection("Users").findOne({email: req.body.signupData.email})
    if(user !== null){
        return res.status(400).json(user)
    }
    
    //hashing password
    const password = req.body.signupData.password
    const hashedPassword = await bcryptjs.hash(password, 10) //salt = 10
    
    //creating new user
    try{
        const newUser = await db.collection("Users").insertOne({
            email: req.body.signupData.email,
            username: req.body.signupData.username,
            password: hashedPassword,
        })
        console.log("newUser added: ", newUser)
        res.status(200).json(newUser)
    }
    catch(error){
        console.error("error message:", error.message)
        res.status(500).json({ error });
    }
}
