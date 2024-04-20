import { MongoClient } from "mongodb";
const uri = process.env.MONGODB_URI

export async function mongoConnect(){
    try{
        const client = await MongoClient.connect(uri)
        return client
    }
    catch(error){
        console.log("error in establishing connection with mongodb: ", error)
    }
}