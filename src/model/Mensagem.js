import mongoose from "mongoose";
import bcrypt from 'bcrypt'

//Modelo da mensagem
const mensagemSchema = new mongoose.Schema({
    mensagem:{
        texto:{
            type:String,
            required:true
        }
    },
    usuarios:{
        type:Array
    },
    remetente:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    }
},{timestamps:true})


//Criando a model
const Mensagem = mongoose.model('Mensagens', mensagemSchema)

export default Mensagem