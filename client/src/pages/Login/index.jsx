import React, { useState } from "react"
import './style.css'

import { Mensagem } from "../../components/MensagemAviso";
import { FaEyeSlash,FaEye, FaUserCircle,FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import api from "../../services/api";

import {setarIdUsuario, setarNomeUsuario, loginToken, setarCpf, setarStatus} from '../../services/localstorage.js'
export const Login = () =>{
    
    const [tipoInput, setTipoInput] = useState('password')
    const [msg,setMsg] = useState('')
    const [cpf, setCpf] = useState('')
    const [senha, setSenha] = useState('')

    //Fazendo a requisição pro back-end, para efetuar o login
    const fazerLogin = async () =>{
        //limpando a mensagem de aviso, caso ela já tenha um dado
        if(msg){
            setMsg('')
        }
        try{
            //enviando os dados necessários para o login
            const data = {cpf,senha}
            const res = await api.post('/login', data)

            if(res.data.status === 400){
                setMsg(res.data.mensagem)
            }else{
                //Editando status do usuário
                await api.patch('/editar_status',{_id:res.data.id_usuario,status:'online'})

                //Salvando dados no localstorage
                loginToken(res.data.token)
                setarIdUsuario(res.data.id_usuario)
                setarNomeUsuario(res.data.nome)
                setarCpf(res.data.cpf)
                setarStatus(res.data.status)

                window.location.href = '/bate_papo'

            }
        }catch(err){
            console.log(err)
        }
    }

    const mudarTipoInput = () =>{
        if(tipoInput === 'password'){
            setTipoInput('text')
        }else{
            setTipoInput('password')
        }
    }
    return(
        <main className="container-login">
            <div className="container-login-enfeite"></div>
            <section className="container-login-imagem">

            </section>
            <section className="container-login-formulario">
                <div className="container-login-formulario-caixa">
                    <div className="container-login-formulario-svg">
                        <FaUserCircle/>
                    </div>
                    <div className="container-login-formulario-titulo">
                        <h2>Login</h2>
                    </div>
                    <div className="container-login-formulario-campos">
                        <div className="container-login-formulario-campos-caixa-inputs">
                            <p>Cpf:</p>
                            <span>
                                <FaUserAlt/>
                                <input value={cpf} onChange={(e) => setCpf(e.target.value)}type="number"placeholder="Digite seu Cpf"></input>
                            </span>
                        </div>
                        <div className="container-login-formulario-campos-caixa-inputs">
                            <p>Senha:</p>
                            {
                                tipoInput === 'password'?(
                                    <span>
                                        <FaEyeSlash onClick={mudarTipoInput}/>
                                        <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password"placeholder="digite sua senha"></input>
                                    </span>
                                ):(
                                    <span>
                                        <FaEye onClick={mudarTipoInput}/>
                                        <input value={senha} onChange={(e) => setSenha(e.target.value)} type="text"placeholder="Digite sua senha"></input>
                                    </span>
                                )
                            }
                        </div>
                    </div>
                    <div className="container-login-formulario-botao">
                        <button onClick={fazerLogin}>Login</button>
                        <Link to='/cadastro'>Não possui uma conta? Crie uma!</Link>
                    </div>
                    <div className="container-login-formulario-mensagem">
                        {msg&&
                            <Mensagem tipo='erro' msg={msg}/>
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}