import React, { useEffect, useState, useRef } from "react";
import './style.css'
import api from "../../services/api";
import {io} from 'socket.io-client'
import { Contatos } from "../../components/Contatos";
import { Chat } from "../../components/Chat";
import { pegarCpf, pegarIdUsuario, pegarNomeUsuario } from "../../services/localstorage";
import { CircularProgress } from "@mui/material";

import selecionarFundo from '../../images/Batepapo/selecionar.svg'
export const BatePapo = () =>{
    const socket = useRef();
    const [usuarios, setUsuarios] = useState()
    const [carregado, setCarregado] = useState(false)
    const [usuarioAtual, setUsuarioAtual] = useState()
    const [chatAtual, setChatAtual] = useState(undefined);
    const [mensagens,setMensagens] = useState([])

    //Pegando usuários do banco
    const pegarUsuarios = async () =>{
        const res = await api.get('pesquisar_usuarios')
        setUsuarios(res.data.usuarios)
        setCarregado(true)
    }

    //Alterando pro chat selecionado
    const alterarChat = (chat) =>{
        setChatAtual(chat)
    }

    //Pegando as mensagenso no banco de dados com o usuário selecionado
    const pegarMensagens = async () =>{
        const data = {
            de:usuarioAtual.id,
            para:chatAtual._id
        }

        api.post('/pegar_todas_mensagens', data).then(
            res => {
                setMensagens(res.data)
            }
        ).catch(err =>{
            console.log(err)
        })
    }

    

    useEffect(() =>{
        pegarUsuarios()
    },[])
    //Setando usuário que está logado
    useEffect(() =>{
        const data = {
            cpf:pegarCpf(),
            nome:pegarNomeUsuario(),
            id:pegarIdUsuario()
        }
        setUsuarioAtual(data)
    },[])

    //conectando o scoket
    useEffect(() => {
        if (usuarioAtual) {
            socket.current = io('http://localhost:5000');
            socket.current.emit("adicionar-usuario",usuarioAtual.id);
        }
        }, [usuarioAtual]);



    return (
        <main className="container-batepapo">
            {
                carregado === true?(
                    <>
                        {/* Div para a tela do computador */}
                        <div className="container-pc">
                            <Contatos usuarios={usuarios} usuarioAtual={usuarioAtual} chatAtual={alterarChat}/>
                            {
                                chatAtual === undefined?(
                                    <div className="container-batepapo-caixa-mensagem">
                                        <h2>Por favor, selecione alguém com quem gostaria de iniciar uma conversa.</h2>
                                        <img src={selecionarFundo} alt="selecionar chat">
                                        </img>
                                    </div>
                                ):(
                                    <Chat socket={socket} setChatAtual={setChatAtual} chatAtual={chatAtual} mensagens={mensagens} usuarioAtual={usuarioAtual} pegarMensagens={pegarMensagens}/>
                                )
                            }
                        </div>
                        {/* Div para a tela do celular, para reduzir a quantidade de itens que ficam na tela

                            exemplo:aparece apenas os contatos na tela, ao clicar no usuário, exibe o chat da conversa
                        
                        */}
                        <div className="container-mobile">
                            {
                                chatAtual?(
                                    <Chat socket={socket} setChatAtual={setChatAtual} chatAtual={chatAtual} mensagens={mensagens} usuarioAtual={usuarioAtual} pegarMensagens={pegarMensagens}/>
                                ):(
                                    <Contatos usuarios={usuarios} usuarioAtual={usuarioAtual} chatAtual={alterarChat}/>
                                )
                            }
                        </div>
                    </>
                ):(
                    <CircularProgress/>
                )
            }
        </main>
    )
}