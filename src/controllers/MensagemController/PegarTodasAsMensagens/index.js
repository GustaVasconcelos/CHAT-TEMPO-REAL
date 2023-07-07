import { pegarTodasAsMensagensService } from "../../../services/mensagem.services.js";

export const pegarTodasAsMensagens = async (req,res) =>{

    //Campos necessários para pegar as mensagens privadas
    const {de,para} = req.body

    try{
        //Pesquisando as mensagens no banco de dados
        const mensagens = await pegarTodasAsMensagensService(de,para)
        const mensagensPercorridas = mensagens.map((msg) => {
            return {
              remetente: msg.remetente.toString() === de,
              mensagem: msg.mensagem.texto,
            };
          });
          return res.status(200).json(mensagensPercorridas);
    }catch(err){
        console.log(err)
    }
}