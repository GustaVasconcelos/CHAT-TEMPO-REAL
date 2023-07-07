import { editarStatusService } from "../../../services/usuario.services.js"

export const editarStatus = async (req,res) =>{
    //Campos necessários para editar o status do usuário
    const {_id,status} = req.body

    //Verificando se há campos vázios
    if(!_id || !status){
        return res.status(200).json({mensagem:"Há campos vázios",status:400})
    }
    try{
        //Alterando o status do usuário no banco
        const alterarStatus = await editarStatusService(_id,status)
        if(!alterarStatus){
            return res.status(200).json({mensagem:"Erro ao alterar o usuário",status:400})
        }
        //status alterado
        return res.status(200).json({mensagem:"Status alterado", alterarStatus})
    }catch(err){
        return res.status(500).json({mensagem: "Erro ao alterar o status do usuário", err});
    }
}