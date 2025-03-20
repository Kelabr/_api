import { MongoClient } from "mongodb";
import dotenv from "dotenv"

dotenv.config()

const uri = process.env.SECRET_CONNECTION
const client = new MongoClient(uri)

async function connectionMongoDb(){
    try{
        await client.connect()
        console.log("Connection Established")
    }catch(error){
        console.error("Erro when connecting", error)
    }
}

function manipulationMongoDb(db, collection){
    const data = client.db(db)
    const collectionData = data.collection(collection)

    return collectionData
}

connectionMongoDb()

export {manipulationMongoDb}