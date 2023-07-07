import { adicionarMensagemService } from "../../../services/mensagem.services.js"

export const adicionarMensagem = async (req,res) =>{

    //Campos necessários para adicionar a mensagem no banco
    const {de, para, mensagem} = req.body

    try{
        //Criando a mensagem no banco de dados
        const mensagemAdicionada = await adicionarMensagemService(de,para,mensagem)

        if(!mensagemAdicionada){
            return res.status(200).json({mensagem:"Erro ao enviar a mensagem!", status:400})
        }
        //Mensagem criada
        return res.status(200).json({mensagem:"Mensagem adicionada!!", mensagemAdicionada})
    }catch(err){
        console.log(err)
    }

    
}