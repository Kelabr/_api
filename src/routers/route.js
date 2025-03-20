import {} from "jose"
import bcrypt from "bcryptjs"
import { manipulationMongoDb } from "../db/mongodb.js"

export default async function router(app, options){

    app.get("/users", async (req,res)=>{
        const instance = manipulationMongoDb("teste","users")

        const data = await instance.find().toArray()

        res.send(data)

    })

    app.post("/users", async (req, res)=>{
        const {name, lastName} = req.body

        const instance = manipulationMongoDb("teste", "users")

        instance.insertOne({name:name, lastName:lastName})

        res.send({message:"create user"})
    })

    app.post("/login", async (req,res)=>{
        const {email, password} = req.body

        const instance = manipulationMongoDb("teste", "users")

        const data = await instance.findOne({email:email})

        if(!data){
            console.log("Erro ao logar")
            return res.send({message:"Error Login"})
        }

        if(data.password != password){
            return res.send({message:"Error password"})
        }

        res.send({message:"Succes Login"})
    })
}