import { CircularProgress } from "@mui/material"
import './style.css'
import { useEffect, useState } from "react"

import {FaUserAlt,FaUserSlash, FaUserTimes} from 'react-icons/fa'
import api from "../../services/api"
import { desconectar, pegarIdUsuario, pegarToken } from "../../services/localstorage"
export const Contatos = ({usuarios, usuarioAtual, chatAtual}) =>{

    const [nomeAtual, setNomeAtual] = useState(undefined)
    const [usuarioSelecionadoAtual, setUsuarioSelecionadoAtual] = useState(undefined)

    useEffect(() =>{
        if(usuarioAtual){
            setNomeAtual(usuarioAtual.nome)
        }
    },[usuarioAtual])

    //Exibindo o chat selecionado
    const alterarChat = (index,usuario) =>{
        setUsuarioSelecionadoAtual(index);
        chatAtual(usuario)
    }
    
    //Finalizando sessão 
    const finalizarSessao = async () =>{

        const data ={
            token:pegarToken()
        }

        try{

            const res = await api.post('deletar_token',data)
            await api.patch('/editar_status',{_id:pegarIdUsuario(),status:'offline'})

            if(res.status === 200){
                desconectar()
                window.location.href = '/'
            }

        }catch(err){
            console.log(err)
        }
    }
    return(
            <div className="container-batepapo-caixa-contatos">
                <div className="container-batepapo-caixa-contatos-titulo">
                    <FaUserAlt/>
                    <p>{usuarioAtual.nome}</p>
                    <div className="online"></div>
                </div>
                <div className="container-batepapo-caixa-contatos-usuarios">
                    {usuarios?(
                        usuarios.map((item,index) =>(

                            item.nome !== nomeAtual&&
                                <>
                                    {item.status === 'online'?(
                                        <div onClick={() => alterarChat(index,item)} key={index} className={`container-batepapo-caixa-contatos-usuarios-item ${index === usuarioSelecionadoAtual? "usuario-selecionado":""}` }>
                                            <div className="width33">
                                                <FaUserAlt/>
                                            </div>
                                            <div className="width33">
                                                <p>{item.nome}</p>
                                            </div>
                                            <div className="width33">
                                                <div className="online"></div>
                                            </div>
                                        </div>
                                    ):(
                                        <div key={index} className="container-batepapo-caixa-contatos-usuarios-item-offline">
                                            <div className="width33">
                                                <FaUserSlash/>
                                            </div>
                                            <div className="width33">
                                                <p>{item.nome}</p>
                                            </div>
                                            <div className="width33">
                                                <div className="offline"></div>
                                            </div>
                                        </div>
                                    )}
                                </>
                            
                            ))
                    ):(
                        <CircularProgress/> 
                    )}
                </div>
                <div className="container-batepapo-caixa-contatos-desconectar">
                    <span onClick={finalizarSessao}>
                        <FaUserTimes/>
                        <p>Desconectar</p>
                    </span>
                </div>
            </div>
    )
}