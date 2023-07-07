import mongoose from "mongoose";
//Conectando o banco de dados
export const conectarBancoDeDados = () =>{

    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(() =>{
        console.log('MongoDb conectado')
    }).catch((err) =>{
        console.log(err)
    })
}

