import { pesquisarUsuarioPorCpfService } from "../../../services/usuario.services.js";

/* -- Pesquisar o usuário pelo nome */
export const pesquisarUsuarioCpf= async (req,res) =>{
  
    //Campos necessário para a pesquisa
    const {cpf} = req.body

    //Verificação se não há campos vázios
    if(!cpf){
        res.status(200).json({ mensagem: "Preencha todos os campos", status:400 });
    }

    try{
        //Procurando o usuário no banco de dados
        const verificarUsuario = await pesquisarUsuarioPorCpfService(cpf)

        //Verificação se caso não tenha um usúario
        if(!verificarUsuario){
            res.status(200).json({ mensagem: "Usuário não encontrado", status:400 });
        }
        
        //Se caso o usuário for encontrado
        res.status(200).json({mensagem:'Usuário encontrado',verificarUsuario})
    }catch(err){
        return res.status(500).json({mensagem: "Erro ao pesquisar pelo o usuário", err});
    }
}