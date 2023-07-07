import { pesquisarUsuarioPorCpfService } from '../../../services/usuario.services.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/*------Inicio login-------- */

export const login = async (req,res) =>{

    //Campos necessários para efetuar o login
    const {cpf, senha} = req.body

    //verificação se há todos os campos necessários
    if(!cpf || !senha){
        return res.status(200).json({mensagem:"Há campos vázios", status:400})
    }
    try{
        //Verificando se existe o usuário no banco de dados
        const verificarUsuario = await pesquisarUsuarioPorCpfService(cpf)
        if(!verificarUsuario){
            return res.status(200).json({mensagem:"Cpf ou senha incorreta!", status:400})
        }
        //Verificando se a senha está correta
        const verificarSenha =  bcrypt.compareSync(senha, verificarUsuario.senha)
        if (!verificarSenha) {
            return res.status(200).send({mensagem: "Cpf ou senha incorreta!", status:400});
        }
        
        //Gerando o token pro usuário
        const token = jwt.sign({cpf}, process.env.SECRET_JWT,{expiresIn:86400})
        
        //Login efetuado
        res.cookie("token",token,{httpOnly:true})
        res.status(200).json({token:token,id_usuario:verificarUsuario._id,cpf:verificarUsuario.cpf, nome:verificarUsuario.nome, status:verificarUsuario.status})

    }catch(err){
        res.status(500).json({mensagem:"Erro ao efetuar o login"})
    }
}