import { pesquisarTodosOsUsuariosService } from "../../../services/usuario.services.js";

/* -- Pesquisar o usuário pelo o id */
export const pesquisarTodosOsUsuarios = async (req,res) =>{
  
    try{
        //Procurando os usuários no banco de dados
        const usuarios = await pesquisarTodosOsUsuariosService()

        //Verificação se caso não tenha usuários cadastrado
        if(!usuarios){
            res.status(200).json({mensagem: "Não há usuários cadastrado" });
        }
        //Se caso houver usuários no banco
        res.status(200).json({mensagem:'Usuários encontrados',usuarios})
    }catch(err){
        return res.status(500).json({mensagem: "Erro ao pesquisar pelo os usuários", err});
    }
}