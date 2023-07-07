import { useEffect, useState, useRef} from 'react'
import api from '../../services/api'
import { ChatInput } from '../ChatInput'


import './style.css'
import { FaUserAlt, FaAngleLeft } from 'react-icons/fa'

export const Chat = ({chatAtual, usuarioAtual, socket, setChatAtual}) =>{

    const scroll = useRef()
    const [mensagens,setMensagens] = useState([])
    const [mensagensChegada, setMensagensChegada] = useState(null)

    //Adicionando a mensagem no banco de dados
    const enviarMensagem = async (mensagem) =>{
        if(chatAtual){
            const data = {
                de:usuarioAtual.id,
                para:chatAtual._id,
                mensagem
            }
            try{
                await api.post('/adicionar_mensagem',data)
                socket.current.emit('enviar-mensagem',{
                    de:usuarioAtual.id,
                    para:chatAtual._id,
                    mensagem
                })
    
                const msgs = [...mensagens]
                msgs.push({remetente:true, mensagem})
                setMensagens(msgs)
            }catch(err){
                console.log(err)
            }
        }
    }

    //Pegando as mensagens do banco
    useEffect(() =>{
         (async () =>{
            const data = {
                de:usuarioAtual.id,
                para:chatAtual._id
            }
            try{
                const res = await api.post('/pegar_todas_mensagens', data)
                setMensagens(res.data)
            }catch(err){
                console.log(err)
            }
        
        })()
    }, [chatAtual._id, usuarioAtual.id])


    //Adicionando a nova mensagem recebida em uma lista
    useEffect(() => {
        if (socket.current) {
          socket.current.on("mensagem-recebida", (msg) => {
            setMensagensChegada({ remetente: false, mensagem: msg });
          });
        }
      }, [socket]);

    //Adicionando a mensagem recebida na lista de mensagem do map 

    useEffect(() => {
        mensagensChegada && setMensagens((prev) => [...prev, mensagensChegada]);
    }, [mensagensChegada]);


    //UseEffect para levar o scroll para o inicio do chat
    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
        }, [mensagens]);



    return (
        <section className="container-chat">
            <div className='container-chat-header'>
                <div className='container-chat-header-usuario'>
                    <FaUserAlt/>
                    <h3>{chatAtual.nome}</h3>
                </div>
                <div className='container-chat-header-voltar'>
                    <FaAngleLeft onClick={() => setChatAtual(undefined)}/>
                </div>
            </div>
            <div className='container-chat-mensagens'>
            {mensagens&&
                mensagens.map((mensagem,index) => {
                    return (
                        <div ref={scroll} key={index}>
                            <div
                                className={`mensagem ${
                                mensagem.remetente ? "enviada" : "recebida"
                                }`}
                            >
                            <div className="conteudo ">
                                <p>{mensagem.mensagem}</p>
                            </div>
                        </div>
                        </div>
                    );
                    }
                )
            }
            </div>
            <ChatInput enviarMensagem={enviarMensagem}/>
        </section>
    )
}