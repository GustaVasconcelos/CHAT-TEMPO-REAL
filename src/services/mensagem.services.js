import Mensagem from "../model/Mensagem.js";

const adicionarMensagemService = (de,para,mensagem) => Mensagem.create({
    mensagem:{texto:mensagem},
    usuarios:[de,para],
    remetente:de
})
const pegarTodasAsMensagensService = (de,para) => Mensagem.find({
    usuarios:{
        $all:[de,para]
    },
}).sort({updated:1})
export {
    adicionarMensagemService,
    pegarTodasAsMensagensService
}