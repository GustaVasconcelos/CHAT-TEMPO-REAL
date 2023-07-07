import mongoose from "mongoose";
import bcrypt from 'bcrypt'

//Modelo do usuario
const usuarioSchema = new mongoose.Schema({
    cpf:{
        type:String,
        require:true,
    },
    nome:{
        type:String,
        require:true,
    },
    senha:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        require:true
    }

})

//Criptogrando a senha do usuário
usuarioSchema.pre('save',async function(next){

    if(!this.isModified("senha")){
        return next()
    }
    this.senha = await bcrypt.hash(this.senha, 10)
    next()
})

//Criando a model
const Usuario = mongoose.model('users', usuarioSchema)

export default Usuario